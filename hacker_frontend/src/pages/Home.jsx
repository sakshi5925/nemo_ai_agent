import { useState, useEffect, useCallback } from "react";

import AgentOrb from "../components/AgentOrb";
import VoiceVisualizer from "../components/VoiceVisualizer";
import Terminal from "../components/Terminal";

import { speak } from "../services/speak";
import { sendMessage } from "../services/api";

import useWakeWord from "../hooks/useWakeWord";

export default function Home() {

    const [history, setHistory] =
        useState([]);

    const [isProcessing, setIsProcessing] =
        useState(false);

    /*
    ------------------------------------------
    Startup Greeting
    ------------------------------------------
    */

    useEffect(() => {

        setHistory([
            {
                command: "SYSTEM",
                response:
                    "Hey Sakshi. Nemo is online. What are we building today?",
                logs: []
            }
        ]);

    }, []);

    /*
    ------------------------------------------
    Main Agent Function
    ------------------------------------------
    */

    const askAgent = useCallback(

        async (prompt) => {

            if (!prompt?.trim()) {
                return;
            }

            if (isProcessing) {

                speak(
                    "Give me a second."
                );

                return;
            }

            setIsProcessing(true);

            try {

                const start =
                    performance.now();

                /*
                ------------------------------------------
                Add temporary message
                ------------------------------------------
                */

                setHistory(prev => [

                    ...prev,

                    {
                        command: prompt,
                        response:
                            "Nemo is working on it...",
                        logs: []
                    }

                ]);

                /*
                ------------------------------------------
                Call Backend
                ------------------------------------------
                */

                const result =
                    await sendMessage(
                        prompt
                    );

                console.log(
                    "API:",
                    (
                        performance.now() -
                        start
                    ).toFixed(0),
                    "ms"
                );

                /*
                ------------------------------------------
                Replace temporary message
                ------------------------------------------
                */

                setHistory(prev => {

                    const updated =
                        [...prev];

                    updated[
                        updated.length - 1
                    ] = {

                        command: prompt,

                        response:
                            result.response ||
                            "Done.",

                        logs:
                            result.logs || []

                    };

                    return updated;
                });

                /*
                ------------------------------------------
                Speak Response
                ------------------------------------------
                */

                if (
                    result?.response
                ) {

                    speak(
                        result.response
                    );

                }

            } catch (err) {

                console.error(err);

                setHistory(prev => [

                    ...prev,

                    {
                        command: prompt,

                        response:
                            "Sorry Sakshi, I hit an error.",

                        logs: []
                    }

                ]);

                speak(
                    "Sorry Sakshi, I hit an error."
                );

            } finally {

                setIsProcessing(
                    false
                );

            }

        },

        [isProcessing]

    );

    /*
    ------------------------------------------
    Wake Word Listener
    ------------------------------------------
    */

    useWakeWord(
        askAgent
    );

    /*
    ------------------------------------------
    UI
    ------------------------------------------
    */

    return (

        <div
            style={{
                minHeight: "100vh",
                padding: "30px"
            }}
        >

            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "420px 1fr",

                    gap: "30px",

                    height: "90vh"
                }}
            >

                {/* LEFT SIDE */}

                <div
                    style={{
                        display: "flex",

                        flexDirection:
                            "column",

                        alignItems:
                            "center",

                        justifyContent:
                            "center",

                        gap: "30px"
                    }}
                >

                    <AgentOrb />

                    <VoiceVisualizer />

                </div>

                {/* RIGHT SIDE */}

                <Terminal
                    history={history}
                />

            </div>

        </div>

    );
}