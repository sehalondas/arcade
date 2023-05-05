const board = document.getElementById("board");
let snakeBody = [
  { x: 13, y: 13 }
];
let startTime = 0;
let gameSpeed = 4;
let inputDirection = {
  x: 0,
  y: 0
};
let lastInputDirection = {
  x: 0,
  y: 0
};
let gameOver = false;
let newChunks = 0;
let growSize = 1;
let food = foodLocation();
let score;
const displayScore = document.getElementById("score-board");
const difficultyCounter = document.getElementById("difficulty");
const difficultyDecreaser = document.getElementById("lower-difficulty");
const difficultyIncreaser = document.getElementById("raise-difficulty");
difficultyCounter.innerHTML = `Difficulty: ${gameSpeed}`;

function raiseDifficulty() {
  gameSpeed++;
  difficultyCounter.innerHTML = `Difficulty: ${gameSpeed}`;

}

function lowerDifficulty() {
  if (gameSpeed > 1) {
    gameSpeed--;
  }
  difficultyCounter.innerHTML = `Difficulty: ${gameSpeed}`;

}

function foodLocation() {
  let newFood;
  while (newFood == null || snakeArea(newFood)) {
    newFood = randomGridPosition();
  }
  return newFood;
}

function updateVisualsFood() {
  if (snakeArea(food)) {
    growSnake(growSize);
    food = foodLocation();
  }
}

function makeFood(board) {
  const createFood = document.createElement("div");
  createFood.style.gridRowStart = food.y;
  createFood.style.gridColumnStart = food.x;
  createFood.classList.add("food");
  board.appendChild(createFood);
}

function createSnake(board) {
  snakeBody.forEach(chunk => {
    const makeSnake = document.createElement("div");
    makeSnake.style.gridRowStart = chunk.y;
    makeSnake.style.gridColumnStart = chunk.x;
    makeSnake.classList.add("snake");
    board.appendChild(makeSnake);
  })
}

function updateVisualsSnake() {
  addChunks();
  inputDirection = getIputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

function drawSnake() {
  board.innerHTML = "";
  createSnake(board);
  updateVisualsSnake();
}

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: -1 }
      break
    case 'ArrowDown':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: 1 }
      break
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: -1, y: 0 }
      break
    case 'ArrowRight':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: 1, y: 0 }
      break
  }
})

function getIputDirection() {
  lastInputDirection = inputDirection;
  return inputDirection;
}

function checkGameOver() {
  if (outsideGrid(getSnakeHead()) == true || snakeCollision() == true) {
    gameOver = true;
  }
}

function getSnakeHead() {
  return snakeBody[0];
}

function outsideGrid(position) {
  if (position.x < 1 || position.x > 25 || position.y < 1 || position.y > 25) {
    return true;
  }
}

function snakeArea(position, { ignoreHead = false } = {}) {
  return snakeBody.some((chunk, index) => {
    if (ignoreHead && index === 0) return false
    return equalPositions(chunk, position);
  })
}

function snakeCollision() {
  return snakeArea(snakeBody[0], { ignoreHead: true });
}

function addChunks() {
  for (let i = 0; i < newChunks; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
  }
  newChunks = 0;
}

function growSnake(length) {
  newChunks += length;
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function randomGridPosition() {
  let min = 2;
  let max = 24;
  return {
    x: Math.floor(Math.random() * (max - min) + min),
    y: Math.floor(Math.random() * (max - min) + min)
  }
}

function getScore() {
  score = snakeBody.length;
  displayScore.innerHTML = `Current Score:${score}`;
}

function gameLoop(currentTime) {
  if (gameOver) {
    displayScore.innerHTML = "Game Over:("
    return;
  }
  window.requestAnimationFrame(gameLoop);
  const secondsSinceLastUpdate = (currentTime - startTime) / 1000;
  if (secondsSinceLastUpdate < 1 / gameSpeed) return
  startTime = currentTime;
  totalUpdate();
  totalDraw();
}

function totalDraw() {
  board.innerHTML = "";
  drawSnake();
  makeFood(board);
}

function totalUpdate() {
  getScore();
  updateVisualsSnake();
  makeFood(board);
  updateVisualsFood();
  checkGameOver();
}

function startGame() {
  return window.requestAnimationFrame(gameLoop);
}

function restartGame() {
  snakeBody = [
    { x: 13, y: 13 }
  ];
  startTime = 0;
  gameSpeed = 4;
  difficultyCounter.innerHTML = `Difficulty: ${gameSpeed}`;
  inputDirection = {
    x: 0,
    y: 0
  };
  lastInputDirection = {
    x: 0,
    y: 0
  };
  gameOver = false;
  newChunks = 0;
  growSize = 1;
  food = foodLocation();
  score = 0;
  return window.requestAnimationFrame(gameLoop);
}

document.querySelector('#start-game').addEventListener("click", startGame);
document.querySelector('#restart-game').addEventListener("click", restartGame);
document.querySelector('#lower-difficulty').addEventListener("click", lowerDifficulty);
document.querySelector('#raise-difficulty').addEventListener("click", raiseDifficulty);