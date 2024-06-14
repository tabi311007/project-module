
let stack = [];
let blockSize = 50;
let currentBlock;
let blockSpeed = 2;
let moveSpeed = 5;
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(400, 600);
  let baseWidth = 300;
  let x = width / 2 - baseWidth / 2;
  let y = height - blockSize;
  stack.push(new Block(x, y, baseWidth));
  spawnBlock();
}

function draw() {
  background(220);

  if (!gameOver) {
    currentBlock.update();
    currentBlock.show();
    for (let block of stack) {
      block.show();
    }
    checkCollision();
  } else {
    textSize(32);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2 - 50);
    textSize(24);
    fill(0);
    text("Score: " + score, width / 2, height / 2);
  }
"Score: " + score;
}

function keyPressed() {
  if (keyCode === ENTER && gameOver) {
    resetGame();
    return;
  }

  if (!gameOver) {
    if (keyCode === LEFT_ARROW) {
      currentBlock.move(-moveSpeed);
    } else if (keyCode === RIGHT_ARROW) {
      currentBlock.move(moveSpeed);
    } else if (key === ' ') {
      stack.push(currentBlock);
      let prevBlock = stack[stack.length - 2];
      let dx = abs(currentBlock.x - prevBlock.x);
      if (dx < currentBlock.w) {
        score++;
        currentBlock.w -= dx;
        spawnBlock();
      } else {
        gameOver = true;
        document.getElementById("gameOver").innerText = "Game Over";
      }
    }
  }
}

function resetGame() {
  stack = [];
  score = 0;
  gameOver = false;
  let baseWidth = 300;
  let x = width / 2 - baseWidth / 2;
  let y = height - blockSize;
  stack.push(new Block(x, y, baseWidth));
  spawnBlock();
  document.getElementById("gameOver").innerText = '';
}

function spawnBlock() {
  let width = stack[stack.length - 1].w;
  let x = width / 2 - width / 2;
  let y = 0;
  currentBlock = new Block(x, y, width);
}

function checkCollision() {
  if (currentBlock.y + blockSize >= height - blockSize * stack.length) {
    currentBlock.y = height - blockSize * stack.length - blockSize;
    stack.push(currentBlock);
    let prevBlock = stack[stack.length - 2];
    let dx = abs(currentBlock.x - prevBlock.x);
    if (dx < currentBlock.w) {
      score++;
      currentBlock.w -= dx;
      spawnBlock();
    } else {
      gameOver = true;
      document.getElementById('gameOver').innerText = 'Game Over';
    }
  }
}

class Block {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    this.y += blockSpeed;
  }

  move(dx) {
    this.x += dx;
    this.x = constrain(this.x, 0, width - this.w);
  }

  show() {
    fill(this.color);
    rect(this.x, this.y, this.w, blockSize);
  }
}