# Phantom AI

A spooky interactive terminal-inspired web app themed around ghosts, mystery, and local AI experimentation.

## Overview

Phantom AI is a single-page web experience built with HTML, CSS, and JavaScript. It presents a haunted terminal interface where users can enter commands like `help`, `story`, and `haunt` to trigger eerie responses. The app also supports an optional local AI mode powered by Ollama.

## Features

- Haunted terminal UI with a dark, eerie aesthetic
- Built-in spooky command system
- Story generation with random atmospheric text
- Offline mode with predefined responses
- Optional local AI support using Ollama
- Responsive design for desktop and mobile screens

## Tech Stack

- HTML
- CSS
- JavaScript
- Ollama (optional local AI backend)

## Run Locally

Because this project is a static frontend, you can simply open `index.html` in a browser.

### Option 1: Open directly

- Open `index.html` in your browser.

### Option 2: Use a local web server

If you prefer serving it locally:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Local AI Mode

To enable the optional AI-powered responses:

1. Install and run Ollama on your machine.
2. Make sure a compatible model is available, such as `llama3.2`.
3. In the app, click `Enable local AI`.

The app sends requests to:

```text
http://localhost:11434/api/chat
```

## Available Commands

- `help` — Show available commands
- `story` — Generate a spooky story
- `haunt` — Receive a mysterious message
- `about` — Learn about the project
- `whoami` — Discover the traveler identity
- `time` — Display the current local time
- `clear` — Clear the terminal

## Project Structure

```text
Ghost in the Machine/
├── index.html
├── style.css
├── script.js
├── README.md
```

## Notes

- Offline mode does not require any API key.
- Local AI mode requires a working Ollama installation.
- The app is primarily for fun, creative exploration, and learning web interactions.

## License

This project is open for personal and educational use.
