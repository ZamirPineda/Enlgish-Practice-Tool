import { useState, useRef, useEffect, useCallback } from "react";
import { getTextAccuracyScore } from "../utils/textUtils";

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const useSpeechRecognition = (
  onTranscriptReady: (transcript: string, accuracyScore?: number) => void,
  targetText?: string,
  options: { continuousResults?: boolean } = { continuousResults: true },
) => {
  const [micState, setMicState] = useState<
    "off" | "listening" | "paused" | "not-supported"
  >("off");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState(""); // Add state for final transcript
  const recognitionRef = useRef<any | null>(null);
  const transcriptBufferRef = useRef<string>("");
  const lastDeliveredTranscriptRef = useRef<string>("");
  const isComponentMounted = useRef(true);
  const targetTextRef = useRef(targetText);
  const optionsRef = useRef(options);

  const onTranscriptReadyRef = useRef(onTranscriptReady);
  useEffect(() => {
    onTranscriptReadyRef.current = onTranscriptReady;
  }, [onTranscriptReady]);
  useEffect(() => {
    targetTextRef.current = targetText;
  }, [targetText]);
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    if (!SpeechRecognition) {
      setMicState("not-supported");
      return;
    }

    const recognition = new SpeechRecognition();
    // Continuous = true is much more stable. It prevents the mic from shutting off
    // randomly if the user pauses for a split second.
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      console.log("Speech Recognition: Started");
      setMicState("listening");
    };

    const deliverTranscript = () => {
      const finalTranscript = transcriptBufferRef.current.trim();
      if (!finalTranscript) return;

      // Allow delivering the same transcript again if continuousResults is false (for retrying same word)
      if (
        optionsRef.current.continuousResults &&
        finalTranscript === lastDeliveredTranscriptRef.current
      )
        return;

      const accuracyScore = targetTextRef.current
        ? getTextAccuracyScore(finalTranscript, targetTextRef.current)
        : undefined;
      onTranscriptReadyRef.current(finalTranscript, accuracyScore);
      lastDeliveredTranscriptRef.current = finalTranscript;
    };

    recognition.onresult = (event: any) => {
      let currentInterim = "";
      let fullFinal = "";

      // In continuous mode, the results array grows. We only care about the NEW final results.
      // event.resultIndex tells us where the new results begin.
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          fullFinal += event.results[i][0].transcript;
        } else {
          currentInterim += event.results[i][0].transcript;
        }
      }

      setInterimTranscript(currentInterim);

      if (fullFinal) {
        const cleanedFinal = fullFinal.trim();
        if (!cleanedFinal) return;

        if (optionsRef.current.continuousResults) {
          // Append mode
          transcriptBufferRef.current = (
            transcriptBufferRef.current +
            " " +
            cleanedFinal
          ).trim();
          setFinalTranscript((prev) => (prev + " " + cleanedFinal).trim());
          deliverTranscript();
        } else {
          // Replace mode (for single words/phrases)
          // Even if continuous recognition is on, we only want the LATEST phrase
          transcriptBufferRef.current = cleanedFinal;
          setFinalTranscript(cleanedFinal);
          deliverTranscript();
        }
      }
    };

    recognition.onend = () => {
      console.log("Speech Recognition: Ended");
      deliverTranscript();
      if (isComponentMounted.current) {
        setMicState("off");
      }
    };

    recognition.onerror = (event: any) => {
      console.warn("Speech Recognition Error:", event.error);

      // 'no-speech' is common if the user is thinking. Don't alert.
      if (event.error === "no-speech") {
        // Even if no speech, the session often ends, so we let onend handle the state reset
        return;
      }
      if (event.error === "aborted") {
        return;
      }

      if (isComponentMounted.current) {
        setMicState("off");
      }

      if (event.error === "not-allowed") {
        alert("Microphone access denied. Please enable permissions.");
      }
    };

    recognitionRef.current = recognition;

    return () => {
      isComponentMounted.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, []);

  const startListening = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    // Clear previous data
    transcriptBufferRef.current = "";
    lastDeliveredTranscriptRef.current = "";
    setInterimTranscript("");
    setFinalTranscript("");

    try {
      recognition.start();
      setMicState("listening");
    } catch (error) {
      console.log(
        "Start called but recognition might be active or busy:",
        error,
      );
      // If we get an error here, the state might be desynced.
      // Force it to match reality (or at least retry safely next click)
      // Usually "DOMException: Failed to execute 'start' on 'SpeechRecognition': recognition has already started."
      setMicState("listening"); // Assume it's working if it says already started
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        // Force state update immediately for better UI usage,
        // though onend will also fire.
        setMicState("off");
      } catch (e) {
        console.warn("Stop failed:", e);
        setMicState("off");
      }
    }
  }, []);

  const abortListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
      setMicState("off");
      setInterimTranscript("");
      // Don't clear finalTranscript here if we want it to persist for UI
      // But clearing buffer is important for next round?
      // Yes, abort means total reset usually.
      // But user wants to SEE the result after incorrect attempt if stopped.
      // If we stop manually, we want to see it.
      // So wait, if we abort, do we clear UI?
      // Usually, `startListening` clears UI.
      // So let's NOT clear `finalTranscript` here, just stop recording.
      // But `transcriptBufferRef` should probably be cleared for logic purposes?
      // Actually no, if we resume, we might want to continue?
      // No, resume usually means start fresh.
      // Let's clear buffer but keep state for display?
      // Or relies on component state?
      // Component state (StopGameBrowse) handles `frozenTranscript`.
      // Hook should be clean.
      // So let's clear it here to be safe and let component manage persistence.
      setFinalTranscript("");
      transcriptBufferRef.current = "";
      lastDeliveredTranscriptRef.current = "";
    }
  }, []);

  const resetTranscript = useCallback(() => {
    transcriptBufferRef.current = "";
    lastDeliveredTranscriptRef.current = "";
    setInterimTranscript("");
    setFinalTranscript("");
  }, []);

  return {
    micState,
    interimTranscript,
    finalTranscript,
    startListening,
    stopListening,
    abortListening,
    resetTranscript,
  };
};
