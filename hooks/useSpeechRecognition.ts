import { useState, useRef, useEffect, useCallback } from "react";
import { getTextAccuracyScore } from "../utils/textUtils";

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const useSpeechRecognition = (
  onTranscriptReady: (transcript: string, accuracyScore?: number) => void,
  targetText?: string,
) => {
  const [micState, setMicState] = useState<
    "off" | "listening" | "paused" | "not-supported"
  >("off");
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef<any | null>(null);
  const transcriptBufferRef = useRef<string>("");
  const lastDeliveredTranscriptRef = useRef<string>("");
  const isComponentMounted = useRef(true);
  const targetTextRef = useRef(targetText);

  const onTranscriptReadyRef = useRef(onTranscriptReady);
  useEffect(() => {
    onTranscriptReadyRef.current = onTranscriptReady;
  }, [onTranscriptReady]);
  useEffect(() => {
    targetTextRef.current = targetText;
  }, [targetText]);

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
      if (
        !finalTranscript ||
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

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          fullFinal += event.results[i][0].transcript;
        } else {
          currentInterim += event.results[i][0].transcript;
        }
      }

      setInterimTranscript(currentInterim);

      if (fullFinal) {
        transcriptBufferRef.current += " " + fullFinal;
        deliverTranscript();
      }
    };

    recognition.onend = () => {
      console.log("Speech Recognition: Ended");
      deliverTranscript();
      if (isComponentMounted.current) {
        setMicState("off");
        setInterimTranscript("");
      }
    };

    recognition.onerror = (event: any) => {
      // 'no-speech' is common if the user is thinking. Don't alert.
      if (event.error === "no-speech") {
        return;
      }
      // 'aborted' happens when we stop it manually.
      if (event.error === "aborted") {
        return;
      }

      console.warn("Speech Recognition Error:", event.error);

      if (event.error === "not-allowed") {
        alert("Microphone access denied. Please enable permissions.");
        setMicState("off");
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

    try {
      recognition.start();
    } catch (error) {
      // If it's already started, just ensure state reflects it.
      // If it was aborting, we might need a retry, but usually relying on button click is safer.
      console.log(
        "Start called but recognition might be active or busy:",
        error,
      );
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
  }, []);

  const abortListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
      setMicState("off");
      setInterimTranscript("");
      transcriptBufferRef.current = "";
      lastDeliveredTranscriptRef.current = "";
    }
  }, []);

  return {
    micState,
    interimTranscript,
    startListening,
    stopListening,
    abortListening,
  };
};
