import puppeteer from "puppeteer";

let browser;
let page;

/*
|--------------------------------------------------------------------------
| Start Browser
|--------------------------------------------------------------------------
*/

export async function startBrowser() {

  if (browser) {
    return {
      success: true,
      message: "Browser already running"
    };
  }

  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });

  page = await browser.newPage();

  return {
    success: true,
    message: "Browser started"
  };
}

/*
|--------------------------------------------------------------------------
| Open URL
|--------------------------------------------------------------------------
*/

export async function openURL({ url }) {

  await page.goto(url, {
    waitUntil: "domcontentloaded"
  });

  const title = await page.title();

  return {
    success: true,
    title,
    url
  };
}

/*
|--------------------------------------------------------------------------
| Click Element
|--------------------------------------------------------------------------
*/

export async function click({ selector }) {

  await page.waitForSelector(selector);

  await page.click(selector);

  return {
    success: true
  };
}


export async function pressKey({ key }) {

  await page.keyboard.press(key);

  return {
    success: true,
    key
  };
}

export async function waitForNavigation() {

  try {

    await page.waitForNavigation({
      waitUntil: "networkidle2",
      timeout: 5000
    });

  } catch {

    console.log(
      "No navigation detected"
    );
  }

  return {
    success: true
  };
}


export async function wait({ ms = 3000 }) {

  await new Promise(
    resolve => setTimeout(resolve, ms)
  );

  return {
    success: true,
    waited: ms
  };
}
/*
|--------------------------------------------------------------------------
| Type Text
|--------------------------------------------------------------------------
*/

export async function typeText({
  selector,
  text
}) {

  await page.waitForSelector(selector);

  await page.click(selector, {
    clickCount: 3
  });

  await page.keyboard.press(
    "Backspace"
  );

  await page.type(
    selector,
    text,
    {
      delay: 30
    }
  );
  return {
    success: true
  };
}

/*
|--------------------------------------------------------------------------
| Get Text
|--------------------------------------------------------------------------
*/

export async function getText({
  selector
}) {

  await page.waitForSelector(selector);

  const text = await page.$eval(
    selector,
    el => el.innerText
  );

  return {
    success: true,
    text
  };
}

/*
|--------------------------------------------------------------------------
| Screenshot
|--------------------------------------------------------------------------
*/

export async function takeScreenshot({
  path
}) {

  await page.screenshot({
    path,
    fullPage: true
  });

  return {
    success: true,
    path
  };
}

/*
|--------------------------------------------------------------------------
| Scrape Page
|--------------------------------------------------------------------------
*/

export async function scrapePage() {

  const text = await page.evaluate(() => {
    return document.body.innerText;
  });

  return {
    success: true,
    content: text.slice(0, 5000)
  };
}

/*
|--------------------------------------------------------------------------
| Close Browser
|--------------------------------------------------------------------------
*/


export async function googleSearch({
  query
}) {

  ensurePage();

  await page.goto(
    `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    {
      waitUntil: "networkidle2"
    }
  );

  const title =
    await page.title();

  return {
    success: true,
    query,
    title
  };
}


export async function youtubeSearch({
  query
}) {

  ensurePage();

  await page.goto(
    `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
    {
      waitUntil: "networkidle2"
    }
  );

  return {
    success: true,
    query
  };
}

export async function closeBrowser() {

  if (browser) {
    await browser.close();
    browser = null;
    page = null;
  }

  return {
    success: true
  };
}