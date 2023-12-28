// const themeButton = document.querySelector(".header-theme-button");
// const linkTheme = document.getElementById("theme-change");

// // Функция для установки текущей темы
// function setTheme(theme) {
//   localStorage.setItem("theme", theme);
//   linkTheme.href = `css/${theme}-theme.css`;
// }

// const savedTheme = localStorage.getItem("theme");

// if (savedTheme) {
//   setTheme(savedTheme);
// }

// // Обработчик события для кнопки смены темы
// themeButton.addEventListener("click", function () {
//   if (linkTheme) {
//     // Переключаем тему и сохраняем текущую в localStorage
//     if (linkTheme.href.includes("css/light-theme.css")) {
//       setTheme("dark");
//     } else {
//       setTheme("light");
//     }
//   }
// });
