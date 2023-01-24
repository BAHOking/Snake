let gameField = document.querySelector(".game__field");
let points = document.querySelectorAll(".points span");
let pointsResult = document.querySelector(".points__result span");

let arrLeft = [
  0,
  11,
  22,
  33,
  44,
  55,
  66,
  77,
  88,
  99,
  110,
  121,
  132,
  143,
  154,
  165,
  176,
  187,
  198,
  209,
  220,
];
let arrRight = [
  10,
  21,
  32,
  43,
  54,
  65,
  76,
  87,
  98,
  109,
  120,
  131,
  142,
  153,
  164,
  175,
  186,
  197,
  208,
  219,
  230,
];
let arrLeftRightAll = arrRight.concat(arrLeft);
let arrSnake = [193, 194, 195];
let arrClasse = [];
let navStart = "left";
let point = 1;
let savePoint = 0;
let pointString = "";
let arrPoints = [];
let gameStartGo = false;

let navTRBL;
let gameRestart;
let redCellNumber;
let pressedCodeKey;
let cells;

let num = 0;
let signPlusMinus;

creatingAnArrayOfClasses();
function creatingAnArrayOfClasses() {
  for (let i = 0; i < 242; i++) {
    arrClasse.push(i);
  }
  cellCreation();
}

function cellCreation() {
  for (let i = 0; i < arrClasse.length; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.classList.add("game_cell");
    cell.classList.add(`${i}`);

    if (i <= 10) {
      cell.classList.add("top");
      cell.classList.remove("game_cell");
    }

    if (i >= 231) {
      cell.classList.add("bottom");
      cell.classList.remove("game_cell");
    }

    for (let elem of arrLeft) {
      if (elem === i) {
        cell.classList.add("left");
        cell.classList.remove("game_cell");
      }
    }

    for (let elem of arrRight) {
      if (elem === i) {
        cell.classList.add("right");
        cell.classList.remove("game_cell");
      }
    }

    if (i === 0 || i === 10 || i === 231 || i === 241) {
      cell.classList.add("corners");
      cell.classList.remove("game_cell");
    }
    gameField.appendChild(cell);
  }
  cells = document.querySelectorAll(".cell");
  snakeColorAdd();
  keyCode();
  redCell();
}

function snakeColorAdd() {
  for (let i = 0; i < arrSnake.length; i++) {
    cells[arrSnake[i]].classList.add("snake");
  }
  addPoint();
  snakeIncrease();
}

function snakeColorRemove() {
  cells[arrSnake.pop()].classList.remove("snake");
}

function redCell() {
  let gameCells = document.querySelectorAll(".game_cell");
  redCellNumber = randomNumber();
  if (gameCells[redCellNumber].classList.contains("snake")) {
    redCell();
  } else {
    gameCells[redCellNumber].classList.add("red_Square");
  }
}

function randomNumber() {
  min = Math.ceil(0);
  max = Math.floor(180);
  return Math.floor(Math.random() * (max - min)) + min;
}

function keyCode() {
  document.addEventListener("keydown", startGame);
  function startGame(event) {
    pressedCodeKey = event.keyCode;
    if (pressedCodeKey === 13 && gameStartGo === false) {
      navTRBL = setInterval(navTopRightBottomLeft, 300);
    }
  }
}

function navTopRightBottomLeft() {
  if (pressedCodeKey === 87 && navStart !== "bottom") {
    navStart = "top";
    arrSnake.unshift(arrSnake[0] - 11);
    num = 11;
    signPlusMinus = "-";
  } else if (pressedCodeKey === 83 && navStart !== "top") {
    navStart = "bottom";
    arrSnake.unshift(arrSnake[0] + 11);
    num = 11;
    signPlusMinus = "+";
  } else if (pressedCodeKey === 68 && navStart !== "left") {
    navStart = "right";
    arrSnake.unshift(arrSnake[0] + 1);
    num = 1;
    signPlusMinus = "+";
  } else if (pressedCodeKey === 65 && navStart !== "right") {
    navStart = "left";
    arrSnake.unshift(arrSnake[0] - 1);
    num = 1;
    signPlusMinus = "-";
  } else if (pressedCodeKey === 13 && gameStartGo === false) {
    arrSnake.unshift(arrSnake[0] - 1);
    num = 1;
    signPlusMinus = "-";
    gameStartGo = true;
  } else {
    if (signPlusMinus === "-") {
      arrSnake.unshift(arrSnake[0] - num);
    } else {
      arrSnake.unshift(arrSnake[0] + num);
    }
  }
  snakeColorAdd();
  snakeColorRemove();
  endGame();
}

function addPoint() {
  if (cells[arrSnake[0]].classList.contains("red_Square")) {
    pointString = String(point);
    arrPoints = pointString.split("");
    if (point <= 9) {
      points[6].style.opacity = "1";
      points[6].innerHTML = arrPoints[0];
    } else if (point >= 10 && point <= 99) {
      points[5].style.opacity = "1";
      points[5].innerHTML = arrPoints[0];
      points[6].innerHTML = arrPoints[1];
    } else if (point >= 100 && point <= 999) {
      points[4].style.opacity = "1";
      points[4].innerHTML = arrPoints[0];
      points[5].innerHTML = arrPoints[1];
      points[6].innerHTML = arrPoints[2];
    }
    point++;
  }
}

function SavePointsResult() {
  if (savePoint < point) {
    pointsResult.innerHTML = `${point - 1}`;
    savePoint = point;
  }
}

function snakeIncrease() {
  if (cells[arrSnake[0]].classList.contains("red_Square")) {
    cells[arrSnake[0]].classList.remove("red_Square");
    arrSnake.push(redCellNumber);
    redCell();
  }
}

function endGame() {
  if (arrSnake[0] <= 10 || arrSnake[0] >= 231) {
    clearInterval(navTRBL);
    gameRestart = confirm(`You scored ${point - 1} point(s) 
    Restart game?`);
    restartGame(cells);
  }

  for (let elem of arrLeftRightAll) {
    if (elem === arrSnake[0]) {
      clearInterval(navTRBL);
      gameRestart = confirm(`You scored ${point - 1} point(s). Restart game?`);
      restartGame(cells);
    }
  }

  for (let i = 1; i < arrSnake.length; i++) {
    if (arrSnake[0] === arrSnake[i]) {
      clearInterval(navTRBL);
      gameRestart = confirm(`You scored ${point - 1} point(s) 
      Restart game?`);
      restartGame(cells);
    }
  }
}

function restartGame() {
  SavePointsResult();
  if (gameRestart) {
    for (let i = 0; i < arrSnake.length; i++) {
      cells[arrSnake[i]].classList.remove("snake");
    }

    arrSnake = [193, 194, 195];
    navStart = "left";
    point = 1;
    pointString = "";
    arrPoints = [];
    gameStartGo = false;

    for (let elem of points) {
      elem.innerHTML = 0;
      elem.style.opacity = "0.5";
    }
    snakeColorAdd();
  }
}
