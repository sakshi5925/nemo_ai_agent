import { useState } from "react";

export default function CommandInput({
    onSend
}) {

    const [text, setText] =
        useState("");

    function handleSubmit() {

        if (!text.trim())
            return;

        onSend(text);

        setText("");
    }

    return (

        <div
            className="panel"
        >

            <h3
                style={{
                    color: "#ff4444",
                    marginBottom: "15px"
                }}
            >
                COMMAND
            </h3>

            <div
                style={{
                    display: "flex",
                    gap: "10px"
                }}
            >

                <input

                    value={text}

                    onChange={(e) =>
                        setText(
                            e.target.value
                        )
                    }

                    onKeyDown={(e) => {

                        if (
                            e.key === "Enter"
                        ) {
                            handleSubmit();
                        }

                    }}

                    placeholder=
                    "Create folder demo"

                    style={{

                        flex: 1,

                        padding: "14px",

                        background: "#111",

                        color: "white",

                        border:
                            "1px solid red",

                        borderRadius: "8px"
                    }}
                />

                <button
                    onClick={handleSubmit}
                >
                    EXECUTE
                </button>

            </div>

        </div>

    );
}