//import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <h1>Purple Nurples!</h1>
  <br>
  <div id="counter">0 purple nurples</div>
  <br><br>
`;
let counter: number = 0;
const button = document.createElement("button");
document.body.appendChild(button);

const counterElement = document.getElementById("counter")!;

button.innerText = "🥧 Bake!";
button.onclick = () => {
  counter += 1;
  counterElement.textContent = counter + " purple nurples";
};
