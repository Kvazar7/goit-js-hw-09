
const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const body = document.querySelector("body");
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener("click", () => {
    startBtn.setAttribute("disabled", "disabled");
  timerId = setInterval(() => {
      body.style.background = getRandomHexColor();
      console.log('Змінюю колір')
  }, 1000);
});

stopBtn.addEventListener("click", () => {
    startBtn.removeAttribute("disabled")
    clearInterval(timerId);
    console.log('Зміна кольорів зупинилась')
});