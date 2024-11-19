const chicken = document.getElementById('chicken');
const gameBoard = document.getElementById('game-board');
const cars = document.querySelectorAll('.car');
const scoreElement = document.getElementById('score');

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// Game variables
let chickenX = 130;
let chickenY = 0;
const chickenSpeed = 40;
let score = 0;
let gameInterval;
let isGameOver = false; // New variable to track game state
// Chicken movement
document.addEventListener('keydown', (event) => {
    if (isGameOver) return; // Prevent movement if game is over

    switch (event.key) {
        case 'ArrowUp':
            if (chickenY > 0) chickenY -= chickenSpeed;
            break;
        case 'ArrowDown':
            if (chickenY < 360) chickenY += chickenSpeed;
            break;
        case 'ArrowLeft':
            if (chickenX > 0) chickenX -= chickenSpeed;
            break;
        case 'ArrowRight':
            if (chickenX < 260) chickenX += chickenSpeed;
            break;
    }
    chicken.style.left = chickenX + 'px';
    chicken.style.bottom = chickenY + 'px';
    checkCollision();
});
// Move cars
function moveCars() {
    cars.forEach(car => {
        let leftPos = parseInt(window.getComputedStyle(car).left);
        if (leftPos >= 480) {
            car.style.left = '-40px'; // Reset car position
        } else {
            car.style.left = (leftPos + 5) + 'px'; // Move car to the right
        }
    });
}
// Check for collisions
function checkCollision() {
    cars.forEach(car => {
        const carRect = car.getBoundingClientRect();
        const chickenRect = chicken.getBoundingClientRect();

        if (
            chickenRect.left < carRect.right &&
            chickenRect.right > carRect.left &&
            chickenRect.top < carRect.bottom &&
            chickenRect.bottom > carRect.top
        ) {
            alert('Game Over! You were hit by a car.');
            resetGame();
        }
    });
}
// Start the game
function startGame() {
    isGameOver = false; // Reset game state
    cars.forEach(car => {
        car.style.animation = 'moveCars 3s linear infinite';
    });

    gameInterval = setInterval(() => {
        if (!isGameOver) {
            updateGame();
            moveCars();
        }
    }, 1000 / 60); // 60 FPS
}
// score and game logic
function updateGame() {
    if (chickenY <= 0) {
        score++;
        scoreElement.textContent = score;
        resetChicken(); // Reset chicken position after scoring
    }

    moveCars();
    checkCollision(); // Ensure collision check is called after moving cars
}

// Reset the game
function resetGame() {
    isGameOver = false; // Set game state to over
    clearInterval(gameInterval); // Stop the car movement
    chickenX = 120;
    chickenY = 360;
    score = 0;
    scoreElement.textContent = score;
    cars.forEach(car => {
        car.style.animation = 'none';
        car.style.left = '-40px';
    });
    
    setTimeout(() => {
        startGame(); // Restart the game after a delay
        resetChicken(); //restart chicken position
    }, 1000); // Delay for 1 second
}

// Reset chicken position
function resetChicken() {
    chickenX = 120;
    chickenY = 360;
    chicken.style.left = chickenX + 'px';
    chicken.style.bottom = chickenY + 'px';
}

// Define the moveCars animation 
document.styleSheets[0].insertRule(`
@keyframes moveCars {
    0% { left: -40px; }
    100% { left: 480px; }
}`, 0);

startGame();
