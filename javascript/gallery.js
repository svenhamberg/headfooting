const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
let lightboxImg = document.getElementById("lightbox-img"); // now reassignable

const imageCount = 65;
const images = [];

for (let i = 1; i <= imageCount; i++) {
  const thumbSrc = `././images/gallery/img${i}.jpg`;
  const fullSrc = `././images/gallery/img${i}.jpg`;

  images.push(fullSrc);

  const img = document.createElement("img");
  img.src = thumbSrc;
  img.alt = `Image ${i}`;
  img.dataset.index = i - 1;
  img.onclick = () => openLightbox(i - 1);
  gallery.appendChild(img);
}

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  document.body.classList.add("noscroll");

  // Clear any existing image
  const container = document.querySelector(".lightbox-inner");
  container.innerHTML = "";

  const img = document.createElement("img");
  img.src = images[currentIndex];
  img.classList.add("active");
  img.id = "lightbox-img";
  container.appendChild(img);
  lightboxImg = img;

  lightbox.classList.add("show");
}

function closeLightbox() {
  document.body.classList.remove("noscroll");
  lightbox.classList.remove("show");
}

// Reusable function to animate swipe
function animateSwipe(newIndex, direction) {
  const container = document.querySelector(".lightbox-inner");
  const oldImg = lightboxImg;
  const newImg = document.createElement("img");
  newImg.src = images[newIndex];

  // Position new image offscreen
  newImg.classList.add(
    direction === "left" ? "slide-in-from-right" : "slide-in-from-left"
    );

  container.appendChild(newImg);
  requestAnimationFrame(() => {
    // Animate old image out
    oldImg.classList.remove("active");
    oldImg.classList.add(
      direction === "left" ? "slide-out-to-left" : "slide-out-to-right"
      );

    // Animate new image in
    newImg.classList.remove(
      direction === "left" ? "slide-in-from-right" : "slide-in-from-left"
      );
    newImg.classList.add("active");

    // Update lightboxImg ref
    lightboxImg = newImg;

    // Clean up old image after transition
    setTimeout(() => {
      oldImg.remove();
    }, 300);
  });

  currentIndex = newIndex;
}

function showNext() {
  const newIndex = (currentIndex + 1) % images.length;
  animateSwipe(newIndex, "left");
}

function showPrev() {
  const newIndex = (currentIndex - 1 + images.length) % images.length;
  animateSwipe(newIndex, "right");
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("show")) return;
  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "Escape") closeLightbox();
});

// Touch support
let startX = 0;
let startY = 0;
let currentX = 0;
let isDragging = false;

const container = document.querySelector(".lightbox-inner");

container.addEventListener("touchstart", (e) => {
  if (!lightboxImg) return;

  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  currentX = startX;
  isDragging = true;

  lightboxImg.style.transition = "none";
});

container.addEventListener("touchmove", (e) => {
  if (!isDragging || !lightboxImg) return;

  const touch = e.touches[0];
  const dx = touch.clientX - startX;
  const dy = touch.clientY - startY;

  // If mostly horizontal swipe, prevent vertical scroll
  if (Math.abs(dx) > Math.abs(dy)) {
    e.preventDefault(); // ⛔ prevents vertical scroll
  }

  currentX = touch.clientX;
  lightboxImg.style.transform = `translateX(${dx}px)`;
}, { passive: false }); // ⚠️ passive: false is required to call preventDefault()

container.addEventListener("touchend", () => {
  if (!isDragging || !lightboxImg) return;

  const dx = currentX - startX;
  const threshold = 50;
  isDragging = false;

  lightboxImg.style.transition = "transform 0.3s ease";

  if (dx < -threshold) {
    lightboxImg.style.transform = "translateX(-100%)";
    setTimeout(showNext, 200);
  } else if (dx > threshold) {
    lightboxImg.style.transform = "translateX(100%)";
    setTimeout(showPrev, 200);
  } else {
    lightboxImg.style.transform = "translateX(0)";
  }
});

// Slide new image helper
function slideInNewImage(index, direction) {
  const newImg = document.createElement("img");
  newImg.src = images[index];
  newImg.style.position = "absolute";
  newImg.style.top = "0";
  newImg.style.left = "0";
  newImg.style.transition = "transform 0.3s ease";
  newImg.style.transform = `translateX(${direction === "right" ? "100%" : "-100%"})`;

  container.appendChild(newImg);

  requestAnimationFrame(() => {
    newImg.style.transform = "translateX(0)";
    if (lightboxImg) {
      lightboxImg.style.transition = "transform 0.3s ease";
      lightboxImg.style.transform = `translateX(${direction === "right" ? "-100%" : "100%"})`;
    }
  });

  setTimeout(() => {
    if (lightboxImg) lightboxImg.remove();
    newImg.id = "lightbox-img";
    newImg.classList.add("active");
    lightboxImg = newImg;
    currentIndex = index;
  }, 300);
}