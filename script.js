let canvas = document.getElementById("game-board");
let ctx = canvas.getContext("2d");
let cellSize = 20;
let direction;
let snake;
let food;
let score;

function startGame() {
  direction = "right";
  snake = [{ x: 8, y: 8 }];
  food = getRandomCell();
  score = 0;

  if (typeof gameLoop != "undefined") clearInterval(gameLoop);
  gameLoop = setInterval(updateGame, 100);
}

function updateGame() {
  // Update snake position
  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === "right") head.x++;
  else if (direction === "left") head.x--;
  else if (direction === "up") head.y--;
  else if (direction === "down") head.y++;

  snake.unshift(head);

  // Check collision with food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = getRandomCell();
  } else {
    snake.pop();
  }

  // Check collision with walls or self
  if (head.x < 0 || head.y < 0 || head.x >= canvas.width / cellSize || head.y >= canvas.height / cellSize || checkCollision(head)) {
    clearInterval(gameLoop);
    alert("Game Over!");
    return;
  }

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  snake.forEach(drawCell.bind(null, "snake"));

  // Draw food
  drawCell("food", food);

  // Update score
  document.getElementById("scoreboard").innerHTML = "Score: " + score;
}

function drawCell(className, cell) {
  ctx.fillStyle = className === "snake" ? "#000" : "#f00";
  ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
}

function getRandomCell() {
    let cell;
  do {
    cell = {
      x: Math.floor(Math.random() * (canvas.width / cellSize)),
      y: Math.floor(Math.random() * (canvas.height / cellSize))
    };
  } while (checkCollision(cell));
  return cell;
}

function checkCollision(cell) {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === cell.x && snake[i].y === cell.y) return true;
  }
  return false;
}

// Event listeners
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp" && direction !== "down") direction = "up";
  else if (event.key === "ArrowDown" && direction !== "up") direction = "down";
  else if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
  else if (event.key === "ArrowRight" && direction !== "left") direction = "right";
});

// Start the game
startGame();