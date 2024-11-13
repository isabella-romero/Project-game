const chicken = document.getElementById('chicken');
const gameBoard = document.getElementById('game-board');
const cars = document.querySelectorAll('.car');


let chickenX = 120;
let chickenY = 360;
const chickenSpeed = 40; 


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


cars.forEach(car => {
    car.style.animation = 'moveCars 3s linear infinite';
});


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


function resetGame() {
    chickenX = 120;
    chickenY = 360;
    chicken.style.left = chickenX + 'px';
    chicken.style.bottom = chickenY + 'px';
}

