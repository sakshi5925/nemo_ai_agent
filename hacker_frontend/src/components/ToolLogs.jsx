export default function ToolLogs({
    logs = []
}) {

    return (

        <div
            style={{
                minHeight: "250px",
                maxHeight: "250px",
                overflowY: "auto"
            }}
        >

            <h3
                style={{
                    color: "#ff4444",
                    marginBottom: "20px"
                }}
            >
                LIVE EXECUTION
            </h3>

            {
                logs.length === 0 && (

                    <p>
                        Waiting for activity...
                    </p>

                )
            }

            {
                logs.map((log, index) => (

                    <div
                        key={index}
                        style={{
                            marginBottom: "15px",
                            paddingBottom: "15px",
                            borderBottom:
                                "1px solid rgba(255,0,0,.2)"
                        }}
                    >

                        <div
                            style={{
                                color: "#ff5555"
                            }}
                        >
                            🔧 {log.name}
                        </div>

                        <div
                            style={{
                                color: "#777",
                                fontSize: "12px"
                            }}
                        >
                            {log.time}
                        </div>

                    </div>

                ))
            }

        </div>

    );
}