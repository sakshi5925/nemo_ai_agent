export let nemoSpeaking = false;

export function speak(text) {

    console.log(
        "NEMO SPEAKING:",
        text
    );

    speechSynthesis.cancel();

    nemoSpeaking = false;

    const utterance =
        new SpeechSynthesisUtterance(text);

    nemoSpeaking = true;

    const voices =
        speechSynthesis.getVoices();

    const preferredVoice =
        voices.find(
            voice =>
                voice.name.includes("Google")
        ) ||
        voices.find(
            voice =>
                voice.lang.startsWith("en")
        );

    if (preferredVoice) {
        utterance.voice =
            preferredVoice;
    }

    utterance.rate = 1;
    utterance.pitch = 0.95;
    utterance.volume = 1;

    utterance.onend = () => {

        nemoSpeaking = false;

    };

    utterance.onerror = () => {

        nemoSpeaking = false;

    };

    speechSynthesis.speak(
        utterance
    );
}