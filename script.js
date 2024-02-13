let boxes = document.querySelectorAll(".box");
let gameInfo = document.querySelector(".game-info");
let newGame = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

init();
function init() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];

  boxes.forEach((box, index) => {
    box.innerHTML = "";
    boxes[index].style.pointerEvents = "all";

    box.classList = `box box${index + 1}`;
  });

  gameInfo.innerText = `Current Player - ${currentPlayer}`;
  newGame.classList.remove("active");
}

const winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkGameOver() {
  let answer = "";

  winningPosition.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] == gameGrid[position[1]] &&
      gameGrid[position[1]] == gameGrid[position[2]]
    ) {
      if (gameGrid[position[0]] == "X") {
        answer = "X";
      } else {
        answer = "O";
      }

      // If we had a winner then it will stop the clicking
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  // if we had a winner
  if (answer !== "") {
    gameInfo.innerHTML = `Winner Player - ${answer}`;
    newGame.classList.add("active");
    return;
  }

  // if match is tie
  let fillCout = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      fillCout++;
    }
  });

  if (fillCout === 9) {
    gameInfo.innerHTML = "Game Tie!";
    newGame.classList.add("active");
  }
}

//  change player
function swapTurn() {
  if (currentPlayer == "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  //   UI update of current player
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    gameGrid[index] = currentPlayer;
    boxes[index].innerHTML = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    swapTurn();
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGame.addEventListener("click", init);
