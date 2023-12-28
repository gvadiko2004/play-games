$(document).ready(function () {
  var maxTeams = 6;
  var teamCounter = 0;

  var storedTeamsList = localStorage.getItem("teamsList");
  if (storedTeamsList) {
    $("#teams__group").html(storedTeamsList);

    // Находим максимальное значение среди текущих команд
    $("#teams__group .team__item").each(function () {
      var currentId = parseInt($(this).attr("id").replace("team", ""));
      if (currentId > teamCounter) {
        teamCounter = currentId;
      }
    });

    // Восстанавливаем значения teamName из localStorage
    for (var i = 1; i <= teamCounter; i++) {
      var teamId = "team" + i;
      var teamName = localStorage.getItem(teamId);
      if (teamName) {
        $("#" + teamId + " .teamName").val(teamName);
      }
    }
  }

  function setDefaultValues(newTeamId) {
    var defaultNames = {
      team1: "Хом’яки",
      team2: "Бурундуки",
      team3: "Мишки",
      team4: "Суперсила",
      team5: "Всезнайки",
      team6: "Історики",
    };

    var teamNameInput = $("#" + newTeamId + " .teamName");
    if (!teamNameInput.val()) {
      var storedTeamName = localStorage.getItem(newTeamId);
      teamNameInput.val(storedTeamName || defaultNames[newTeamId]);
    }
  }

  function addPlayer(teamItem, teamData) {
    var maxPlayers = 10;
    var currentPlayers = teamItem.find(".teamList__item .draggable").length;

    if (currentPlayers >= maxPlayers) {
      // Прячем кнопку добавления нового игрока, если достигнут максимум
      teamItem.find(".teamAdd__user").hide();
    }

    var currentIndex = currentPlayers;
    var playerName;

    // Получаем идентификатор команды
    var teamId = teamItem.attr("id");

    // Проверяем, существует ли элемент с таким идентификатором
    if (teamData && teamData.hasOwnProperty(teamId)) {
      var teamNames = teamData[teamId];

      // Проверяем, достаточно ли имен для текущей команды
      if (currentIndex < teamNames.length) {
        playerName = teamNames[currentIndex];
      } else {
        playerName = "Введите имя";
      }
    } else {
      playerName = "Введите имя";
    }

    var newPlayerHtml = `
            <li class="draggable" draggable="true" >
                <div class="teamPlayer">
                    <button class="playerDelete">
                        <svg>
                            <use href="images/wordyIcons.svg#basket"></use>
                        </svg>
                    </button>
                    <input type="text" value="${playerName}" placeholder="">
                </div>
            </li>
        `;

    teamItem.find(".teamList__item").append(newPlayerHtml);

    // Сохраняем изменения в localStorage
    var teamsList = $("#teams__group").html();
    localStorage.setItem("teamsList", teamsList);
  }

  // Обработчик события для кнопки добавления новой команды
  $(".teamAdd").on("click", function () {
    if ($("#teams__group .team__item").length >= maxTeams) {
      $(".teamAdd").addClass("enough");
      return;
    }

    teamCounter++;
    while ($("#team" + teamCounter).length > 0 || teamCounter > maxTeams) {
      teamCounter = teamCounter > maxTeams ? 1 : teamCounter + 1;
    }

    var newTeamId = "team" + teamCounter;

    var newTeamHtml = `
    <li class="team__item" id="${newTeamId}">
              <div class="team__card">
                <div class="teamLabel">Команда</div>

                <header class="teamHead__card">
                  <div class="hT__left">
                    <input class="teamName" value="" placeholder="" readonly />
                  </div>
                  <div class="hT__right">
                    <button class="editGroupName">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M11.9076 2.50914C12.3641 2.96612 12.3641 3.70702 11.9076 4.164L11.1596 4.91273L4.67807 11.4009L1.75 12.25L2.6089 9.3296L9.83845 2.09273C10.295 1.63576 11.0351 1.63576 11.4916 2.09273L11.9076 2.50914Z"
                          stroke="#AEFB30"
                          stroke-width="2"
                        />
                      </svg>
                      <span>Змінити</span>
                    </button>
                  </div>
                </header>
                <div class="teamPlayers">
                  <div class="tP__header">
                    <div class="tPh__label">Гравці</div>
                    <div class="tPh__subtitle">
                      Додайте гравців і введіть імена в поля знизу
                    </div>
                  </div>

                  <div class="teamList">
                    <ul class="teamList__item"></ul>
                    <div class="teamEdit__bar">
                      <button class="teamAdd__user">
                        <div class="teamAdd__user-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M7.09131 1.75V6.9087M7.09131 6.9087V12.25M7.09131 6.9087H1.75M7.09131 6.9087H12.25"
                              stroke="#AEFB30"
                              stroke-width="2"
                              stroke-linecap="round"
                            />
                          </svg>
                        </div>
                        <span>Додати гравця</span>
                      </button>
                      <button class="teamDelete">
                        <div class="teamAdd__user-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                          >
                            <path
                              d="M1.46094 5.09436H3.87813M16.2072 5.09436H13.8965M11.5857 5.09436H6.29532M11.5857 5.09436V2.02344H6.29532V5.09436M11.5857 5.09436H13.8965M6.29532 5.09436H3.87813M3.87813 5.09436V16.7698H13.8965V5.09436M7.17706 8.04364V13.3036M10.3695 8.04364V13.3036"
                              stroke="white"
                              stroke-width="1.4"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>

                        <span>Видалити команду</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
        `;

    $("#teams__group").append(newTeamHtml);
    setDefaultValues(newTeamId);
    addPlayer($("#" + newTeamId), teamData);
    addPlayer($("#" + newTeamId), teamData); // Добавлен вызов функции дважды для создания двух игроков по умолчанию

    var teamsList = $("#teams__group").html();
    localStorage.setItem("teamsList", teamsList);
    localStorage.setItem(newTeamId, $("#" + newTeamId + " .teamName").val());

    if ($("#teams__group .team__item").length >= maxTeams) {
      $(".teamAdd").addClass("enough");
    }
  });

  // Обработчик события для кнопки удаления команды
  $(document).on("click", ".teamDelete", function () {
    var teamItem = $(this).closest(".team__item");
    var deletedId = parseInt(teamItem.attr("id").replace("team", ""));

    // Показываем модальное окно
    $(".Modal__alert").addClass("visible");
    $(".modalTitle").text("Ви впевнені, що хочете видалити команду?");

    // Обработчик подтверждения удаления
    $(".btn_confirm").one("click", function () {
      // Убираем модальное окно
      $(".Modal__alert").removeClass("visible");

      // Удаляем команду
      teamItem.remove();

      if (deletedId === teamCounter) {
        teamCounter--;
      }

      var teamsList = $("#teams__group").html();
      localStorage.setItem("teamsList", teamsList);
      localStorage.removeItem("team" + deletedId);

      if ($("#teams__group .team__item").length < maxTeams) {
        $(".teamAdd").removeClass("enough");
      }
    });

    // Обработчик отмены удаления
    $(".btn_cancel").one("click", function () {
      // Убираем модальное окно
      $(".Modal__alert").removeClass("visible");
    });
  });

  $(document).on("click", ".editGroupName", function () {
    var teamHeadCard = $(this).closest(".teamHead__card");
    var teamNameInput = teamHeadCard.find(".teamName");

    teamHeadCard.addClass("changes");

    teamNameInput.removeAttr("readonly").focus();
  });

  $(document).on("blur", ".teamName", function () {
    var teamHeadCard = $(this).closest(".teamHead__card");
    teamHeadCard.removeClass("changes");
  });

  setTimeout(function () {
    $(".teamHead__card.changes").removeClass("changes");
  }, 3000);

  $(document).on("blur", ".teamName", function () {
    var teamId = $(this).closest(".team__item").attr("id");
    localStorage.setItem(teamId, $(this).val());
    $(this).attr("readonly", true);
  });

  // Функция для сохранения изменений в названии игрока
  function savePlayerName(playerInput) {
    var playerName = playerInput.val();
    playerInput.attr("value", playerName);

    var teamsList = $("#teams__group").html();
    localStorage.setItem("teamsList", teamsList);
  }

  $(document).on("input", ".teamPlayer input", function () {
    savePlayerName($(this));
  });

  function addPlayer(teamItem, teamData) {
    var maxPlayers = 10;
    var currentPlayers = teamItem.find(".teamList__item .draggable").length;

    if (currentPlayers >= maxPlayers) {
      teamItem.find(".teamAdd__user").hide();
    }

    var currentIndex = currentPlayers;
    var playerName;

    var teamId = teamItem.attr("id");

    if (teamData && teamData.hasOwnProperty(teamId)) {
      var teamNames = teamData[teamId];

      if (currentIndex < teamNames.length) {
        playerName = teamNames[currentIndex];
      } else {
        playerName = "Введите имя";
      }
    } else {
      playerName = "Введите имя";
    }

    var newPlayerHtml = `
            <li class="draggable" draggable="true">
                <div class="teamPlayer">
                    <button class="playerDelete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1.42719 4.17078H3.57861M14.5522 4.17078H12.4955M10.4388 4.17078H5.73004M10.4388 4.17078V1.4375H5.73004V4.17078M10.4388 4.17078H12.4955M5.73004 4.17078H3.57861M3.57861 4.17078V14.5625H12.4955V4.17078M6.51483 6.79579V11.4775M9.35631 6.79579V11.4775" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    </button>
                    <input type="text" value="${playerName}" placeholder="">
                </div>
            </li>
        `;

    teamItem.find(".teamList__item").append(newPlayerHtml);

    var teamsList = $("#teams__group").html();
    localStorage.setItem("teamsList", teamsList);
  }

  $(document).on("click", ".teamAdd__user", function () {
    var teamItem = $(this).closest(".team__item");
    addPlayer(teamItem, teamData);
  });

  function deletePlayer(playerItem) {
    playerItem.remove();

    var teamsList = $("#teams__group").html();
    localStorage.setItem("teamsList", teamsList);
  }

  $(document).on("click", ".playerDelete", function () {
    var playerItem = $(this).closest("li");
    deletePlayer(playerItem);
  });

  function saveTeamChanges(teamItem) {
    var teamsList = $("#teams__group").html();
    localStorage.setItem("teamsList", teamsList);
  }

  $(document).on("click", ".teamSave", function () {
    var teamItem = $(this).closest(".team__item");
    saveTeamChanges(teamItem);
  });
});

var teamData = {
  team1: ["Чіп", "Дейл", "Пружинка", "Гайка", "Шуруп"],
  team2: ["Гаррі", "Рон", "Барт", "Ніл", "Бред"],
  team3: ["Морквинка", "Рудий лис", "Лінивец", "Жужа", "Паштет"],
  team4: ["Швидкий", "Невидимий", "Гнучкий", "Сильний", "Гарний"],
  team5: ["Хімік", "Біолог", "Математик", "Астролог", "Фізрук"],
  team6: ["Клеопатра", "Наполеон", "Лінкольн", "Кравчук", "Чингісхан"],
};

//
