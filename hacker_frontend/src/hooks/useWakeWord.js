import { useEffect } from "react";
import { speak, nemoSpeaking } from "../services/speak";

let waitingForCommand = false;
let commandTimeout = null;
let commandBuffer = "";
let shouldRestart = true;
let isListening = false;

export default function useWakeWord(onCommand) {

    useEffect(() => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            console.error(
                "Speech Recognition not supported"
            );

            return;
        }

        const recognition =
            new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        const wakeWords = [
            "nemo",
            "nimu",
            "nimo",
            "neemo",
            "memo",
            "need more",

        ];

        const startCommandMode = () => {

            waitingForCommand = true;

            clearTimeout(commandTimeout);

            commandTimeout = setTimeout(() => {

                waitingForCommand = false;

                console.log(
                    "⏰ Nemo command mode ended"
                );

            }, 10000);

        };

        recognition.onstart = () => {

            isListening = true;

            console.log(
                "🎤 Nemo listening..."
            );

        };

        recognition.onresult = (event) => {

            if (nemoSpeaking) {

                return;

            }

            const text =
                event.results[
                    event.results.length - 1
                ][0].transcript;

            const lower =
                text.toLowerCase()
                    .trim();

            console.log(
                "Heard:",
                lower
            );


            const greetings = [

                "hello",
                "hi",
                "hey",

                "hello nemo",
                "hi nemo",
                "hey nemo",

                "good morning nemo",
                "good evening nemo"
            ];

            if (
                greetings.includes(lower)
            ) {

                console.log("GREETING DETECTED");

                speak(
                    "Hey Sakshi."
                );

                return;
            }

            /*
            --------------------------------------------------
            Direct command:
            "nemo open google"
            --------------------------------------------------
            */

            const wakeWord =
                wakeWords.find(
                    word =>
                        lower.includes(word)
                );

            if (wakeWord) {

                console.log(
                    "WAKE WORD:",
                    wakeWord
                );

                const command =
                    lower
                        .replaceAll(wakeWord, "")
                        .trim();

                if (command.length > 0) {

                    console.log(
                        "Command:",
                        command
                    );

                    onCommand(command);

                    startCommandMode();

                    return;
                }

                /*
                --------------------------------------------------
                Wake word only:
                "nemo"
                --------------------------------------------------
                */

                commandBuffer = "";

                waitingForCommand = true;

                speak("Yeah?");

                clearTimeout(commandTimeout);

                commandTimeout = setTimeout(() => {

                    waitingForCommand = false;
                    commandBuffer = "";

                }, 10000);

                return;
            }

            /*
            --------------------------------------------------
            Follow-up command:
            "open youtube"
            --------------------------------------------------
            */
            if (waitingForCommand) {

                commandBuffer += " " + lower;

                clearTimeout(commandTimeout);

                commandTimeout = setTimeout(() => {

                    const finalCommand =
                        commandBuffer.trim();

                    commandBuffer = "";
                    waitingForCommand = false;

                    console.log(
                        "Sending to server:",
                        finalCommand
                    );

                    onCommand(finalCommand);

                }, 2000);

                return;
            }

        };

        recognition.onerror = (e) => {

            console.log(
                "ERROR:",
                e.error
            );

            if (
                e.error === "aborted"
            ) {
                return;
            }

            if (
                e.error === "no-speech"
            ) {

                try {
                    recognition.stop();
                } catch { }

                return;
            }

        };

        recognition.onend = () => {

            isListening = false;

            console.log(
                "🎤 Recognition ended"
            );

            if (!shouldRestart)
                return;

            const delay =
                nemoSpeaking
                    ? 1500
                    : 500;

            setTimeout(() => {

                if (isListening)
                    return;

                try {

                    recognition.start();

                } catch (err) {

                    console.log(
                        "Restart failed:",
                        err.message
                    );

                }

            }, delay);

        };

        recognition.start();

        recognition.onaudiostart = () => {
            console.log("🎧 Audio start");
        };

        recognition.onaudioend = () => {
            console.log("🔇 Audio end");
        };

        recognition.onspeechstart = () => {
            console.log("🗣 Speech start");
        };

        recognition.onspeechend = () => {
            console.log("🤫 Speech end");
        };

        return () => {

            shouldRestart = false;

            clearTimeout(commandTimeout);

            try {

                recognition.stop();

            } catch { }

        };

    }, [onCommand]);

}