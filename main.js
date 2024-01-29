#!/usr/bin/env node
const { Readability } = require("@mozilla/readability");
const { JSDOM } = require("jsdom");
const Epub = require("epub-gen");
const process = require("process");
const fs = require("fs");
const OUTPUT_DIR = "./output/";
const FILENAME_SPACE_REPLACEMENT = "_";
const URL_ARGUMENT_INDEX = 2;
const URL = process.argv[URL_ARGUMENT_INDEX];

async function fetchAndProcessPage(url) {
  try {
    const dom = await JSDOM.fromURL(url, {});
    const document = dom.window.document;

    let reader = new Readability(document);
    let article = reader.parse();

    if (!article)
      return console.error("Failed to parse the article from the page.");

    const epubOptions = {
      title: article.title,
      author: article.byline,
      content: [{ title: article.title, data: article.content }],
    };

    const epubFilename = `${OUTPUT_DIR}${article.title.replace(/\s+/g, FILENAME_SPACE_REPLACEMENT)}.epub`;

    new Epub(epubOptions, epubFilename).promise.then(
      () => console.log("ePub generated successfully."),
      (err) => console.error("Failed to generate ePub:", err),
    );
  } catch (err) {
    console.error("Error fetching or processing the page:", err);
  }
}

if (!URL) {
  console.error("Please provide a URL as an argument.");
  process.exit(1);
}

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

fetchAndProcessPage(URL);
