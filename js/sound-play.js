document.addEventListener("DOMContentLoaded", function () {
  const btnValueAdd = document.querySelector(".value-action__buttons-plus");
  const btnValueMinus = document.querySelector(".value-action__buttons-minus");
  const audioElement = document.getElementById("alarm");
  const contentValue = document.querySelector(".value-mus");
  const btnInfoVoice = document.querySelector(".btn-info-voice");

  btnInfoVoice.addEventListener("click", () => {
    // Проигрывание музыки (ваш аудио-файл)
    alarmSound.currentTime = 0; // Rewind to the beginning
    alarmSound.play();
  });

  // Начальное значение громкости (40%)
  let currentVolume = 0.4;

  // Установка начальной громкости
  audioElement.volume = currentVolume;

  // Обновление содержимого
  updateContent();

  // Обработчик события для кнопки добавления
  btnValueAdd.addEventListener("click", () => {
    // Проверка на максимальное значение (1.0)
    if (currentVolume < 1.0) {
      // Прибавление 20%
      currentVolume += 0.2;
      // Обновление громкости аудио
      updateAudioVolume();
      // Воспроизведение аудио с начала
      audioElement.currentTime = 0;
      audioElement.play();
    }
    // Обновление содержимого
    updateContent();
  });

  // Обработчик события для кнопки уменьшения
  btnValueMinus.addEventListener("click", () => {
    // Проверка на минимальное значение (0.0)
    if (currentVolume > 0.0) {
      // Вычитание 20%
      currentVolume -= 0.2;
      // Обновление громкости аудио
      updateAudioVolume();
      // Воспроизведение аудио с начала
      audioElement.currentTime = 0;
      audioElement.play();
    }
    // Обновление содержимого
    updateContent();
  });

  // Функция для обновления громкости аудио
  function updateAudioVolume() {
    // Установка новой громкости
    audioElement.volume = currentVolume;
  }

  // Функция для обновления содержимого
  function updateContent() {
    // Установка нового значения в текстовое содержимое
    contentValue.textContent = Math.round(currentVolume * 100) + "%";
  }
});

// NEXT

let alarmSound = document.getElementById("alarm");

const isMuted = localStorage.getItem("isMuted") === "true";

$("audio").prop("muted", isMuted);

$(".js-mute").on("click", function () {
  $(this).toggleClass("muted");

  if ($(this).hasClass("muted")) {
    $("audio").prop("muted", true);
    localStorage.setItem("isMuted", "true");
  } else {
    $("audio").prop("muted", false);
    localStorage.setItem("isMuted", "false");

    alarmSound = document.getElementById("alarm");
  }
});

$(".header-voice-button").on("click", function () {
  $("audio").prop("muted", true);
  localStorage.setItem("isMuted", "true");

  alarmSound = document.getElementById("alarm");
});
