const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('gameOver');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

let score = 0;
let gameOver = false;
let currentTarget = null;
let shrinkInterval = null;

function createTarget(){
    if (gameOver) return;
    const target = document.createElement('div');
    target.classList.add('target');
    
    let size = 80;
    const shrinkRate = Math.random() * 0.5 + 0.5;
    const intervalTime = 30;

    const maxX = gameArea.clientWidth - size;
    const maxY = gameArea.clientHeight - size;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
    target.style.width = `${size}px`;
    target.style.height = `${size}px`;

    gameArea.appendChild(target);
    currentTarget = target;

    shrinkInterval = setInterval(() => {
        size -= shrinkRate;
        if (size <= 0) {
            clearInterval(shrinkInterval);
            endGame();
        }
        else{
            target.style.width = `${size}px`;
            target.style.height = `${size}px`;
        }
    }, intervalTime);

    target.addEventListener('click', () => {
        clearInterval(shrinkInterval);
        score += 10;
        scoreDisplay.textContent = `Score: ${score}`;
        target.remove();
        currentTarget = null;
        setTimeout(createTarget, 500);
    }); 
}

function startGame() {
     if (!gameOver && currentTarget !== null) return;

    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    gameOver = false;
    gameOverDisplay.style.display = 'none';
    gameArea.innerHTML = '';
    createTarget();
}

function resetGame() {
    if (shrinkInterval) {
        clearInterval(shrinkInterval);
    }
    if (currentTarget) {
        currentTarget.remove();
    }

    score = 0;
    gameOver = false;
    scoreDisplay.textContent = `Score: ${score}`;
    gameOverDisplay.style.display = 'none';
    gameArea.innerHTML = "";
    currentTarget = null;
}

function endGame() {
    gameOver = true;
    gameOverDisplay.style.display = 'block';
    gameOverDisplay.textContent = `Game Over! Final Score: ${score}`;
    if (shrinkInterval) {
        clearInterval(shrinkInterval);
    }
    if (currentTarget) {
        currentTarget.remove();
    }
    currentTarget = null;
}

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);