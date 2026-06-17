import fs from "fs/promises";

/*
|--------------------------------------------------------------------------
| Create Folder
|--------------------------------------------------------------------------
*/

export async function createFolder({ path }) {

  await fs.mkdir(path, {
    recursive: true
  });

  return {
    success: true,
    path
  };
}

/*
|--------------------------------------------------------------------------
| List Directory
|--------------------------------------------------------------------------
*/

export async function listDir({ path = "." }) {

  const files = await fs.readdir(path);

  return {
    success: true,
    path,
    files
  };
}

/*
|--------------------------------------------------------------------------
| Write File
|--------------------------------------------------------------------------
*/

export async function writeFile({
  path,
  content
}) {

  await fs.writeFile(path, content);

  return {
    success: true,
    path
  };
}

/*
|--------------------------------------------------------------------------
| Read File
|--------------------------------------------------------------------------
*/

export async function readFile({ path }) {

  const content = await fs.readFile(
    path,
    "utf-8"
  );

  return {
    success: true,
    path,
    content
  };
}