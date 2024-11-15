const chicken = document.getElementById('chicken');
const gameBoard = document.getElementById('game-board');
const cars = document.querySelectorAll('.car');
const scoreElement = document.getElementById('score');

// Game variables
let chickenX = 120;
let chickenY = 360;
const chickenSpeed = 40;
let score = 0;
let gameInterval;

// Chicken movement
document.addEventListener('keydown', (event) => {
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
            // Reset car to the beginning when it moves off screen
            car.style.left = '-40px';
        } else {
            car.style.left = (leftPos + 2) + 'px';
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

// Update score and game logic
function updateGame() {
    // Check if the chicken has reached the top of the game board
    if (chickenY <= 0) {
        score++; // Increment the score
        scoreElement.textContent = score; // Update the score display
        resetChicken(); // Reset chicken position
    }

    // Always move cars on every game update
    moveCars();
}

// Reset chicken position
function resetChicken() {
    chickenX = 120;
    chickenY = 360; // Reset chicken to the starting position
    chicken.style.left = chickenX + 'px';
    chicken.style.bottom = chickenY + 'px';
}
// Reset the game
function resetGame() {
    chickenX = 120;
    chickenY = 360;
    score = 0; // Reset the score when the game restarts
    scoreElement.textContent = score; // Update the score display
    cars.forEach(car => {
        car.style.animation = 'none'; // Stop cars
        car.style.left = '-40px'; // Reset car position
    });
    alert('Game Over! Try again.');
    startGame(); // Restart the game
}

// Start the game
function startGame() {
    // Reset car position and animation
    cars.forEach(car => {
        car.style.animation = 'moveCars 3s linear infinite';
    });

    gameInterval = setInterval(() => {
        updateGame();
        moveCars();
    }, 1000 / 60); // 60 FPS
}

// Define the moveCars animation (this should be included in your CSS)
document.styleSheets[0].insertRule(`
@keyframes moveCars {
    0% { left: -40px; }
    100% { left: 480px; }
}`, 0);

startGame();
setInterval(checkCollision, 50);
