const timerItem = document.querySelectorAll(".timer__item");
const swipeHand = document.querySelector(".swipe");

timerItem.forEach((item) => {
  item.addEventListener("click", function () {
    swipeHand.style.display = "none";

    // Додайте цей код, щоб автоматично прокручувати слайдер після кліку
    swiper.slideNext();
  });
});

const actionButtons = document.querySelectorAll(".value-button");

actionButtons.forEach((item) => {
  item.addEventListener("click", function () {
    actionButtons.forEach((button) => {
      button.classList.remove("active");
    });

    item.classList.add("active");
  });
});

const buttonMusic = document.querySelector(".btnInner-voice");
let firstClick = true;

buttonMusic.addEventListener("click", function () {
  if (firstClick) {
    buttonMusic.innerText = "Я чую мелодію";
    firstClick = false;
  } else {
    const link = buttonMusic.closest(".btn");

    if (link) {
      link.href = "create-team.html";
    }
  }
});

const buttonInfoText = document.querySelector(".btn-info");
const infoText = document.querySelector(".welcome-info-text");

buttonInfoText.addEventListener("click", function () {
  infoText.classList.add("active");
});
