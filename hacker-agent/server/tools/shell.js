import { exec } from "child_process";

const ALLOWED_COMMANDS = [
  "ls",
  "pwd",
  "mkdir",
  "touch",
  "cat",
  "git",
  "npm",
  "node",
  "python",
  "python3"
];

/*
|--------------------------------------------------------------------------
| Run Command
|--------------------------------------------------------------------------
*/

export async function runCommand({ command }) {

  const cmd = command.trim().split(" ")[0];

  if (!ALLOWED_COMMANDS.includes(cmd)) {
    return {
      success: false,
      error: `Command '${cmd}' is not allowed`
    };
  }

  return new Promise((resolve) => {

    exec(command, (error, stdout, stderr) => {

      resolve({
        success: !error,
        stdout: stdout?.trim(),
        stderr: stderr?.trim(),
        error: error?.message || null
      });

    });

  });
}