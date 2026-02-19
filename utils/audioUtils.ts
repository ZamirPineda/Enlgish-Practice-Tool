// Audio Utilities - Cleaned up for static deployment

// Play text using the browser's native SpeechSynthesis API
export function playNativeTTS(text: string) {
  if (!('speechSynthesis' in window)) {
    console.warn("Web Speech API not supported");
    return;
  }

  // Cancel any currently playing speech to avoid overlap/queueing
  window.speechSynthesis.cancel();

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // Slightly slower for better clarity

    // Attempt to use a high-quality voice if available
    const voices = window.speechSynthesis.getVoices();

    // Prefer Google US English, then any US English, then generic English
    const preferredVoice =
      voices.find(v => v.name.includes('Google US English')) ||
      voices.find(v => v.lang === 'en-US') ||
      voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Chrome loads voices asynchronously
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener('voiceschanged', speak, { once: true });
  } else {
    speak();
  }
}
