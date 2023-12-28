// THEME
const themeButton = document.querySelector(".header-theme-button");
const themeButtonDark = document.querySelector(".header-theme-button-dark");
const linkTheme = document.getElementById("theme-change");

function saveThemeToLocalStorage(theme) {
  localStorage.setItem("theme", theme);
}

function loadThemeFromLocalStorage() {
  return localStorage.getItem("theme");
}

themeButton.addEventListener("click", function () {
  if (linkTheme) {
    if (linkTheme.href.includes("css/light-theme.css")) {
      linkTheme.href = "css/dark-theme.css";
      saveThemeToLocalStorage("dark");
    } else {
      linkTheme.href = "css/light-theme.css";
      saveThemeToLocalStorage("light");
    }
  }

  themeButton.classList.remove("active");
  themeButtonDark.classList.add("active");
});

themeButtonDark.addEventListener("click", function () {
  if (linkTheme) {
    if (linkTheme.href.includes("css/light-theme.css")) {
      linkTheme.href = "css/dark-theme.css";
      saveThemeToLocalStorage("dark");
    } else {
      linkTheme.href = "css/light-theme.css";
      saveThemeToLocalStorage("light");
    }
  }

  themeButtonDark.classList.remove("active");
  themeButton.classList.add("active");
});

// Load theme from Local Storage on page load
document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = loadThemeFromLocalStorage();
  if (savedTheme === "dark") {
    linkTheme.href = "css/dark-theme.css";
    themeButtonDark.classList.add("active");
  } else {
    linkTheme.href = "css/light-theme.css";
    themeButton.classList.add("active");
  }
});

// VOICE
const voiceButton = document.querySelector(".header-voice-button");
const voiceButtonOff = document.querySelector(".header-voice-button-off");

voiceButton.addEventListener("click", function () {
  voiceButton.classList.remove("active");
  voiceButtonOff.classList.add("active");
});

voiceButtonOff.addEventListener("click", function () {
  voiceButtonOff.classList.remove("active");
  voiceButton.classList.add("active");
});

// function saveVoiceStateToLocalStorage(active) {
//   localStorage.setItem("voiceActive", active);
// }

// function loadVoiceStateFromLocalStorage() {
//   return localStorage.getItem("voiceActive") === "true";
// }

// voiceButton.addEventListener("click", function () {
//   voiceButton.classList.remove("active");
//   voiceButtonOff.classList.add("active");
//   saveVoiceStateToLocalStorage(false);
// });

// voiceButtonOff.addEventListener("click", function () {
//   voiceButtonOff.classList.remove("active");
//   voiceButton.classList.add("active");
//   saveVoiceStateToLocalStorage(true);
// });

// // Load voice state from Local Storage on page load
// document.addEventListener("DOMContentLoaded", function () {
//   const voiceActive = loadVoiceStateFromLocalStorage();
//   if (voiceActive) {
//     voiceButton.classList.add("active");
//   } else {
//     voiceButtonOff.classList.add("active");
//   }
// });
