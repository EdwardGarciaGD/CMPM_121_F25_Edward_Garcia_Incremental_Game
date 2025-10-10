//import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <h1>Purple Nurples!</h1>
  <br>
  <div id="counter">0 purple nurples</div>
  <br><br>
`;

let counter: number = 0;
const counterElement = document.getElementById("counter")!;

const button = document.createElement("button");
document.body.appendChild(button);
button.innerText = "🥧 Bake!";
button.onclick = () => {
  updateCounter();
};

let startTime = 0;

startUpdate();

function update(timestamp: number) {
  if (!startTime) startTime = timestamp;

  if (timestamp - startTime >= 1000) {
    updateCounter();
    startTime = timestamp;
  }

  requestAnimationFrame(update);
}

function startUpdate() {
  requestAnimationFrame(update);
}

function updateCounter() {
  counter += 1;
  counterElement.textContent = counter + " purple nurples";
}
