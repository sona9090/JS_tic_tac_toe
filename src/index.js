import "./styles.css";

let nine = Array.from({ length: 9 });
// generating the cells
let content = nine
  .map((item, key) => {
    return `<div class="cell" data-num=${key + 1}></div>`;
  })
  .join("");

let field = document.getElementById("tic-tac-toe");
field.innerHTML = content;

let clicks_counter = 0;
let cellsClassList = {};

let winnerElement = document.getElementById("winner");
const hasAllElems = (arr1, arr2) => arr1.every((elem) => arr2.includes(elem));

document.querySelectorAll(".cell").forEach((item) => {
  item.addEventListener("click", () => {
    clicks_counter++;
    let isX = clicks_counter % 2 !== 0;
    let signClass = isX ? "x-class" : "o-class";

    item.classList.add(signClass);
    cellsClassList[item.getAttribute("data-num")] = signClass;

    let playerCells = Object.keys(cellsClassList).filter(
      (key) => cellsClassList[key] === signClass
    );

    // console.log(playerCells);

    let winningCombinations = [
      // horizontals
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
      // verticals
      ["1", "4", "7"],
      ["2", "5", "8"],
      ["3", "6", "9"],
      // diagonals
      ["3", "5", "7"],
      ["1", "5", "9"]
    ];

    // returns [true  - if there is a winning combination,
    //   and that combination key (counting from 1)]
    let win = winningCombinations
      .map((item, key) => {
        if (hasAllElems(item, playerCells)) {
          return [hasAllElems(item, playerCells), key + 1];
        }
      })
      .filter((item) => item !== undefined);

    let winnerName = signClass.replaceAll("-class", "").toUpperCase();

    // Someone won!
    if (win.length === 1) {
      // adds class - win-x/o-{winning_combination_key} -
      // to define the strikethrough line color and position in CSS
      field.classList.add(`win-${winnerName}-${win[0][1]}`);

      setTimeout(() => {
        winnerElement.classList.add("active");
        winnerElement.innerHTML = `Player ${winnerName} won! <button id="new">New game</button>`;
        document
          .getElementById("new")
          .addEventListener("click", () => window.location.reload());
      }, 1000);
    } else if (
      document.querySelectorAll(".cell[class*='-class']").length === 9
    ) {
      winnerElement.classList.add("active");
      winnerElement.innerHTML = `Draw! <button id="new">New game</button>`;
      document
        .getElementById("new")
        .addEventListener("click", () => window.location.reload());
    }
  });
});
