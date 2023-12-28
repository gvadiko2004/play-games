var dragSrcEl = null;

function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.outerHTML);
  this.classList.add("dragElem");

  // Добавляем обработчики событий сенсорного ввода для мобильных устройств
  this.addEventListener("touchmove", handleTouchMove, false);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  this.classList.add("over");
  e.dataTransfer.dropEffect = "move";
  return false;
}

function handleDragEnter(e) {}

function handleDragLeave(e) {
  this.classList.remove("over");
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSrcEl != this) {
    this.parentNode.removeChild(dragSrcEl);
    var dropHTML = e.dataTransfer.getData("text/html");
    this.insertAdjacentHTML("beforebegin", dropHTML);
    var dropElem = this.previousSibling;
    addDnDHandlers(dropElem);
  }
  this.classList.remove("over");
  return false;
}

function handleDragEnd(e) {
  this.classList.remove("over");
  // Удаляем обработчики событий сенсорного ввода при завершении операции перетаскивания
  this.removeEventListener("touchmove", handleTouchMove, false);
}

function handleTouchMove(e) {
  // Обработка движения по сенсорному экрану (мобильные устройства)
  e.preventDefault();
  var touch = e.touches[0];
  // Используем координаты сенсорного ввода для обновления положения элемента
  dragSrcEl.style.left = touch.pageX - dragSrcEl.offsetWidth / 2 + "px";
  dragSrcEl.style.top = touch.pageY - dragSrcEl.offsetHeight / 2 + "px";
}

function addDnDHandlers(elem) {
  elem.addEventListener("dragstart", handleDragStart, false);
  elem.addEventListener("dragenter", handleDragEnter, false);
  elem.addEventListener("dragover", handleDragOver, false);
  elem.addEventListener("dragleave", handleDragLeave, false);
  elem.addEventListener("drop", handleDrop, false);
  elem.addEventListener("dragend", handleDragEnd, false);

  // Добавляем обработчики событий сенсорного ввода для мобильных устройств
  elem.addEventListener("touchstart", handleDragStart, false);
}

var cols = document.querySelectorAll("#columns .column");
[].forEach.call(cols, addDnDHandlers);

// CHANGE TEXT

let originalText = {};

function editText(id) {
  const editableText = document.getElementById(id);
  originalText[id] = editableText.innerText;
  editableText.focus();
  document.execCommand("selectAll", false, null);
  editableText.style.cursor = "text";
  editableText.style.pointerEvents = "all";
}

function saveText(id) {
  const editableText = document.getElementById(id);
  const newText = editableText.innerText;
  editableText.innerText =
    newText.length > 16 ? newText.slice(0, 16) + "..." : newText;
  originalText[id] = newText;
  editableText.style.cursor = "default";
  editableText.style.pointerEvents = "none";
  console.log(`Текст ${id} сохранен:`, originalText[id]);
}

// BUTTON CHANGE

const teamPanel = document.querySelectorAll(".team-panel-header");

teamPanel.forEach((panel) => {
  const panelButtonChange = panel.querySelector(".team-panel-header_change");
  const panelButtonSave = panel.querySelector(".team-panel-header_save");
  const panelButtonText = panel.querySelector("#editableText");

  panelButtonChange.addEventListener("click", function () {
    panelButtonChange.style.display = "none";
    panelButtonSave.style.display = "block";
    panelButtonText.style.cursor = "text";
    panelButtonText.style.pointerEvents = "all";
  });

  panelButtonSave.addEventListener("click", function () {
    panelButtonChange.style.display = "block";
    panelButtonSave.style.display = "none";
    panelButtonText.style.cursor = "default";
    panelButtonText.style.pointerEvents = "all";
  });
});
