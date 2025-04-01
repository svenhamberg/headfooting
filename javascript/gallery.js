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
  lightboxImg.src = images[currentIndex];
  lightbox.classList.add("show");
}

function closeLightbox() {
  lightbox.classList.remove("show");
}

// New swipe animation logic
function animateSwipe(newIndex, direction) {
  const container = lightboxImg.parentNode;
  const oldImg = lightboxImg;
  const newImg = oldImg.cloneNode();

  currentIndex = newIndex;
  newImg.src = images[currentIndex];
  newImg.id = "lightbox-img";
  newImg.classList.add("swipe-in");

  oldImg.classList.add(direction === "left" ? "swipe-out-left" : "swipe-out-right");

  container.appendChild(newImg);
  lightboxImg = newImg;

  setTimeout(() => {
    oldImg.remove();
  }, 300);
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

lightbox.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const diffX = touchEndX - touchStartX;

  if (Math.abs(diffX) > 50) {
    if (diffX < 0) showNext();
    else showPrev();
  }
});