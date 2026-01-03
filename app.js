const bonk = document.getElementById('soundBonk');
const gameBoard = document.querySelector('.game-board');
const moleList = document.querySelectorAll('.mole');
const btnGameReset = document.getElementById('gameReset');
const btnGameStart = document.getElementById('gameStart');
const scoreTxt = document.querySelector('.score');
const missesTxt = document.querySelector('.misses');

let gameInterval;
let gameRunning = false;

let points = 0;
let misses = 0; 

function showAllMoles() {
    moleList.forEach(mole => mole.classList.add('up'));
}

showAllMoles();

// hit mole
moleList.forEach(mole => {
    mole.addEventListener('click', (e) => {
        if (!gameRunning) return;

        e.stopPropagation(); // prevent event bubbling

        if (mole.classList.contains('up')) {
            points++;
            updatePoints();
        } else {
            misses++;
            updatePoints();
        }

        mole.classList.remove('up');

        bonk.pause();
        bonk.currentTime = 0;
        bonk.play().catch(() => {});
    })
});

// random mole
function randomMole() {
    moleList.forEach(mole => {
        // hid moles
        mole.classList.remove('up');
    });

    // pick random index 
    const ranIndx = Math.floor(Math.random() * moleList.length);

    moleList[ranIndx].classList.add('up');
}

btnGameStart.addEventListener('click', () => {
    gameRunning = true;
    updatePoints();

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
    points = 0;
    misses = 0;
    updatePoints();
    gameBoard.style.cursor = "default";
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

// update points 
function updatePoints() {
    scoreTxt.textContent = `Points: ${points}`;
    missesTxt.textContent = `Misses: ${misses}`;
}