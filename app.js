const bonk = document.getElementById('soundBonk');
const gameBoard = document.querySelector('.game-board');
const moles = document.querySelectorAll('.mole');
const btnGameReset = document.getElementById('gameReset');
const btnGameStart = document.getElementById('gameStart');

let gameInterval;
let gameRunning = false;

function showAllMoles() {
    moles.forEach(mole => mole.classList.add('up'));
}

showAllMoles();

// random mole
function randomMole() {
    moles.forEach(mole => {
        // hid moles
        mole.classList.remove('up');
    });

    // pick random index 
    const ranIndx = Math.floor(Math.random() * moles.length);

    moles[ranIndx].classList.add('up');
}

btnGameStart.addEventListener('click', () => {
    gameRunning = true;

    // prevent multival input
    clearInterval(gameInterval);
    gameBoard.style.cursor = "url('./Img/hammer.png'), auto";

    // mole apper every 600 milisecond
    setTimeout(() => {
        gameInterval = setInterval(randomMole, 600);
    });
});

btnGameReset.addEventListener('click', () => {
    clearInterval(gameInterval);
    gameRunning = false;
    document.body.style.cursor = "default";
    showAllMoles();
})


// hammer sfx when clicked
gameBoard.addEventListener('click', () => {
    if (!gameRunning) return;

    bonk.pause();          // stop current playback
    bonk.currentTime = 0;  // rewind to start
    bonk.volume = 1.0;

    bonk.play().catch(err => {
        console.log("Audio play failed:", err);
    });
});