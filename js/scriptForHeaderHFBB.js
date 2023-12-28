function handleButtonClick(svgId) {
  var pathElement = document.querySelector(`#${svgId} path`);

  if (pathElement.getAttribute("fill") === "white") {
    pathElement.setAttribute("fill", "none");
  } else {
    pathElement.setAttribute("fill", "white");
  }
}

document
  .querySelector("#task1")
  .parentElement.addEventListener("click", function () {
    handleButtonClick("task1");
  });
function changeColor(button) {
  var buttons = document.querySelectorAll(".button-green-list li button");
  buttons.forEach(function (btn) {
    btn.classList.remove("active");
  });

  button.classList.add("active");
}
