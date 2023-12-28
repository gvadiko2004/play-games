const header = document.querySelector(".header");
const menuList = document.querySelector(".menu-list");
const first = document.querySelector(".first");
const second = document.querySelector(".second");
const sliderTimerSlide = document.querySelector(
  ".slider-timer .swiper-slide-next"
);

function removeActiveClass() {
  menuList.classList.remove("active");
  header.classList.remove("active");
  sliderTimerSlide.classList.remove("active");
}

first.addEventListener("click", function () {
  menuList.classList.toggle("active");
  header.classList.toggle("active");
  sliderTimerSlide.classList.toggle("active");

  setTimeout(removeActiveClass, 60500);
});

second.addEventListener("click", function () {
  menuList.classList.toggle("active");
  header.classList.toggle("active");
  sliderTimerSlide.classList.toggle("active");

  setTimeout(removeActiveClass, 6500);
});

window.onload = () => {
  document.querySelector(".path").style.animation =
    "swipe-dot 2s 0.5s infinite";

  document.querySelector(".hand-icon").style.animation =
    "swipe-hand 2s infinite";
};
