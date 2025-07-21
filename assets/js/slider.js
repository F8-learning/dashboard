const slider = document.querySelector(".slider-component");
const track = slider.querySelector(".slider-track");
const slides = Array.from(track.children);
const prevBtn = slider.querySelector(".slider-prev");
const nextBtn = slider.querySelector(".slider-next");

const slideCount = slides.length;
let currentIndex = 1; // Start from second slide because I do the clone

// Clone first and last slide for the smooth lôp
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slideCount - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

const allSlides = track.querySelectorAll(".slide");
const totalSlides = allSlides.length;

// Setting
track.style.transform = `translateX(-${100 * currentIndex}%)`;

let isTransitioning = false;

function updateSliderPosition() {
  track.style.transition = "transform 0.4s ease";
  track.style.transform = `translateX(-${100 * currentIndex}%)`;
  isTransitioning = true;
}

function jumpToIndex(index) {
  track.style.transition = "none";
  track.style.transform = `translateX(-${100 * index}%)`;
  currentIndex = index;
}

track.addEventListener("transitionend", () => {
  isTransitioning = false;

  if (currentIndex === 0) {
    jumpToIndex(slideCount); // jump to last slide
  } else if (currentIndex === totalSlides - 1) {
    jumpToIndex(1); // first slide
  }
});

nextBtn.addEventListener("click", () => {
  if (isTransitioning) return;
  currentIndex++;
  updateSliderPosition();
});

prevBtn.addEventListener("click", () => {
  if (isTransitioning) return;
  currentIndex--;
  updateSliderPosition();
});
