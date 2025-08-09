
// simple keyword -> template mapping + random fallback
const KEYMAP = {
  // you can add many more keywords
  "help": [
    "Help? You mean 'Google' — use that.",
    "You want help? That's an optional premium feature."
  ],
  "code": [
    "Write code? You mean copy-paste from StackOverflow like everyone else.",
    "Compilation error? Congrats, you found the bug."
  ],
  "love": [
    "Love? Try a mirror — at least it listens.",
    "Love is blinking 'seen' without replying."
  ],
  "exam": [
    "Studying last night? Bold choice.",
    "Pull an all-nighter and embrace caffeine—your choice."
  ]
};

const FALLBACKS = [
  "Bro, that's a 404 for brain cells.",
  "Ask later, I'm on a sabbatical from being helpful.",
  "Impress me first, then I'll pretend to care."
];

// load audio list (file names in audio/ folder)
const AUDIO_COUNT = 9; // set to how many files you put, e.g., ml1.mp3..ml12.mp3
function pickAudio() {
  const n = Math.floor(Math.random() * AUDIO_COUNT) + 1;
  return `audio/ml${n}.mp3`;
}

const chat = document.getElementById('chat');
const input = document.getElementById('prompt');
const send = document.getElementById('send');
const mute = document.getElementById('mute');
const player = document.getElementById('player');

function append(text, cls='bot') {
  const d = document.createElement('div');
  d.className = 'msg ' + cls;
  d.innerText = text;
  chat.appendChild(d);
  chat.scrollTop = chat.scrollHeight;
}

function generateReply(user) {
  const u = user.toLowerCase();
  // keyword matching (first match wins)
  for (const k of Object.keys(KEYMAP)) {
    if (u.includes(k)) {
      const arr = KEYMAP[k];
      return arr[Math.floor(Math.random()*arr.length)];
    }
  }
  // otherwise random fallback
  return FALLBACKS[Math.floor(Math.random()*FALLBACKS.length)];
}

async function handleSend() {
  const q = input.value.trim();
  if (!q) return;
  append(q, 'user');
  input.value = '';
  send.disabled = true;

  // produce a savage reply quickly (no network)
  const savage = generateReply(q);
  append(savage, 'bot');

  // choose and play audio (user gesture is this click, so playback allowed)
  if (!mute.checked) {
    const audioUrl = pickAudio();
    player.src = audioUrl;
    try {
      await player.play();
    } catch (e) {
      console.warn('playback blocked', e);
    }
  }

  send.disabled = false;
}

send.addEventListener('click', handleSend);
input.addEventListener('keydown', e => { if (e.key==='Enter') handleSend(); });
