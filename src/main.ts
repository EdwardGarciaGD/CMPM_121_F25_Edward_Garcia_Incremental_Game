//import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <h1>Purple Nurples!</h1>
  <div id="counter">0 purple nurples</div>
  <br>
  <div id="rate"></div>
  <br>
  <div id="upgrades"></div>
  <br>
  <div id="ovens"></div>
  <br>
  <div id="bakeries"></div>
  <br>
  <div id="footer">Created by Edward Garcia <br><br></div>
`;

let isGameStarted: boolean = false;
let counter: number = 0;
let startTime: number = 0;
let growthRate: number = 1;
let numOfOvenUpgrades: number = 0;
let numOfOvens: number = 0;
let numOfBakeries: number = 0;

const counterElement = document.getElementById("counter")!;
const rateElement = document.getElementById("rate")!;
const upgradesElement = document.getElementById("upgrades")!;
const ovensElement = document.getElementById("ovens")!;
const bakeriesElement = document.getElementById("bakeries")!;
const bakeButton = document.createElement("button");
const ovenUpgradeButton: HTMLButtonElement = document.createElement("button");
const ovenBuyButton: HTMLButtonElement = document.createElement("button");
const bakeryBuyButton: HTMLButtonElement = document.createElement("button");

document.body.appendChild(bakeButton);
bakeButton.innerText = "🥧 Bake!";
bakeButton.onclick = () => {
  if (!isGameStarted) {
    isGameStarted = true;
    startUpdate();
  }
  updateCounter();
};

ovenUpgradeButton.onclick = () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += .1;
    growthRate = roundTo(growthRate, 2);
    numOfOvenUpgrades += 1;
    alert(
      "Oven Upgraded! It is now baking .1 more purple nurples per second!",
    );
    upgradesElement.textContent = " Number of Oven Upgrades: " +
      numOfOvenUpgrades;
  }
};

ovenBuyButton.onclick = () => {
  if (counter >= 100) {
    counter -= 100;
    growthRate += 2;
    numOfOvens += 1;
    alert(
      "1 oven bought! You are now baking 2 more purple nurples per second!",
    );
    ovensElement.textContent = " Number of ovens: " + numOfOvens;
  }
};

bakeryBuyButton.onclick = () => {
  if (counter >= 1000) {
    counter -= 1000;
    growthRate += 50;
    numOfBakeries += 1;
    alert(
      "1 bakery bought! You are now baking 50 more purple nurples per second!",
    );
    bakeriesElement.textContent = " Number of bakeries: " + numOfBakeries;
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
  counter = roundTo(counter, 2);

  updateDisplay();
}

function updateDisplay() {
  counterElement.textContent = counter + " purple nurples";
  rateElement.textContent = growthRate + " nurples/sec";

  if (counter === 10 && !document.body.contains(ovenUpgradeButton)) {
    displayNewUgradeButton("Upgrade Oven", ovenUpgradeButton);
  } else if (counter >= 100 && !document.body.contains(ovenBuyButton)) {
    displayNewUgradeButton("Buy Oven", ovenBuyButton);
  } else if (counter >= 1000 && !document.body.contains(bakeryBuyButton)) {
    displayNewUgradeButton("Buy Bakery", bakeryBuyButton);
  }
}

function displayNewUgradeButton(
  buttonText: string,
  upgradeButton: HTMLButtonElement,
) {
  document.body.appendChild(upgradeButton);
  upgradeButton.innerText = buttonText;
}

function roundTo(num: number, places: number) {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
}
