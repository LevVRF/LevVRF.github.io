let lovePhrases = [];
let images = [];
let updateInterval = 0;
let rowOpacity;
var iloveEl;
let rowHeight = 0;

function fetchAssetsAndStart() {
  
  iloveEl = document.getElementById("ilove");

  const resizeObserver = new ResizeObserver(() => {
    fitText(iloveEl, 150, 30);  
  });  

  resizeObserver.observe(iloveEl);

  Promise.all([
    fetch("us/images.json").then(res => res.json()),
    fetch("us/phrases.json").then(res => res.json()),
    fetch("settings.json").then(res => res.json())
  ])
    .then(([imagesData, phrasesData, settingsData]) => {

      // ⚙️ Load settings
      updateInterval = (settingsData["PhraseUpdateInterval"] || 5) * 1000;
      rowOpacity = settingsData["RowOpacity"] || 0.15;

      // 🌄 Set images and generate grid
      images = imagesData;
      generateRows();

      // 💘 Set love phrases and start the loop
      lovePhrases = phrasesData;
      startLoveLoop();

      // 👇 Close the lightbox when clicking outside the image
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

// 🔄 Create one row at a given y position
function createScrollingRow(index, y) {
  const row = document.createElement("div");
  row.classList.add("row");

  const isEven = index % 2 === 0;
  const directionClass = isEven ? "scroll-right" : "scroll-left";
  row.classList.add(directionClass);
  // row.style.top = `${y}px`;
  row.style.height = `${rowHeight}px`;
  row.style.filter = `opacity(${rowOpacity})`

  // 🔀 Use a shuffled copy of the images
  const shuffledImages = shuffleArray(images);
  const imagesPerRow = images.length;

  // ✨ Append images twice for seamless infinite loop
  for (let i = 0; i < imagesPerRow * 2; i++) {
    const img = document.createElement("img");
    img.src = "us/"+shuffledImages[i % shuffledImages.length];
    img.loading = "lazy";    
    img.draggable = false;
    img.addEventListener("contextmenu", (e) => e.preventDefault());
    img.addEventListener("click", () => {
      const lightbox = document.getElementById("lightbox");
      const lightboxImg = document.getElementById("lightbox-img");
      lightboxImg.src = img.src;
      lightboxImg.draggable = false;
      lightboxImg.addEventListener("contextmenu", (e) => e.preventDefault());
      lightbox.addEventListener("contextmenu", (e) => e.preventDefault());
      lightbox.classList.remove("hidden");
    });

    row.appendChild(img);     
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
  setInterval(updatePhrase, 3000); // Update every 3s
}

window.addEventListener("resize", () => {
  generateRows();
  fitText(iloveEl, 150, 30);
});


document.addEventListener("DOMContentLoaded", () => {

  // Main love message
  const main = document.createElement("div");
  main.className = "main";

  const title = document.createElement("h1");
  title.id = "mylove";
  title.textContent = "💖 POOKIE 💖";

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

  const lightboxImg = document.createElement("img");
  lightboxImg.id = "lightbox-img";
  lightboxImg.alt = "Full Image";

  lightbox.appendChild(lightboxImg);
  document.body.appendChild(lightbox);

  fetchAssetsAndStart();

  
});
  
  
