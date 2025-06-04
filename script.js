const messages = [
  "ₕₐₚₚy Bᵢᵣₜₕdₐy ₜₒ ₜₕₑ ₒₙₑ wₕₒ ₘₐₖₑₛ ₘy wₒᵣₗd bᵣᵢgₕₜₑᵣ — ₚₑₙGᵤᵢₙ!🐧♥",
  "ₜᵤᵢ ₐₘₐᵣ ₛₒₚₙₒ₋ᵣ ᵣₐₐₜ, bₕₐₗₒbₐₛₕₐᵣ ₛₕₒₖₐₗ.🤗",
  "ₐⱼₖₑᵣ dᵢₙₑ ₜₒᵣ cₕₒₖₕ₋ₑᵣ ₐₗₒ ₐₘₐᵣ dᵢₙₑᵣ ᵣₒddᵤᵣ ₕₒbₑ.🌝",
  "ₜᵤᵢ ₛₕₒb ₖᵢcₕᵤᵣ cₕₑyₑ bₑₛₕᵢ — ₜᵤᵢ ₐₘₐᵣ ₐₙₜₒᵣ₋ₑᵣ ₖₒₜₕₐ.🙃",
  "ₐₐⱼ ₜₒᵣ ⱼₒₙₘₒdᵢₙ, ₖᵢₙₜᵤ ᵤₚₒₕₐᵣ ₐₘᵢ ₚₑyₑcₕₕᵢ — ₜᵤᵢ.🫵🏻",
  "ₜₒᵣ ₑₖₜₐ ₕₐₐₛₕᵢ ₐₘₐᵣ ₛₕₒₚₙₒ ₖₑ bₐₛₜₒb ₖₒᵣₑ ₜₒₗₑ..🫠.",
  "ₑᵢ dᵢₙ ₛᵤdₕᵤ ₜₒᵣ ⱼₒₙₙₒ ₙₒy, ₐₘₐᵣ ₐₙₜₒᵣ₋ₑᵣ ₒ ᵤₜₛₕₒb ₐⱼₖₑ!☺"
];

const messageEl = document.getElementById("message");
const button = document.querySelector("button");
const slideshow = document.getElementById("slideshow");
const music = document.getElementById("bg-music");

const images = [
  "Ananya.jpg",
  "Ananya1.jpg",
  "Ananya2.jpg",
  "Ananya3.jpg",
  "Ananya4.jpg",
  "Ananya5.jpg"
];

let imgIndex = 0;
let slideInterval;
let messageRunning = false;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateTyping(text, element) {
  element.innerHTML = "";
  const span = document.createElement("span");
  span.classList.add("typing");
  element.appendChild(span);

  for (let i = 0; i < text.length; i++) {
    span.textContent += text.charAt(i);
    await sleep(60);
  }

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.textContent = "|";
  element.appendChild(cursor);
}

function startSlideshow() {
  if (slideInterval) clearInterval(slideInterval);
  imgIndex = 0;
  slideshow.src = images[imgIndex];

  slideInterval = setInterval(() => {
    imgIndex = (imgIndex + 1) % images.length;
    slideshow.src = images[imgIndex];
  }, 3000);
}

async function showMessages() {
  messageRunning = true;
  button.innerText = "Surprise is on the way...";
  messageEl.style.display = "block";
  messageEl.innerHTML = "";
messageEl.style.fontSize = "1.5em";
  for (const msg of messages) {
  
    await animateTyping(msg, messageEl);
    await sleep(2300);
    if (!messageRunning) return; // If reset mid-way
  }

  messageEl.innerHTML = "<strong class='final-line'> 🎀  𝒮𝒽𝑒𝓈𝒽 𝓀💍𝓉𝒽𝒶 𝒽♡𝓁🏵 – 𝒜𝓂𝒾   𝓉🌞𝓂𝒶𝓀𝑒    𝒷𝒽𝒶𝓁♡𝒷𝒶𝓈𝒽𝒾, 𝒜𝓃𝒶𝓃𝓎𝒶❢  🎀 </strong>";
  button.innerText = "Feel Again";

  music.pause();
  music.currentTime = 0;

  messageRunning = false;
}

function showMessage() {
  // If "Surprise is on the way..." already → reset and restart
  if (messageRunning) {
    messageRunning = false;
    if (slideInterval) clearInterval(slideInterval);
    messageEl.innerHTML = "";
    messageEl.style.display = "none";
    button.innerText = "Feel Again";
    music.pause();
    music.currentTime = 0;
    return;
  }

  music.pause();
  music.currentTime = 0;
  music.play();

  startSlideshow();
  showMessages();
}
