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
let chickenY = 360;
const chickenSpeed = 40;
let score = 0;
let gameInterval;
let isGameOver = false; // New variable to track game state
let hasScored = false;

// Chicken movement
document.addEventListener('keydown', (event) => {
    if (isGameOver) return; // Prevent movement if game is over

    switch (event.key) {
        case 'ArrowUp':
            if (chickenY > 0) {
                chickenY -= chickenSpeed;
                hasScored = false;
            }
            break;
        case 'ArrowDown':
            if (chickenY < 360) {
                chickenY += chickenSpeed;
                hasScored = false;
            }
            break;
        case 'ArrowLeft':
            if (chickenX > 0) chickenX -= chickenSpeed; // Allow movement left
            break;
        case 'ArrowRight':
            if (chickenX < 260) chickenX += chickenSpeed; // Allow movement right
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
            alert('💥Game Over! You were hit by a car.💥');
            resetGame();
        }
    });
}
// Start the game
function startGame() {
    isGameOver = false; // Reset game state
    cars.forEach(car => {
        car.style.animation = 'moveCars 3s linear infinite'; // Start car animation
        car.style.left = '-40px'; // Reset car position
    });

    gameInterval = setInterval(() => {
        if (!isGameOver) {
            updateGame();
        }
    }, 1000 / 60); // 60 FPS
}
function updateGame() {
    if (!isGameOver) {
    if (chickenY <= 0 && !hasScored) {
        score++;
        scoreElement.textContent = score;
        hasScored = true; // Reset chicken position after scoring
        chickenY = 360;
        chicken.style.bottom = chickenY + 'px';
    }
}   
    moveCars();
    checkCollision(); // Ensure collision check is called after moving cars
}

function resetGame() {
    isGameOver = true; // Set game state to over
    clearInterval(gameInterval); // Stop the car movement
    chickenX = 130;
    chickenY = 360;
    score = 0; //reset score
    scoreElement.textContent = score;
    chicken.style.left = chickenX + 'px';
    chicken.style.bottom = chickenY + 'px';
    cars.forEach(car => {
        car.style.animation = 'none'; // Stop cars
        car.style.left = '-40px'; // Reset car position
    });
    // Update chicken's position on the screen
    chicken.style.left = chickenX + 'px';
    chicken.style.bottom = chickenY + 'px';
    setTimeout(() => {
        startGame(); // Restart the game after a delay
    }, 1000); // Delay for 1 second
}

// Define the moveCars animation 
document.styleSheets[0].insertRule(`
@keyframes moveCars {
    0% { left: -40px; }
    100% { left: 480px; }
}`, 0);

startGame();

