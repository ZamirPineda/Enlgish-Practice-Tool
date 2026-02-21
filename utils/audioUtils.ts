// Audio Utilities - Cleaned up for static deployment

// Play text using the browser's native SpeechSynthesis API
export function playNativeTTS(text: string) {
  if (!("speechSynthesis" in window)) {
    console.warn("Web Speech API not supported");
    return;
  }

  // Cancel any currently playing speech to avoid overlap/queueing
  window.speechSynthesis.cancel();

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9; // Slightly slower for better clarity

    // Attempt to use a high-quality voice if available
    const voices = window.speechSynthesis.getVoices();

    // Prefer Google US English, then any US English, then generic English
    const preferredVoice =
      voices.find((v) => v.name.includes("Google US English")) ||
      voices.find((v) => v.lang === "en-US") ||
      voices.find((v) => v.lang.startsWith("en"));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Chrome loads voices asynchronously
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener("voiceschanged", speak, {
      once: true,
    });
  } else {
    speak();
  }
}

// Generate simple game sound effects (retro style) using Web Audio API
// This avoids needing external files or dependencies
const audioCtx =
  typeof window !== "undefined" && window.AudioContext
    ? new window.AudioContext()
    : null;

export function playGameSound(
  type: "correct" | "wrong" | "tick" | "timeout" | "start",
) {
  if (!audioCtx) return;

  // Resume context if needed (browsers suspend it until user interaction)
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  switch (type) {
    case "correct":
      // High-pitched "ding" (Major third arpeggio feel)
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.1); // C6
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
      break;

    case "wrong":
      // Low-pitched "buzz"
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.3);
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.linearRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
      break;

    case "timeout":
      // Sliding down "womp womp"
      osc.type = "triangle";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.5);
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.linearRampToValueAtTime(0.01, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
      break;

    case "tick":
      // Short high click
      osc.type = "square";
      osc.frequency.setValueAtTime(800, now);
      gainNode.gain.setValueAtTime(0.05, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
      break;

    case "start":
      // Ascending "ready set go"
      osc.type = "sine";
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.linearRampToValueAtTime(600, now + 0.2);
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.linearRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
      break;
  }
}
