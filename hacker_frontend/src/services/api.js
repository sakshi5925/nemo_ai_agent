import axios from "axios";

const API = "http://localhost:3000";

export async function sendMessage(message) {

    console.time("CHAT_REQUEST");

    const response = await axios.post(
        `${API}/chat`,
        { message }
    );

    console.timeEnd("CHAT_REQUEST");

    return response.data;
}