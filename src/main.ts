//import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <h1>Purple Nurples!</h1>
  <br>
  <div id="counter">0 purple nurples</div>
  <br><br>
`;

let isGameStarted: boolean = false;
let counter: number = 0;
let startTime: number = 0;
let growthRate: number = 1;

const counterElement = document.getElementById("counter")!;
const bakeButton = document.createElement("button");
const upgradeButton = document.createElement("button");

document.body.appendChild(bakeButton);
bakeButton.innerText = "🥧 Bake!";
bakeButton.onclick = () => {
  if (!isGameStarted) {
    isGameStarted = true;
    startUpdate();
  }
  updateCounter();
};

upgradeButton.onclick = () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1;
    alert(
      "Oven Upgraded! It is now baking " + growthRate +
        " purple nurples per second!",
    );
  }
};

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
  counter += growthRate;
  counterElement.textContent = counter + " purple nurples";

  if (counter === 10) {
    addUgradeButton();
  }
}

function addUgradeButton() {
  document.body.appendChild(upgradeButton);
  upgradeButton.innerText = "Upgrade Oven!";
}
