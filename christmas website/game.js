const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player;
let gifts = [];
let score = 0;
let timeLeft = 30;
let gameInterval;

// Set up the game
function setup() {
  canvas.width = 800;
  canvas.height = 600;
  player = {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    image: new Image()
  };
  player.image.src = "images/player.png";
  player.image.onload = function() {
    startGame();
  }
  canvas.addEventListener('mousemove', (event) => {
    let newX = event.clientX - canvas.getBoundingClientRect().left - player.width / 2;
    let newY = event.clientY - canvas.getBoundingClientRect().top - player.height / 2;
    if(newX >= 0 && newX + player.width <= canvas.width) {
      player.x = newX;
    }
    if(newY >= 0 && newY + player.height <= canvas.height) {
      player.y = newY;
    }
  });
}

// Start the game loop
function startGame() {
  gameInterval = setInterval(gameLoop, 1000/60);
  setInterval(() => {
    timeLeft--;
    if (timeLeft === 0) {
      clearInterval(gameInterval);
      // Show game over message
      ctx.fillStyle = 'black';
      ctx.font = '30px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`Game Over! Your final score is ${score}`, canvas.width / 2, canvas.height / 2);
    }
  }, 1000);
}

// Main game loop
function gameLoop() {
  update();
  render();
}

// Update game state
let lastGiftTime = 0;
let giftInterval = 250; // delay between gift spawning in ms

function update() {
  let currentTime = Date.now();
  if (currentTime - lastGiftTime > giftInterval) {
    generateGift();
    lastGiftTime = currentTime;
  }
  moveGifts();
  checkCollision();
}

// Render the game
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(player.image, player.x, player.y, player.width, player.height);

  gifts.forEach((gift) => {
    ctx.drawImage(gift.image, gift.x, gift.y, gift.width, gift.height);
  });

  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
  ctx.fillText(`Time Left: ${timeLeft}`, 10, 60);
}

// Generate a new falling gift
function generateGift() {
  let gift = {
    x: Math.random() * (canvas.width - 50),
    y: -50,
    width: 50,
    height: 50,
    image: new Image()
  }
  gift.image.src = "images/gift.png";
  gift.image.onload = function() {
    gifts.push(gift);
  }
}

// Move the falling gifts
function moveGifts() {
  gifts.forEach((gift) => {
    gift.y += 5;
  });
}

// Check for collision between player and gifts
function checkCollision() {
  gifts.forEach((gift, index) => {
    if (gift.x < player.x + player.width &&
        gift.x + gift.width > player.x &&
        gift.y < player.y + player.height &&
        gift.y + gift.height > player.y) {
      // collision detected
      gifts.splice(index, 1);
      score++;
    }
  });
}
