// Updated KEYMAP with messages and specific audio files
const KEYMAP = {
  "help": {
    messages: [
      "Help? You mean 'Google' — use that.",
      "You want help? That's an optional premium feature."
    ],
    audio: "audio/help.mp3"
  },
  "code": {
    messages: [
      "Write code? You mean copy-paste from StackOverflow like everyone else.",
      "Compilation error? Congrats, you found the bug."
    ],
    audio: "audio/code.mp3"
  },
  "love": {
    messages: [
      "Love? Try a mirror — at least it listens.",
      "Love is blinking 'seen' without replying."
    ],
    audio: "audio/love.mp3"
  },

  "hello": {
    messages: [
      "Well, hello there...or whoever you are.",
      "hello.I'm not impressed yet"
    ],
    audio: "audio/hello.mp3"
  },
  "breakup": {
    messages: [
      "Step 1:Enjoy the single life.Step 2: Let the ex regret losing you",
      "Congrats on your promotion to single and ready to mingle"
    ],
    audio: "audio/breakup.mp3"
  },
  "confession": {
    messages: [
      "Confession? You mean 'I did something stupid'?",
      "Confessions are just excuses with a dramatic flair."
    ],
    audio: "audio/confession.mp3"
  },
  "I hate you": {
    messages: [
      "Hate? That's just love in a bad mood.",
      "I hate you too, but I still have to listen."
    ],
    audio: "audio/hate.mp3"
  },
  "relationship": {
    messages: [
      "Relationship? You mean a series of negotiations and compromises.",
      "Relationships are just two people trying to outsmart each other."
    ],
    audio: "audio/relationship.mp3"
  },
  "joke": {
    messages: [
      "Why did the programmer quit? Because they didn't get arrays.",
      "I told my computer I needed a break, now it won't stop sending me beach wallpapers."
    ],
    audio: "audio/joke.mp3"
  },
  "weather": {
    messages: [
      "Weather? Check your window, it's free.",
      "Weather updates? I thought you were here for the sarcasm."
    ],
    audio: "audio/weather.mp3"
  },
  "debug": {
    messages: [
      "Debugging? You mean finding the bug you wrote last week?",
      "Debugging is just a fancy term for 'I have no idea what I did'."
    ],
    audio: "audio/code.mp3"
  },
  "fail": {
    messages: [
      "Fail? You mean the first step to success, right?",
      "Failure is just success in progress... or so they say."
    ],
    audio: "audio/fail.mp3"
  },
  "news": {
    messages: [
      "News? You mean the same recycled drama every day?",
      "News is just yesterday's gossip with a fancy title."
    ],
    audio: "audio/news.mp3"
  },
  "music": {
    messages: [
      "Music? You mean the soundtrack to your procrastination?",
      "Music is just noise until you find the right beat."
    ],
    audio: "audio/music.mp3"
  },
  "sports": {
    messages: [
      "Sports? You mean watching people run around while you sit?",
      "Sports are just an excuse to shout at the TV."
    ],
    audio: "audio/sports.mp3"
  },
  "food": {
    messages: [
      "Food? You mean the reason you procrastinate cooking?",
      "Food is just fuel for your procrastination engine."
    ],
    audio: "audio/food.mp3"
  },
  "travel": {
    messages: [
      "Travel? You mean the art of packing and unpacking?",
      "Travel is just an excuse to take bad selfies in front of landmarks."
    ],
    audio: "audio/travel.mp3"
  },
  "life": {
    messages: [
      "Life? You mean the never-ending series of unfortunate events?",
      "Life is just a series of awkward moments strung together."
    ],
    audio: "audio/life.mp3"
  },
  "fun": {
    messages: [
      "Fun? You mean the thing you forgot existed?",
      "Fun is just a myth invented by people who don't work."
    ],
    audio: "audio/aara.mp3"
  },
  "motivation": {
    messages: [
      "Motivation? You mean the thing that runs out after Monday?",
      "Motivation is just caffeine in a different form."
    ],
    audio: "audio/motivation.mp3"
  },
  "inspiration": {
    messages: [
      "Inspiration? You mean the thing you wait for while scrolling memes?",
      "Inspiration is just procrastination with a fancy name."
    ],
    audio: "audio/inspiration.mp3"
  },
  "idea": {
    messages: [
      "Idea? You mean the thing you had at 3 AM and forgot by morning?",
      "Ideas are just thoughts that haven't been procrastinated yet."
    ],
    audio: "audio/idea.mp3"
  },
  "advice": {
    messages: [
      "Advice? You mean unsolicited opinions from strangers?",
      "Advice is just someone else's experience wrapped in a bow."
    ],
    audio: "audio/advice.mp3"
  },
  "random": {
    messages: [
      "Random? You mean the same as everything else in life?",
      "Randomness is just life without a script."
    ],
    audio: "audio/ml2.mp3"
  }
};

const FALLBACKS = [
  "Bro, that's a 404 for brain cells.",
  "Ask later, I'm on a sabbatical from being helpful.",
  "Impress me first, then I'll pretend to care.",
];

const FALLBACK_AUDIO = "audio/help.mp3"; // Fallback audio for unrecognized inputs

const chat = document.getElementById('chat');
const input = document.getElementById('prompt');
const send = document.getElementById('send');
const mute = document.getElementById('mute');
const player = document.getElementById('player');

function append(text, cls = 'bot') {
  const d = document.createElement('div');
  d.className = 'msg ' + cls;
  d.innerText = text;
  chat.appendChild(d);
  chat.scrollTop = chat.scrollHeight;
}

function generateReply(user) {
  const u = user.toLowerCase();
  for (const k of Object.keys(KEYMAP)) {
    if (u.includes(k)) {
      const data = KEYMAP[k];
      const msg = data.messages[Math.floor(Math.random() * data.messages.length)];
      return { text: msg, audio: data.audio };
    }
  }
  // fallback
  const fallbackText = FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
  return { text: fallbackText, audio: FALLBACK_AUDIO };
}

async function handleSend() {
  const q = input.value.trim();
  if (!q) return;
  append(q, 'user');
  input.value = '';
  send.disabled = true;

  const reply = generateReply(q);
  append(reply.text, 'bot');

  if (!mute.checked && reply.audio) {
    player.src = reply.audio;
    try {
      await player.play();
    } catch (e) {
      console.warn('playback blocked', e);
    }
  } else {
    player.pause();
    player.src = '';
  }

  send.disabled = false;
}

send.addEventListener('click', handleSend);
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSend();
});

