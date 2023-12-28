// BUTTON CREATE TEAM

const panelButtonsSave = document.querySelector(".panel_buttons-save");
const panelButtonsRandom = document.querySelector(".panel_buttons-random");
const panelButtonsReady = document.querySelector(".panel_buttons-ready");
const btnReady = document.querySelector(".btn-ready");

panelButtonsSave.addEventListener("click", function () {
  const panelButtonsSaveText = document.querySelector(
    ".panel_buttons-save > p"
  );

  if (panelButtonsSaveText.innerText === "Зберегти") {
    panelButtonsSaveText.innerText = "До таймеру";
  } else if (panelButtonsSaveText.innerText === "До таймеру") {
    panelButtonsSave.setAttribute("href", "timer-game.html");
  }
});

panelButtonsRandom.addEventListener("click", function () {
  panelButtonsRandom.classList.add("active");
  panelButtonsReady.classList.add("active");
  btnReady.classList.add("active");

  // Add a delay of 2 seconds before adding the "active" class to btnReady
  setTimeout(function () {
    panelButtonsRandom.classList.add("active");
    panelButtonsReady.classList.add("active");
    btnReady.classList.add("active");
  }, 2000); // 2000 milliseconds = 2 seconds
});

// BUTTON DELETE

// const bodyGame = document.querySelector(".body-game-bg");
// const teamBlocksListUser = document.querySelectorAll(".team-blocks_list-user");
// const confirmPanel = document.querySelector(".confirm-panel");
// const confirmPanelButtonsYes = document.querySelectorAll(".yes");
// const confirmPanelButtonsNo = document.querySelectorAll(".no");

// teamBlocksListUser.forEach(function (block) {
//   const basket = block.querySelector(".team-blocks_list-cap");

//   if (basket.innerText === "Капітан") {
//     basket.style.pointerEvents = "none";
//   }

//   basket.addEventListener("click", function () {
//     confirmPanel.classList.add("active");
//     bodyGame.classList.add("active");
//   });
// });

// confirmPanelButtonsNo.forEach(function (button) {
//   button.addEventListener("click", function () {
//     confirmPanel.classList.remove("active");
//     bodyGame.classList.remove("active");
//   });
// });

// bodyGame.addEventListener("click", function () {
//   bodyGame.classList.remove("active");
//   confirmPanel.classList.remove("active");
// });
