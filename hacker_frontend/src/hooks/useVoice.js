import { useEffect, useRef, useState } from "react";

export default function useVoice(onResult) {

    const [listening, setListening] =
        useState(false);

    const recognitionRef =
        useRef(null);

    useEffect(() => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition)
            return;

        const recognition =
            new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => {
            setListening(true);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognition.onresult = (event) => {

            const transcript =
                event.results[0][0].transcript;

            onResult(transcript);
        };

        recognitionRef.current =
            recognition;

    }, []);

    function startListening() {

        recognitionRef.current?.start();
    }

    return {
        listening,
        startListening
    };
}