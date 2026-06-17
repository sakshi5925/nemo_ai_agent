import * as fileTool from "./tools/file.js";

import { runCommand } from "./tools/shell.js";

import {
  startBrowser,
  openURL,
  click,
  typeText,
  getText,
  scrapePage,
  takeScreenshot,
  closeBrowser,
  pressKey,
  waitForNavigation,
  googleSearch,
  youtubeSearch
} from "./tools/browser.js";

export const tools = {

  // File System
  createFolder: fileTool.createFolder,
  listDir: fileTool.listDir,
  writeFile: fileTool.writeFile,
  readFile: fileTool.readFile,

  // Terminal
  runCommand,

  // Browser
  startBrowser,
  openURL,
  pressKey,
  waitForNavigation,
  click,
  typeText,
  getText,
  scrapePage,
  takeScreenshot,
  googleSearch,
  youtubeSearch,
  closeBrowser
};