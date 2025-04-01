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
let touchStartX = 0;
let touchStartY = 0;

lightbox.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

lightbox.addEventListener("touchmove", (e) => {
  const touchY = e.touches[0].clientY;
  const diffY = Math.abs(touchY - touchStartY);

  // If mostly horizontal swipe, prevent vertical scroll
  if (diffY < 50) e.preventDefault();
}, { passive: false });

lightbox.addEventListener("touchend", (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const diffX = touchEndX - touchStartX;

  if (Math.abs(diffX) > 50) {
    if (diffX < 0) showNext();
    else showPrev();
  }
});