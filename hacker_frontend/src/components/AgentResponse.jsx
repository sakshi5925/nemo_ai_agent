export default function AgentResponse({
    response = "Awaiting command..."
}) {

    return (

        <div
            className="panel"
            style={{
                minHeight: "220px"
            }}
        >

            <h3
                style={{
                    color: "#ff4444",
                    marginBottom: "20px"
                }}
            >
                AGENT RESPONSE
            </h3>

            <div
                style={{
                    color: "white",
                    lineHeight: "1.8",
                    fontSize: "15px",
                    whiteSpace: "pre-wrap"
                }}
            >
                {response}
            </div>

        </div>

    );
}