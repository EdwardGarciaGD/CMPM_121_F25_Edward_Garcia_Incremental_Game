import BurpleNurplesJPGUrl from "./Burple Nurples Chowder.jpg";
import PoiosonousNurplesJPGUrl from "./Poison Burple Nurples Chowder.jpg";
import MungDaalPNGUrl from "./Mung Daal Chowder.png";
import ChowderPNGURL from "./Chowder.png";
import ShnitzelJPGURL from "./Shnitzel Chowder.jpg";
import ThriceCreamPNGURL from "./Thrice Cream Chowder.png";
import "./style.css";

document.title = "Burple Nurples!";
document.body.innerHTML = `
  <h1>Burple Nurples!</h1>
  <div style="display: flex; gap: 10px; justify-content: center;">
  <img id="img1" src="${BurpleNurplesJPGUrl}" width="250" height="200" hidden="true">
  <img id="img2" src="${ChowderPNGURL}" width="250" height="200" hidden="true">
  <img id="img3" src="${PoiosonousNurplesJPGUrl}" width="250" height="200" hidden="true">
  <img id="img4" src="${MungDaalPNGUrl}" width="250" height="200" hidden="true">
  <img id="img5" src="${ShnitzelJPGURL}" width="200" height="200" hidden="true">
  <img id="img6" src="${ThriceCreamPNGURL}" width="250" height="200" hidden="true">
  </div>
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
  <div id="assistants"></div>
  <br>
  <div id="thricecream"></div>
  <br>
  <div id="footer">Created by Edward Garcia <br><br></div>
`;

interface Upgrade {
  name: string;
  price: number;
  rate: number;
  quantity: number;
  description: string;
}

const upgradeOptions: Upgrade[] = [
  {
    name: "OvenUpgrade",
    price: 10,
    rate: 0.1,
    quantity: 0,
    description: '"WAZAAM!!" -Chowder',
  },
  {
    name: "Oven",
    price: 100,
    rate: 2,
    quantity: 0,
    description:
      '"I\'m just making burple nurples. What are you so worried about?" -Chowder',
  },
  {
    name: "Bakery",
    price: 1000,
    rate: 50,
    quantity: 0,
    description: '"They look so good, so not deadly poisonous" -Mung Daal',
  },
  {
    name: "Assistant",
    price: 2000,
    rate: 100,
    quantity: 0,
    description: '"Radda Radda?" -Shnitzel',
  },
  {
    name: "ThriceCream",
    price: 4000,
    rate: 200,
    quantity: 0,
    description: '"Thriiice creaaaaaam!" -Chowder',
  },
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
const assistantsElement = document.getElementById("assistants")!;
const thricecreamElement = document.getElementById("thricecream")!;

document.body.style.backgroundColor = "#DF9DF2";

document.body.appendChild(bakeButton);
bakeButton.innerText = "🥧 Bake!";
bakeButton.onclick = () => {
  if (!isGameStarted) {
    isGameStarted = true;
    document.getElementById("img1")!.removeAttribute("hidden");
    startUpdate();
  }
  updateCounter();
};

upgradeOptions.forEach((upgrade) => {
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
    upgrade.quantity += 1;
    displayNewPrice(upgrade.name);
    updateCounter();
    alert(upgrade.description);
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
  if (counter >= 2000) {
    button = document.getElementById("Assistant") as HTMLButtonElement;
    button.style.opacity = "1";
    button.disabled = false;
  }
  if (counter >= 4000) {
    button = document.getElementById("ThriceCream") as HTMLButtonElement;
    button.style.opacity = "1";
    button.disabled = false;
  }
}

/* Upgrade buttons will display new price and quantity after purchase inside the searched button
   from upgradeOptions array and unhide a specific image for each upgrade
   Switch statement used to be more clear and better effeciency than loop with if statements
*/
function displayNewPrice(buttonID: string) {
  const button: HTMLButtonElement = document.getElementById(
    buttonID,
  ) as HTMLButtonElement;
  button.innerText = buttonID + ": " +
    upgradeOptions.find((upgrade) => upgrade.name === buttonID)?.price +
    " nurples";

  switch (buttonID) {
    case "OvenUpgrade":
      upgradesElement.textContent = "Oven Upgrades: " +
        upgradeOptions.find((upgrade) => upgrade.name === buttonID)
          ?.quantity;
      document.getElementById("img2")!.removeAttribute("hidden");
      break;
    case "Oven":
      ovensElement.textContent = "Ovens: " +
        upgradeOptions.find((upgrade) => upgrade.name === buttonID)
          ?.quantity;
      document.getElementById("img3")!.removeAttribute("hidden");
      break;
    case "Bakery":
      bakeriesElement.textContent = "Bakeries: " +
        upgradeOptions.find((upgrade) => upgrade.name === buttonID)
          ?.quantity;
      document.getElementById("img4")!.removeAttribute("hidden");
      break;
    case "Assistant":
      assistantsElement.textContent = "Assistants: " +
        upgradeOptions.find((upgrade) => upgrade.name === buttonID)
          ?.quantity;
      document.getElementById("img5")!.removeAttribute("hidden");
      break;
    case "ThriceCream":
      thricecreamElement.textContent = "Thrice Creams: " +
        upgradeOptions.find((upgrade) => upgrade.name === buttonID)
          ?.quantity;
      document.getElementById("img6")!.removeAttribute("hidden");
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
