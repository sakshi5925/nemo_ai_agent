import useVoice from "../hooks/useVoice";

export default function MicButton({
    onCommand
}) {

    const {
        listening,
        startListening
    } = useVoice(onCommand);

    return (

        <button

            onClick={startListening}

            style={{

                padding: "15px 30px",

                background:
                    listening
                        ? "#ff0000"
                        : "#111",

                color: "white",

                border:
                    "1px solid red",

                borderRadius: "10px",

                cursor: "pointer"
            }}
        >

            {listening
                ? "🎤 Listening..."
                : "🎤 Speak"}

        </button>
    );
}