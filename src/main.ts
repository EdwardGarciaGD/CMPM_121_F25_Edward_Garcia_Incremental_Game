import BurpleNurplesJPGUrl from "./Burple Nurples Chowder.jpg";
import "./style.css";

document.title = "Burple Nurples!";
document.body.innerHTML = `
  <h1>Burple Nurples!</h1>
  <p><img src="${BurpleNurplesJPGUrl}" width="300" height="200"/></p>
  <div id="counter"></div>
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
let ovenUpgradePrice: number = 10;
let ovenPrice: number = 100;
let bakeryPrice: number = 1000;

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
  if (counter >= ovenUpgradePrice) {
    counter -= ovenUpgradePrice;
    ovenUpgradePrice = updateUpgradePrice(ovenUpgradePrice);
    growthRate += .1;
    growthRate = roundTo(growthRate, 2);
    numOfOvenUpgrades += 1;
    alert(
      "Oven Upgraded! It is now baking .1 more burple nurples per second!",
    );
    upgradesElement.textContent = " Number of Oven Upgrades: " +
      numOfOvenUpgrades;
    updateButtonText(
      ovenUpgradeButton,
      "Upgrade Oven: " + ovenUpgradePrice + " nurples",
    );
  }
};

ovenBuyButton.onclick = () => {
  if (counter >= ovenPrice) {
    counter -= ovenPrice;
    ovenPrice = updateUpgradePrice(ovenPrice);
    growthRate += 2;
    numOfOvens += 1;
    alert(
      "1 oven bought! You are now baking 2 more burple nurples per second!",
    );
    ovensElement.textContent = " Number of ovens: " + numOfOvens;
    updateButtonText(ovenBuyButton, "Buy Oven: " + ovenPrice + " nurples");
  }
};

bakeryBuyButton.onclick = () => {
  if (counter >= bakeryPrice) {
    counter -= bakeryPrice;
    bakeryPrice = updateUpgradePrice(bakeryPrice);
    growthRate += 50;
    numOfBakeries += 1;
    alert(
      "1 bakery bought! You are now baking 50 more burple nurples per second!",
    );
    bakeriesElement.textContent = " Number of bakeries: " + numOfBakeries;
    updateButtonText(
      bakeryBuyButton,
      "Buy Bakery: " + bakeryPrice + " nurples",
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
  counter = roundTo(counter, 2);

  updateDisplay();
}

function updateDisplay() {
  let buttonText: string;
  counterElement.textContent = counter + " burple nurples";
  rateElement.textContent = growthRate + " nurples/sec";

  if (counter === 10 && !document.body.contains(ovenUpgradeButton)) {
    buttonText = "Upgrade Oven: " + ovenUpgradePrice + " nurples";
    displayNewUgradeButton(buttonText, ovenUpgradeButton);
  } else if (counter >= 100 && !document.body.contains(ovenBuyButton)) {
    buttonText = "Buy Oven: " + ovenPrice + " nurples";
    displayNewUgradeButton(buttonText, ovenBuyButton);
  } else if (counter >= 1000 && !document.body.contains(bakeryBuyButton)) {
    buttonText = "Buy Bakery: " + bakeryPrice + " nurples";
    displayNewUgradeButton(buttonText, bakeryBuyButton);
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

function updateUpgradePrice(upgradePrice: number) {
  return roundTo(upgradePrice + upgradePrice * .15, 2);
}

function updateButtonText(
  upgradeButton: HTMLButtonElement,
  buttonText: string,
) {
  upgradeButton.innerText = buttonText;
}
