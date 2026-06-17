export const functionDeclarations = [
    {
        name: "googleSearch",
        description:
            "Search Google directly",

        parameters: {
            type: "object",

            properties: {
                query: {
                    type: "string"
                }
            },

            required: ["query"]
        }
    },
    {
        name: "youtubeSearch",
        description: "Search for videos on YouTube",
        parameters: {
            type: "OBJECT",
            properties: {
                query: {
                    type: "STRING"
                }
            },
            required: ["query"]
        }
    },
    {
        name: "createFolder",
        description: "Create a folder",
        parameters: {
            type: "OBJECT",
            properties: {
                path: {
                    type: "STRING"
                }
            },
            required: ["path"]
        }
    },

    {
        name: "listDir",
        description: "List files in directory",
        parameters: {
            type: "OBJECT",
            properties: {
                path: {
                    type: "STRING"
                }
            },
            required: ["path"]
        }
    },

    {
        name: "readFile",
        description: "Read a file",
        parameters: {
            type: "OBJECT",
            properties: {
                path: {
                    type: "STRING"
                }
            },
            required: ["path"]
        }
    },

    {
        name: "writeFile",
        description: "Write content to a file",
        parameters: {
            type: "OBJECT",
            properties: {
                path: {
                    type: "STRING"
                },
                content: {
                    type: "STRING"
                }
            },
            required: ["path", "content"]
        }
    },

    {
        name: "runCommand",
        description: "Execute terminal command",
        parameters: {
            type: "OBJECT",
            properties: {
                command: {
                    type: "STRING"
                }
            },
            required: ["command"]
        }
    },

    {
        name: "startBrowser",
        description: "Launch browser",
        parameters: {
            type: "OBJECT",
            properties: {}
        }
    },

    {
        name: "closeBrowser",
        description: "Close browser",
        parameters: {
            type: "OBJECT",
            properties: {}
        }
    },

    {
        name: "openURL",
        description: "Open a website",
        parameters: {
            type: "OBJECT",
            properties: {
                url: {
                    type: "STRING"
                }
            },
            required: ["url"]
        }
    },
    {
        name: "typeText",
        description: "Type text into an element",
        parameters: {
            type: "OBJECT",
            properties: {
                selector: {
                    type: "STRING"
                },
                text: {
                    type: "STRING"
                }
            },
            required: [
                "selector",
                "text"
            ]
        }
    },
    {
        name: "getText",
        description: "Read text from page element",
        parameters: {
            type: "OBJECT",
            properties: {
                selector: {
                    type: "STRING"
                }
            },
            required: ["selector"]
        }
    },
    {
        name: "scrapePage",
        description: "Extract readable text content from the current webpage",
        parameters: {
            type: "OBJECT",
            properties: {}
        }
    },
    {
        name: "takeScreenshot",
        description: "Capture screenshot",
        parameters: {
            type: "OBJECT",
            properties: {
                path: {
                    type: "STRING"
                }
            },
            required: ["path"]
        }
    },
    {
        name: "click",
        description: "Click an element on the webpage using a CSS selector",
        parameters: {
            type: "OBJECT",
            properties: {
                selector: {
                    type: "STRING"
                }
            },
            required: ["selector"]
        }
    },
    {
        name: "pressKey",
        description: "Press a keyboard key like Enter, Tab, Escape",
        parameters: {
            type: "OBJECT",
            properties: {
                key: {
                    type: "STRING"
                }
            },
            required: ["key"]
        }
    },
    {
        name: "waitForNavigation",
        description: "Wait until the page finishes loading",
        parameters: {
            type: "OBJECT",
            properties: {}
        }
    },
    {
        name: "wait",
        description: "Wait for some milliseconds",
        parameters: {
            type: "OBJECT",
            properties: {
                ms: {
                    type: "NUMBER"
                }
            },
            required: ["ms"]
        }
    }
];

