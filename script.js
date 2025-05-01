let lovePhrases = [];
let images = [];
var iloveEl;
let updateInterval = 0;
let rowOpacity;
let heartBeatOn;
let scrollSpeed;
let rowHeight = 0;
let loveLoopInterval;
let settingsData = {};


const isDevelopment = window.location.hostname == "localhost" || window.location.hostname == "127.0.0.1";

const config = {
  backend: isDevelopment ? "http://localhost:3000" : "https://lovebackend.onrender.com",
  backendUrl: isDevelopment ? "http://localhost:3000/settings" : "https://lovebackend.onrender.com/settings",
  keepAliveUrl: isDevelopment ? "http://localhost:3000/keepalive" : "https://lovebackend.onrender.com/keepalive",
  imagesUrl: isDevelopment ? "http://localhost:3000/images.json" : "https://lovebackend.onrender.com/images.json",
};

const backend = config.backend;
const backendUrl = config.backendUrl;
const keepAliveUrl = config.keepAliveUrl;
const imagesUrl = config.imagesUrl;
const apiUrl = "/api/pgdrive-image";
const apiVideoUrl = "/api/pgdrive-video";

function showSettingsPanel() {
  if (document.getElementById("settings-panel")) return; // already open

  const panel = document.createElement("div");
  panel.style.display = "none";
  panel.id = "settings-panel";
  panel.innerHTML = `<div class="settings-inner">
    <h2>Settings</h2>
    <form id="settings-form"></form>
    <div class="settings-buttons">
      <button type="button" id="apply-settings">Apply</button>
      <button type="button" id="close-settings">Close</button>
    </div>
  </div>`;
  document.body.appendChild(panel);

  fetch(backendUrl)
    .then(res => res.json())
    .then(data => {
      settingsData = data;
      const form = document.getElementById("settings-form");
      form.innerHTML = Object.entries(data).map(([key, value]) => {
        return `<label>${key}: <input type="text" name="${key}" value="${value}"></label>`;
      }).join("<br>");
      
      panel.style.display = "block";
    });

  document.getElementById("close-settings").onclick = () => {
    panel.remove();
  };
  document.getElementById("apply-settings").onclick = () => {
    const inputs = document.querySelectorAll("#settings-form input");
    inputs.forEach(input => {
      const key = input.name;
      const value = input.value;
      settingsData[key] = (value === "true") ? true :
                          (value === "false") ? false :
                          isNaN(value) ? value : Number(value);
    });

    applySettings(settingsData);
    saveSettingsToFile(settingsData);
    panel.remove();
  };
}

function saveSettingsToFile(settings) {

  setLocalStorage(settings);

  fetch(backendUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings)
  }).then(res => {
    if (!res.ok) console.error("❌ Failed to save settings to backend");
  });
  
}

function applySettings(settings) {

  if ("PhraseUpdateInterval" in settings) {
    updateInterval = settings["PhraseUpdateInterval"] * 1000;
    if (loveLoopInterval) clearInterval(loveLoopInterval);
    startLoveLoop();
  }

  if ("RowOpacity" in settings) {
    rowOpacity = settings["RowOpacity"];
    document.querySelectorAll(".row").forEach(row => {
      row.style.filter = `opacity(${rowOpacity})`;
    });
  }

  if ("HeartBeat" in settings) {
    heartBeatOn = settings["HeartBeat"];
    toggleHeartbeat(heartBeatOn);
  }

  if ("ScrollSpeed" in settings) {
    updateScrollSpeed(settings["ScrollSpeed"]);
  }
  
}
function setLocalStorage(settings) {
  
  localStorage.setItem("settings", JSON.stringify(settings));
  
}
function fetchAssetsAndStart() {
  iloveEl = document.getElementById("ilove");

  const resizeObserver = new ResizeObserver(() => {
    fitText(iloveEl, 150, 30);
  });

  resizeObserver.observe(iloveEl);

  Promise.all([
    fetch(imagesUrl).then(res => res.json()),
    fetch("us/phrases.json").then(res => res.json()),
    fetch(backendUrl).then(res => res.json())
  ])
  .then(([imagesData, phrasesData, settings]) => {
    console.log(settings);
    updateInterval = (settings["PhraseUpdateInterval"] || 5) * 1000;
    rowOpacity = settings["RowOpacity"] || 0.15;
    heartBeatOn = settings["HeartBeat"] || false;
    scrollSpeed = settings["ScrollSpeed"] || 1;

    setLocalStorage(settings);
    

    toggleHeartbeat(heartBeatOn);


    images = imagesData;
    preloadMediaElements();
    generateRows();
    updateScrollSpeed(scrollSpeed);

    lovePhrases = phrasesData;
    startLoveLoop();

    document.getElementById("lightbox").addEventListener("click", () => {
      document.getElementById("lightbox").classList.add("hidden");
    });

    startHearts();
  })
  .catch(err => console.error("❌ Failed to load assets:", err));
}

// 🔁 Shuffle function to randomize images per row
function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
let currentLightboxMedia = null;
let preloadedMedia = [];

function preloadMediaElements() {
  preloadedMedia = images.map(file => {
    console.log("started preloading", file);
    const fileType = file.mimeType.startsWith("image/") ? "img" : "video";
    const src = backend + (fileType === "img" ? apiUrl : apiVideoUrl) + "?fileId=" + file.id;


    const el = document.createElement(fileType);
    el.src = src;
    el.draggable = false;
    el.classList.add("media-thumb");

    if (fileType === "video") {
      el.controls = false;
      el.muted = true;
      el.loop = true;
      el.autoplay = true;
    }

    // el.addEventListener("contextmenu", e => e.preventDefault());

    // el.addEventListener("click", () => {
    //   openLightbox(el);
    // });

    return el;
  });
}

function createScrollingRow(index, y) {
  const row = document.createElement("div");
  row.classList.add("row");

  const isEven = index % 2 === 0;
  const directionClass = isEven ? "scroll-right" : "scroll-left";
  row.classList.add(directionClass);
  row.style.height = `${rowHeight}px`;
  row.style.filter = `opacity(${rowOpacity})`;

  const shuffledMedia = shuffleArray(preloadedMedia);
  const filesPerRow = preloadedMedia.length;

  for (let i = 0; i < filesPerRow * 2; i++) {
    const original = shuffledMedia[i % shuffledMedia.length];
    const clone = original.cloneNode(true);

    if (clone.tagName.toLowerCase() === "video") {
      clone.controls = false;
      clone.muted = true;
      clone.loop = true;
      clone.autoplay = true;
    }

    clone.addEventListener("contextmenu", e => e.preventDefault());
    clone.addEventListener("click", () => openLightbox(original));

    row.appendChild(clone);
  }

  return row;
}

function openLightbox(mediaElement) {
  const lightbox = document.getElementById("lightbox");
  lightbox.innerHTML = "";
  lightbox.classList.remove("hidden");

  const clone = mediaElement.cloneNode(true);
  clone.controls = true;
  clone.muted = false;
  clone.autoplay = true;
  lightbox.appendChild(clone);

  lightbox.onclick = () => {
    lightbox.classList.add("hidden");
    lightbox.innerHTML = "";
  };

  lightbox.addEventListener("contextmenu", (e) => e.preventDefault());
}

/*
let currentLightboxMedia = null;

function createScrollingRow(index, y) {
  const row = document.createElement("div");
  row.classList.add("row");

  const isEven = index % 2 === 0;
  const directionClass = isEven ? "scroll-right" : "scroll-left";
  row.classList.add(directionClass);
  row.style.height = `${rowHeight}px`;
  row.style.filter = `opacity(${rowOpacity})`;

  const shuffledFiles = shuffleArray(images);
  const filesPerRow = images.length;

  for (let i = 0; i < filesPerRow * 2; i++) {
    const file = shuffledFiles[i % shuffledFiles.length];
    const fileType = file.mimeType.startsWith("image/") ? "image" : "video";

    if (fileType === "image") {
      const img = document.createElement("img");
      img.src = backend + apiUrl + "?fileId=" + file.id;
      img.draggable = false;
      img.addEventListener("contextmenu", (e) => e.preventDefault());

      img.addEventListener("click", () => {
        img.classList.add("lightbox-image");
        openLightbox(img);
      });

      row.appendChild(img);
    } else {
      const video = document.createElement("video");
      video.src = backend + apiVideoUrl + "?fileId=" + file.id;
      video.controls = false;
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.draggable = false;
      video.addEventListener("contextmenu", (e) => e.preventDefault());

      video.addEventListener("click", () => {
        video.classList.add("lightbox-video");
        openLightbox(video);
      });

      row.appendChild(video);
    }
  }

  return row;
}

function openLightbox(mediaElement) {
  const lightbox = document.getElementById("lightbox");
  lightbox.innerHTML = ""; // Clear existing content
  lightbox.classList.remove("hidden");

  // Clone the element so the original remains in the row (optional)
  const clone = mediaElement.cloneNode(true);
  clone.controls = true;
  lightbox.appendChild(clone);

  // Close lightbox on click anywhere
  lightbox.onclick = () => {
    lightbox.classList.add("hidden");
    lightbox.innerHTML = "";
  };

  lightbox.addEventListener("contextmenu", (e) => e.preventDefault());
} */

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
    row.style.zIndex = 999;
    background.appendChild(row);
  }
}

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

function fitText(el, maxFont = 150, minFont = 30) {
  let size = maxFont;
  el.style.fontSize = `${size}px`;
  el.style.whiteSpace = "nowrap";
  el.style.display = "inline-block";

  const container = el.parentElement || document.body;

  while (el.scrollWidth > container.clientWidth && size > minFont) {
    size -= 2;
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
  loveLoopInterval = setInterval(updatePhrase, updateInterval);
}

function generatePage() {  
  // Main love message
  const main = document.createElement("div");
  main.className = "main";

  const title = document.createElement("h1");
  title.id = "mylove";
  title.textContent = "💖 POOKIE 💖";
  title.classList.add("shine");

  const loveLine = document.createElement("p");
  loveLine.id = "ilove";
  loveLine.textContent = "I LOVE YOU 💖";

  main.appendChild(title);
  main.appendChild(loveLine);
  document.body.appendChild(main);

  // Background image grid
  const background = document.createElement("div");
  background.className = "background";
  document.body.appendChild(background);

  // Hearts overlay container
  const hearts = document.createElement("div");
  hearts.className = "hearts-container";
  document.body.appendChild(hearts);

  // Hearts overlay container
  const float = document.createElement("div");
  float.id = "float-container";
  document.body.appendChild(float);

  // Lightbox for image zoom
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.classList.add("hidden");

  document.body.appendChild(lightbox);
}

function startKeepAlive() {
  setInterval(() => {
    fetch(keepAliveUrl).catch(err =>
      console.warn("⚠️ Keep-alive failed:", err)
    );
  }, 5 * 60 * 1000); // every 5 minutes
}

function toggleHeartbeat(enable) {
  const el = document.getElementById("mylove");
  if (!el) return;
  
  if (enable) {
    el.style.animation = "heartbeat 1.8s infinite ease-in-out, shine 3s infinite ease-in-out";
  } else {
    el.style.animation = "shine 3s infinite ease-in-out";
  }
}

function updateScrollSpeed(multiplier) {
  const baseSeconds = 60; // base duration
  const duration = baseSeconds / multiplier;

  document.querySelectorAll(".row").forEach(row => {
    row.style.setProperty("--scroll-speed", `${duration}s`);
  });
}

function parseBool(str) {
  return str === "true";
}


/* ------------------------------------------------------------------------------------------------------------------- */

window.addEventListener("resize", () => {
  generateRows();
  fitText(iloveEl, 150, 30);
});

document.addEventListener("DOMContentLoaded", () => {  
  generatePage();
  fetchAssetsAndStart();
  startKeepAlive();  
});

// Listen for CTRL+L to open settings
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "l") {
    e.preventDefault();
    showSettingsPanel();
  }
});