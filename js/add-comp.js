window.addEventListener("DOMContentLoaded", function () {
  const maxGamerBlocks = 10;
  const gamerPanels = document.querySelectorAll(".team-panel-gamers");

  // Загрузка данных из Local Storage
  function loadUserData() {
    gamerPanels.forEach(function (gamerPanel) {
      const gamerList = gamerPanel.querySelector(".team-blocks_list");
      const savedData = localStorage.getItem(getStorageKey(gamerList));
      if (savedData) {
        gamerList.innerHTML = savedData;
        // Восстанавливаем атрибут contenteditable для сохраненных span
        gamerList.querySelectorAll("[data-id] span").forEach(function (span) {
          span.setAttribute("contenteditable", "true");
          span.addEventListener("input", handleSpanInput);
          span.addEventListener("focus", handleSpanFocus);
        });

        // Проверка количества элементов .team-blocks_list-user
        checkIconMoveDisplay(gamerList);
      }

      const nameBlocks = gamerPanel.querySelectorAll(
        ".team-blocks_list-name span"
      );
      nameBlocks.forEach(function (span) {
        span.setAttribute("contenteditable", "true");
        span.addEventListener("input", handleSpanInput);
        span.addEventListener("focus", handleSpanFocus);
      });
    });
  }

  // Сохранение данных в Local Storage
  function saveUserData(gamerList) {
    localStorage.setItem(getStorageKey(gamerList), gamerList.innerHTML);
    // Проверка количества элементов .team-blocks_list-user
    checkIconMoveDisplay(gamerList);
  }

  // Обработчик ввода для span
  function handleSpanInput(event) {
    const gamerList = event.currentTarget.closest(".team-blocks_list");
    saveUserData(gamerList); // Сохранение данных при изменении текста в блоке
  }

  // Обработчик фокуса для span
  function handleSpanFocus(event) {
    // Выделение текста при фокусировке
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(event.target);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  // Проверка количества элементов .team-blocks_list-user
  function checkIconMoveDisplay(gamerList) {
    const userBlocks = gamerList.querySelectorAll(".team-blocks_list-user");
    const iconMove = gamerList.querySelector(".icon-move");

    if (userBlocks.length > 2) {
      iconMove.style.display = "block";
    } else {
      iconMove.style.display = "none";
    }
  }

  // Обработчик удаления блока
  function handleBlockRemoval(event) {
    const deleteButton = event.target.closest(".team-blocks_list-basket");
    if (deleteButton) {
      const listItem = deleteButton.closest(".team-blocks_list-user");
      listItem.remove();
      const gamerList = deleteButton.closest(".team-blocks_list");
      saveUserData(gamerList); // Сохранение данных при удалении блока
    }
  }

  // Генерация ключа для Local Storage на основе ID панели и ID списка
  function getStorageKey(gamerList) {
    const gamerPanel = gamerList.closest(".team-panel-gamers");
    return `${gamerPanel.id}_${gamerList.id}`;
  }

  // Добавляем обработчик удаления блока для всего документа
  document.addEventListener("click", handleBlockRemoval);

  loadUserData(); // Загрузка данных при загрузке страницы

  document.addEventListener("click", function (event) {
    const addGamerButton = event.target.closest(".add-gamer-button");
    const gamerName = event.target.closest(".team-blocks_list-name span");

    if (addGamerButton) {
      const gamerPanel = addGamerButton.closest(".team-panel-gamers");
      const gamerList = gamerPanel.querySelector(".team-blocks_list");

      if (gamerList.children.length < maxGamerBlocks) {
        const gamerId = Date.now(); // Уникальный идентификатор для блока
        const gamerInfoHTML = `
            <li class="team-blocks_list-user column" data-id="${gamerId}" draggable="true">
              <h2 class="team-blocks_list-name">
                <div class="icon-move">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <g opacity="0.3">
                      <rect x="0.87738" y="1.06464" width="8.27011" height="0.426636" rx="0.213318" stroke="white" stroke-width="0.426636"></rect>
                      <rect x="0.87738" y="8.65192" width="8.27011" height="0.426636" rx="0.213318" stroke="white" stroke-width="0.426636"></rect>
                      <rect x="0.87738" y="4.85822" width="8.27011" height="0.426636" rx="0.213318" stroke="white" stroke-width="0.426636"></rect>
                    </g>
                  </svg>
                </div>
                <span data-id="${gamerId}" contenteditable="true" oninput="handleSpanInput(event)" onfocus="handleSpanFocus(event)">Новий геймер</span>
              </h2>
              <button class="team-blocks_list-cap team-blocks_list-basket">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M0.618164 2.44743H2.05245M9.36815 2.44743H7.99702M6.62589 2.44743H3.48673M6.62589 2.44743V0.625244H3.48673V2.44743M6.62589 2.44743H7.99702M3.48673 2.44743H2.05245M2.05245 2.44743V9.37524H7.99702V2.44743M4.00993 4.19744V7.31856M5.90425 4.19744V7.31856" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </button>
            </li>
          `;

        gamerList.insertAdjacentHTML("beforeend", gamerInfoHTML);
        saveUserData(gamerList); // Сохранение данных при добавлении нового блока
      }
    }

    if (gamerName) {
      gamerName.setAttribute("contenteditable", "true");
      gamerName.focus();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.execCommand("insertLineBreak", false, null);
    }
  });
});
