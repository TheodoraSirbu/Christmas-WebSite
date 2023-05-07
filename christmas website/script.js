const canvas = document.getElementById("snowflakes");
const ctx = canvas.getContext("2d");


const snowflakes = [];

function createSnowflake() {
  // Create a snowflake object with random position, size, and speed
  const snowflake = {
    x: Math.random() * canvas.width, // x-position
    y: Math.random() * canvas.height, // y-position
    size: Math.random() * 3 + 1, // size
    speed: Math.random() * 2 + 1 // speed
  };

  // Add the snowflake to the array
  snowflakes.push(snowflake);
}

function drawSnowflake(snowflake) {
  // Set the fill style to white
  ctx.fillStyle = "white";

  // Draw a circle with the snowflake's position, size, and speed
  ctx.beginPath();
  ctx.arc(snowflake.x, snowflake.y, snowflake.size, 0, 2 * Math.PI);
  ctx.fill();
}

function updateSnowflakes() {
  // Loop through the snowflakes array
  for (let i = 0; i < snowflakes.length; i++) {
    const snowflake = snowflakes[i];

    // Update the snowflake's position
    snowflake.y += snowflake.speed;

    // If the snowflake has moved off the bottom of the screen, reset its position
    if (snowflake.y > canvas.height) {
      snowflake.y = 0;
    }
  }
}

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw and update the snowflakes
  snowflakes.forEach(drawSnowflake);
  updateSnowflakes();

  // Request another animation frame
  requestAnimationFrame(draw);
}

function resizeCanvas() {
  // Set the canvas dimensions to match the window
  canvas.width = document.body.scrollWidth;
  canvas.height = document.body.scrollHeight;

  // Loop through the snowflakes array
  for (let i = 0; i < snowflakes.length; i++) {
    const snowflake = snowflakes[i];

    // Update the snowflake's position
    snowflake.x = Math.random() * canvas.width;
    snowflake.y = Math.random() * canvas.height;
  }
}

// Create and draw the snowflakes
for (let i = 0; i < 100; i++) {
  createSnowflake();
}
resizeCanvas();
draw();


// Listen for the resize event and resize the canvas and snowflake positions
window.addEventListener("resize", resizeCanvas);
window.addEventListener("DOMContentLoaded", resizeCanvas);