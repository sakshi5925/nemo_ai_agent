# Nemo AI Agent

Nemo is an autonomous AI Operating System Assistant that combines Large Language Models, browser automation, file management, terminal execution, and voice interaction into a single intelligent agent.

## Features

* Voice-controlled AI assistant with wake-word activation ("Nemo")
* Browser automation using Puppeteer
* File and folder management
* Terminal command execution
* Web content extraction and screenshots
* Real-time tool execution logs
* Natural language task execution
* Text-to-Speech and Speech Recognition
* Terminal-style hacker-themed interface

## Tech Stack

### Frontend

* React.js
* Vite
* Web Speech API
* CSS

### Backend

* Node.js
* Express.js
* Gemini API
* Puppeteer

## Project Structure

```text
nemo_ai_agent/
│
├── hacker-agent/       # Backend
│
├── hacker_frontend/    # Frontend
│
└── README.md
```

## Installation

### Backend

```bash
cd hacker-agent

npm install

npm run dev
```

### Frontend

```bash
cd hacker_frontend

npm install

npm run dev
```

## Environment Variables

Create a `.env` file inside the backend directory.

```env
GEMINI_API_KEY=YOUR_API_KEY
```

## Example Commands

```text
Nemo create a folder called demo

Nemo open Google

Nemo search DP series on YouTube

Nemo take a screenshot

Nemo list files in current directory
```





## Future Improvements

* Local LLM support
* Multi-agent architecture
* Memory and long-term context
* Desktop application using Electron
* Advanced system control tools

## Author

Sakshi Kumari

B.Tech Information Technology, IIIT Vadodara
