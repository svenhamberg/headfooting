const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const imageCount = 60;
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

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex];
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex];
}

// Handle arrow keys
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("show")) return;
  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "Escape") closeLightbox();
});

// Handle touch swipes
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