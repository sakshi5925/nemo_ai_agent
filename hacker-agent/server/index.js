import express from "express";
import cors from "cors";

import { chat } from "./agent.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {

  try {

    const { message } = req.body;

    const result =
      await chat(message);

    res.json({
      success: true,
      response: result.response,
      logs: result.logs
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });

  }

});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});