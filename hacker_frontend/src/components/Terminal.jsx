import { useEffect, useRef } from "react";

export default function Terminal({
    history = []
}) {

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [history]);

    return (

        <div className="terminal">

            <div className="terminal-header">
                NEMO OS
            </div>

            <div className="terminal-body">

                {
                    history.map(
                        (item, index) => (

                            <div
                                key={index}
                                style={{
                                    marginBottom: "30px"
                                }}
                            >

                                <div>
                                    <span className="prompt">
                                        &gt;
                                    </span>

                                    {item.command}
                                </div>

                                <br />

                                <div>

                                    <span
                                        style={{
                                            color: "#ff8888"
                                        }}
                                    >
                                        Nemo:
                                    </span>

                                    {" "}

                                    {item.response}

                                </div>

                                <br />

                                {
                                    item.logs?.map(
                                        (log, i) => (

                                            <div
                                                key={i}
                                                style={{
                                                    color: "#aa4444"
                                                }}
                                            >
                                                [{log.time}]
                                                {" "}
                                                {log.name}
                                            </div>

                                        )
                                    )
                                }

                            </div>

                        )
                    )
                }

                <div>
                    <span className="prompt">
                        &gt;
                    </span>

                    <span className="cursor" />
                </div>

               
                <div ref={bottomRef} />

            </div>

        </div>

    );
}