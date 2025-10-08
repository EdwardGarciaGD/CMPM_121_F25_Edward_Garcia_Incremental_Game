//import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <h1>Purple Nurples!</h1>
  <p>Score: <span id="counter">0</span></p>
`;

let counter = 0;
const button = document.createElement("button");
document.body.appendChild(button);

const counterElement = document.getElementById("counter")!;

button.innerText = "Bake!";
button.onclick = () => {
  counter += 1;
  counterElement.innerText = String(counter);
};
