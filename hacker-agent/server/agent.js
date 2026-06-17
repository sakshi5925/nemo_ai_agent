import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";

import { tools } from "./toolRegistry.js";
import { functionDeclarations } from "./toolDefinitions.js";
import { SYSTEM_PROMPT } from "./prompts/systemPrompt.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.join(__dirname, "../.env")
});



const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export async function chat(message) {

    global.toolLogs = [];

    console.log("\n🤖 User:");
    console.log(message);

    const contents = [
        {
            role: "user",
            parts: [
                {
                    text: SYSTEM_PROMPT
                }
            ]
        },
        {
            role: "user",
            parts: [
                {
                    text: message
                }
            ]
        }
    ];

    while (true) {

        let response;

        try {


            console.time("GEMINI");

            response =
                await ai.models.generateContent({
                    model: "gemini-3-flash-preview",
                    contents,
                    config: {
                        tools: [
                            {
                                functionDeclarations
                            }
                        ]
                    }
                });

        } catch (err) {

            console.error(
                "\n🚨 GEMINI API ERROR"
            );

            console.error(err);
            console.error(err.stack);

            throw err;
        }

        console.timeEnd("GEMINI");

        const candidate =
            response.candidates?.[0];

        if (!candidate) {

            throw new Error(
                "No candidate returned from Gemini"
            );
        }

        const parts =
            candidate.content?.parts || [];

        const functionCallPart =
            parts.find(
                part => part.functionCall
            );

        if (!functionCallPart) {

            console.log(
                "\n✅ Final Answer:"
            );

            console.log(
                response.text
            );

            return {
                response:
                    response.text,
                logs:
                    global.toolLogs
            };
        }

        const {
            name,
            args
        } =
            functionCallPart.functionCall;

        console.log(
            "\n🔧 Tool Call"
        );

        console.log(
            "Tool:",
            name
        );

        console.log(
            "Args:",
            args
        );

        global.toolLogs.push({
            type: "tool",
            name,
            args,
            time:
                new Date()
                .toLocaleTimeString()
        });

        const tool =
            tools[name];

        if (!tool) {

            console.error(
                "\n🚨 TOOL NOT FOUND"
            );

            console.error(
                name
            );

            throw new Error(
                `Tool '${name}' not found`
            );
        }

        let result;

        try {

            console.time(`TOOL:${name}`);
            result =
                await tool(
                    args || {}
                );

        } catch (err) {

            console.error(
                "\n🚨 TOOL EXECUTION ERROR"
            );

            console.error(
                "Tool:",
                name
            );

            console.error(err);
            console.error(
                err.stack
            );

            result = {
                success: false,
                error:
                    err.message
            };
        }

        console.log(
            "\n📦 Tool Result"
        );

        console.dir(
            result,
            { depth: null }
        );

        contents.push({
            role: "model",
            parts
        });

        contents.push({
            role: "user",
            parts: [
                {
                    functionResponse: {
                        name,
                        response: {
                            result
                        }
                    }
                }
            ]
        });

    }
}

export default ai;