const images = [
  "20240904_194805.jpg",
  "20240904_194834.jpg",
  "20240904_194926-COLLAGE.jpg",
  "20240904_194926.jpg",
  "20240904_223157.jpg",
  "20240904_223304.jpg",
  "20240913_101307.jpg",
  "20250323_142640.jpg",
  "20250323_142734.jpg",
  "20250326_213040.jpg",
  "20250328_234641.jpg",
  "VideoCapture_20241102-201107.jpg",
  "WhatsApp Image 2025-01-22 at 09.06.04.jpeg",
  "WhatsApp Image 2025-02-07 at 20.04.21.jpeg",
  "WhatsApp Image 2025-03-13 at 13.46.49.jpeg",
  "WhatsApp Image 2025-03-23 at 14.56.25.jpeg",
  "WhatsApp Image 2025-03-23 at 14.56.39.jpeg",
  "WhatsApp Image 2025-03-23 at 14.56.43.jpeg",
  "WhatsApp Image 2025-03-23 at 14.56.57.jpeg",
  "WhatsApp Image 2025-03-23 at 14.56.59.jpeg",
  "WhatsApp Image 2025-03-23 at 14.57.26.jpeg",
  "WhatsApp Image 2025-03-23 at 14.57.31.jpeg",
  "WhatsApp Image 2025-03-23 at 14.57.37.jpeg",
  "WhatsApp Image 2025-03-23 at 14.57.44.jpeg",
  "WhatsApp Image 2025-03-23 at 16.53.44.jpeg",
  "WhatsApp Image 2025-03-27 at 17.33.06.jpeg",
  "WhatsApp Image 2025-03-29 at 11.33.13.jpeg",
  "WhatsApp Image 2025-03-30 at 09.46.35.jpeg",
  "WhatsApp Image 2025-03-30 at 10.01.32.jpeg",
  "WhatsApp Image 2025-03-30 at 10.04.18.jpeg",
  "WhatsApp Image 2025-04-01 at 19.45.31.jpeg",
  "WhatsApp Image 2025-04-01 at 20.52.48.jpeg",
  "WhatsApp Image 2025-04-02 at 10.04.22.jpeg",
  "WhatsApp Image 2025-04-03 at 23.48.51.jpeg"
];
const lovePhrases = [
  "I love you more than words can say 💕",
  "You're my everything 🌍",
  "Forever isn't long enough with you ♾️❤️",
  "Every moment with you is a gift 🎁",
  "You're the light in my life 🌟",
  "You're my heart's home 🏡💖",
  "My love for you grows stronger every day 🌱💗",
  "You're my favorite person 🥰",
  "You complete me 🧩",
  "You are the reason I smile 😄❤️",
  "I'm so lucky to have you 🍀",
  "You are my happy place ☁️💞",
  "I could stare at you forever 👀😍",
  "I fall in love with you again every day 🔁💘",
  "With you, I am whole 💞",
  "You make everything better ✨",
  "You are my dream come true 🌈",
  "You're the best part of me ❤️‍🔥",
  "You are my person 💑",
  "I'd choose you in every lifetime 🌌",
  "You make my soul shine 🌞",
  "I'm nothing without you 💔",
  "I adore you more than coffee ☕❤️",
  "I want you. Forever 🔐",
  "You're the one I prayed for 🙏❤️",
  "I still get butterflies 🦋",
  "My heart beats for you 💓",
  "You're my soulmate 🔗",
  "You and I are meant to be 💫",
  "You make the world beautiful 🌸",
  "I'm yours, completely 💍",
  "You are loved more than you know 💗",
  "Every love song reminds me of you 🎶",
  "I crave your smile 😊",
  "You are my sweetest addiction 🍬💘",
  "You + Me = Always 💑",
  "My love, my life, my forever 💖",
  "I'd cross the stars for you 🌠",
  "You're my one and only 💎",
  "You are the poetry in my life ✍️❤️",
  "Just seeing you makes my day 🌞",
  "You're the calm to my chaos 🌊🫶",
  "I love your laugh 😂❤️",
  "You're the reason my heart races 🏃💓",
  "You're my daily miracle 🌟",
  "You light up my darkest days 🕯️",
  "You're the best decision I've ever made ✅❤️",
  "You are my favorite hello and hardest goodbye 👋💔",
  "I miss you when we're not together 🥺",
  "You make my heart race 🏁💘",
  "You're the sunshine of my soul ☀️🧡",
  "Your love is my safe space 🛏️💖",
  "I'm addicted to your love 💊💓",
  "You're the song in my heart 🎵❤️",
  "You're the stars in my night sky 🌌",
  "You're the first person I think of every morning 🌅",
  "You are my safe place 🛡️",
  "You're my best friend and my love 💑👯‍♀️",
  "Loving you is effortless 💆‍♂️💖",
  "Your love is my forever favorite 💞",
  "You're perfect to me 💯",
  "You're my constant in a chaotic world 🌪️❤️",
  "You are my joy, my peace, my home 🧘🏠",
  "I can't wait to grow old with you 👴👵💘",
  "You make life magical 🎩✨",
  "You're my greatest adventure 🌍💫",
  "You make love feel real 💌",
  "You are my better half 🧡",
  "Your love is the melody in my heart 🎼💖",
  "With you, everything makes sense 🧠💗",
  "Your voice is my favorite sound 🔊❤️",
  "You make every day brighter 🌞🌼",
  "I love the way you love me 💞",
  "You're my love story 📖💕",
  "I see forever in your eyes 👁️♾️",
  "I never want to be without you 🚫😢",
  "You're my comfort, my warmth, my light 🔥❤️",
  "You make me believe in love again 💘🔁",
  "I'm never letting you go 🫂",
  "You're the reason I believe in soulmates 🌟",
  "You're the best part of my life 🧸",
  "You're the home my heart searched for 🏠💓",
  "I'd write your name in the stars 🌠🖋️",
  "You are my heart's desire 💗🔥",
  "With you, I'm the happiest I've ever been 🥹💖",
  "You're my muse, my love, my everything 🧠🎨❤️",
  "You're the wish I never knew I made 🌠💭",
  "I want a thousand lifetimes with you 🕰️♾️",
  "You stole my heart — and I’m glad you did 🫶",
  "You are my light in this world 💡🌍",
  "You're my favorite person to fall asleep with 💤💑",
  "I want to love you forever and a day 💘📅",
  "I cherish every second with you ⏱️❤️",
  "You're my reason to keep going 🛣️💗",
  "You're my world 🌎💞",
  "No one makes me feel like you do 🫀✨",
  "You're magic. Real magic ✨🧙‍♂️",
  "You're the smile in my soul 😁🫶",
  "You’re the best part of every day ☀️❤️",
  "I love you endlessly 🔁💓",
  "Always yours. Always mine. Always us ♾️💑"
];


  
let rowHeight = 0;
  
// 🔁 Shuffle function to randomize images per row
function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// 🔄 Create one row at a given y position
function createScrollingRow(index, y) {
  const row = document.createElement("div");
  row.classList.add("row");

  const isEven = index % 2 === 0;
  const directionClass = isEven ? "scroll-right" : "scroll-left";
  row.classList.add(directionClass);
  row.style.top = `${y}px`;
  row.style.height = `${rowHeight}px`;

  // 🔀 Use a shuffled copy of the images
  const shuffledImages = shuffleArray(images);
  const imagesPerRow = images.length;
  console.log(imagesPerRow);
  // ✨ Append images twice for seamless infinite loop
  for (let i = 0; i < imagesPerRow * 2; i++) {
      const img = document.createElement("img");
      img.src = "us/"+shuffledImages[i % shuffledImages.length];
      row.appendChild(img);
      
      img.addEventListener("click", () => {
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightbox-img");
        lightboxImg.src = img.src;
        lightbox.classList.remove("hidden");
      });
      
  }     

  return row;
}
  
function generateRows() {
  const background = document.querySelector(".background");
  background.innerHTML = "";

  // 🧮 Set desired number of rows dynamically
  let rows = Math.floor(window.innerHeight / 200); // aim for ~200px rows
  if (rows % 2 !== 0) rows -= 1; // make it even
  if (rows < 2) rows = 2; // minimum of 2 rows

  // 🧠 Compute row height based on even division
  rowHeight = window.innerHeight / rows;

  for (let i = 0; i < rows; i++) {
    const y = i * rowHeight;
    const row = createScrollingRow(i, y);
    background.appendChild(row);
  }
}
  
document.addEventListener("DOMContentLoaded", () => {
  generateRows();
  startHearts();
  startLoveLoop();

  // 👇 Close the lightbox when clicking outside the image
  document.getElementById("lightbox").addEventListener("click", () => {
    document.getElementById("lightbox").classList.add("hidden");
  });
});

// 💖 Floating heart animation
function spawnHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  // 💖 Random size
  const size = Math.random() * 10 + 10; // 10px – 20px
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;

  // 🎯 Random horizontal start position
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.bottom = `-30px`;

  // 🌀 Add random animation class
  const curve = Math.random() > 0.5 ? 'curve-left' : 'curve-right';
  heart.classList.add(curve);

  // 🕒 Random duration
  heart.style.animationDuration = `${Math.random() * 2 + 4}s`;

  document.querySelector(".hearts-container").appendChild(heart);

  // 💨 Remove after float
  setTimeout(() => heart.remove(), 6000);
}

function startHearts() {
  function spawnRandomly() {
    spawnHeart();
    const delay = Math.random() * 100 + 20; // Between 200ms and 1200ms
    setTimeout(spawnRandomly, delay);
  }

  spawnRandomly();
}
function fitText(el, maxFont = 180, minFont = 120) {
  let size = maxFont;
  el.style.fontSize = `${size}px`;

  while (el.scrollWidth > el.offsetWidth && size > minFont) {
    size -= 1;
    el.style.fontSize = `${size}px`;
  }
}

function startLoveLoop() {
  const el = document.getElementById("ilove");
  if (!el) return;

  function updatePhrase() {
    el.classList.add("fade-out");
    setTimeout(() => {
      const phrase = lovePhrases[Math.floor(Math.random() * lovePhrases.length)];
      el.textContent = phrase;
      el.classList.remove("fade-out");
      fitText(el); // <-- resize if needed
      
      // 💥 Trigger animation
      el.classList.remove("pop"); // reset class
      void el.offsetWidth;        // force reflow
      el.classList.add("pop");
    }, 500);
  }
  

  updatePhrase(); // Show one immediately
  setInterval(updatePhrase, 3000); // Update every 5s
}
window.addEventListener("resize", generateRows);

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");

  if (msg) {
    const el = document.getElementById("ilove");
    if (el) {
      el.textContent = decodeURIComponent(msg);
    }
  }

  generateRows();
  startHearts();
  startLoveLoop(); // <-- start random phrases
});
  
  