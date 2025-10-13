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

interface Upgrade {
  name: string;
  price: number;
  rate: number;
  numOfUpgrade: number;
}

const availableUpgrades: Upgrade[] = [
  { name: "OvenUpgrade", price: 10, rate: 0.1, numOfUpgrade: 0 },
  { name: "Oven", price: 100, rate: 2, numOfUpgrade: 0 },
  { name: "Bakery", price: 1000, rate: 50, numOfUpgrade: 0 },
];

let isGameStarted: boolean = false;
let counter: number = 0;
let startTime: number = 0;
let growthRate: number = 1;

const counterElement = document.getElementById("counter")!;
const rateElement = document.getElementById("rate")!;
const bakeButton = document.createElement("button");
const upgradesElement = document.getElementById("upgrades")!;
const ovensElement = document.getElementById("ovens")!;
const bakeriesElement = document.getElementById("bakeries")!;

document.body.appendChild(bakeButton);
bakeButton.innerText = "🥧 Bake!";
bakeButton.onclick = () => {
  if (!isGameStarted) {
    isGameStarted = true;
    startUpdate();
  }
  updateCounter();
};

availableUpgrades.forEach((upgrade) => {
  const button: HTMLButtonElement = document.createElement("button");
  button.id = upgrade.name;
  button.className = "upgradebutton";
  button.textContent = upgrade.name + ": " + upgrade.price + " nurples";
  button.onclick = () => buttonUpgrade(upgrade);
  button.disabled = true;
  button.style.opacity = "0";
  document.body.appendChild(button);
});

function buttonUpgrade(upgrade: Upgrade) {
  if (counter >= upgrade.price) {
    counter -= upgrade.price;
    upgrade.price = updateUpgradePrice(upgrade.price);
    growthRate += upgrade.rate;
    growthRate = roundTo(growthRate, 2);
    upgrade.numOfUpgrade += 1;
    displayNewPrice(upgrade.name);
    updateCounter();
  }
}

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
  let button: HTMLButtonElement;
  counterElement.textContent = counter + " burple nurples";
  rateElement.textContent = growthRate + " nurples/sec";

  if (counter === 10) {
    button = document.getElementById("OvenUpgrade") as HTMLButtonElement;
    button.style.opacity = "1";
    button.disabled = false;
  }
  if (counter >= 100) {
    button = document.getElementById("Oven") as HTMLButtonElement;
    button.style.opacity = "1";
    button.disabled = false;
  }
  if (counter >= 1000) {
    button = document.getElementById("Bakery") as HTMLButtonElement;
    button.style.opacity = "1";
    button.disabled = false;
  }
}

function displayNewPrice(buttonID: string) {
  const button: HTMLButtonElement = document.getElementById(
    buttonID,
  ) as HTMLButtonElement;
  button.innerText = buttonID + ": " +
    availableUpgrades.find((upgrade) => upgrade.name === buttonID)?.price +
    " nurples";

  switch (buttonID) {
    case "OvenUpgrade":
      upgradesElement.textContent = "Oven Upgrades: " +
        availableUpgrades.find((upgrade) => upgrade.name === buttonID)
          ?.numOfUpgrade;
      break;
    case "Oven":
      ovensElement.textContent = "Ovens: " +
        availableUpgrades.find((upgrade) => upgrade.name === buttonID)
          ?.numOfUpgrade;
      break;
    case "Bakery":
      bakeriesElement.textContent = "Bakeries: " +
        availableUpgrades.find((upgrade) => upgrade.name === buttonID)
          ?.numOfUpgrade;
      break;
  }
}

function roundTo(num: number, places: number) {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
}

function updateUpgradePrice(upgradePrice: number) {
  return roundTo(upgradePrice + upgradePrice * .15, 2);
}
