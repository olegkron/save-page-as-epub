# save-page-as-epub

This package provides a command-line utility to fetch a webpage and save it as a readable ePub file. It's designed to simplify the process of saving online articles and web content for offline reading.

## Installation

To install `save-page-as-epub` globally on your system, run:

```bash
npm install -g save-page-as-epub
```

## Usage

To save a webpage as an ePub file, run:

```bash
savePageAsEpub <url>
```

## Dependencies

- @mozilla/readability: Parses the webpage for readable content.
- jsdom: Provides DOM functionality for parsing webpages.
- epub-gen: Generates ePub files from processed content.
