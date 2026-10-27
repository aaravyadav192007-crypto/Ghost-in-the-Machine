
const form = document.getElementById("command-form");
const input = document.getElementById("command");
const output = document.getElementById("output");
const sendBtn = document.getElementById("send");
const clearBtn = document.getElementById("clear");
const aiToggle = document.getElementById("ai-toggle");
const modeLabel = document.getElementById("mode");
const notice = document.getElementById("notice");

let localAI = false;
let busy = false;

const spookyReplies = [
  "The shadows whisper: Someone has been here before you...",
  "A ghostly voice says: The past is never truly gone.",
  "The machine replies: I remember a world before the internet.",
  "Something stirs in the darkness. It knows your command.",
  "The spirits say: Every forgotten file has a story.",
  "A cold wind passes. The terminal remembers everything.",
  "The ghost whispers: Open the source, and find the truth.",
  "A message appears: Not every mystery needs to be solved tonight."
];

const helpText = [
  "Available commands:",
  "help     - Show available commands",
  "story    - Summon a spooky story",
  "haunt    - Receive a mysterious message",
  "about    - Learn about Phantom AI",
  "whoami   - Discover your identity",
  "time     - Display your local time",
  "clear    - Clear the terminal"
].join("\n");

function addLine(text, className = "ghost-line") {
  const line = document.createElement("p");
  line.className = className;
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function randomReply() {
  return spookyReplies[
    Math.floor(Math.random() * spookyReplies.length)
  ];
}

function makeStory() {
  const openings = [
    "At midnight, a forgotten computer switched itself on.",
    "The old terminal blinked, although its power was disconnected.",
    "A message arrived from a machine abandoned years ago.",
    "Behind the locked door, a computer began typing by itself."
  ];

  const middles = [
    "A strange symbol appeared on the screen.",
    "The cursor moved as if someone invisible were watching.",
    "A voice from the speakers whispered a forgotten name.",
    "The machine opened a file that nobody remembered creating."
  ];

  const endings = [
    "Then the screen displayed: YOU ARE NOT ALONE.",
    "The last line read: I HAVE BEEN WAITING.",
    "Suddenly, every light in the room flickered.",
    "The terminal went dark, but the typing continued."
  ];

  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  return `${pick(openings)}\n${pick(middles)}\n${pick(endings)}`;
}

async function askLocalAI(question) {
  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3.2",
      stream: false,
      messages: [
        {
          role: "system",
          content:
            "You are Phantom, a creative spooky-story assistant. " +
            "Write atmospheric, imaginative Halloween mysteries. " +
            "Keep responses under 120 words. Never claim to be a real spirit."
        },
        {
          role: "user",
          content: question
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error("Local AI request failed. Check Ollama and the model.");
  }

  const data = await response.json();
  return data.message?.content || "The spirits have nothing to say.";
}

async function handleCommand(rawCommand) {
  const command = rawCommand.trim();

  if (!command || busy) return;

  addLine(`visitor@phantom:~$ ${command}`, "user-line");

  const normalized = command.toLowerCase();

  // These commands work without any AI model.
  switch (normalized) {
    case "clear":
      output.replaceChildren();
      return;

    case "help":
      addLine(helpText);
      return;

    case "story":
      addLine(makeStory());
      return;

    case "haunt":
      addLine(randomReply());
      return;

    case "about":
      addLine(
        "Phantom AI is an experimental spooky terminal built with " +
        "HTML, CSS and JavaScript. Optional AI runs locally through Ollama."
      );
      return;

    case "whoami":
      addLine(
        "You are a curious traveler exploring the boundary between " +
        "open technology and the unknown."
      );
      return;

    case "time":
      addLine(new Date().toLocaleString());
      return;
  }

  // Optional local model: prompts are sent to your local Ollama service.
  if (localAI) {
    busy = true;
    sendBtn.disabled = true;
    sendBtn.textContent = "Summoning...";
    notice.textContent = "Waiting for your local model...";

    try {
      const answer = await askLocalAI(command);
      addLine(answer);
      notice.textContent = "Local AI response received.";
    } catch (error) {
      addLine(
        "The connection to the local model failed. " +
        "Check that Ollama is running and the model is installed.",
        "error-line"
      );
      notice.textContent = "Local AI unavailable. Check your Ollama setup.";
    } finally {
      busy = false;
      sendBtn.disabled = false;
      sendBtn.textContent = "Summon";
      input.focus();
    }
  } else {
    addLine(randomReply());
    addLine(
      "Tip: type 'story' for a complete tale, or enable local AI for " +
      "AI-generated answers.",
      "system"
    );
  }
}

form.addEventListener("submit", async event => {
  event.preventDefault();

  const command = input.value;
  if (!command.trim() || busy) return;

  input.value = "";
  await handleCommand(command);
});

clearBtn.addEventListener("click", () => {
  output.replaceChildren();
  addLine("Terminal cleared. The darkness remains.", "system");
});

aiToggle.addEventListener("click", () => {
  localAI = !localAI;

  modeLabel.textContent = localAI ? "LOCAL AI" : "OFFLINE MODE";
  aiToggle.textContent = localAI ? "Disable local AI" : "Enable local AI";

  notice.textContent = localAI
    ? "Local AI enabled. Ollama must be running on this computer."
    : "Offline story mode is active. No API key required.";

  addLine(
    localAI
      ? "Local AI mode selected. Your next message can be sent to Ollama."
      : "Offline mode restored. Using built-in spooky responses.",
    "system"
  );
});
