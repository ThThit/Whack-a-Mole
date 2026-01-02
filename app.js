const bonk = document.getElementById('soundBonk');
const gameBoard = document.querySelector('.game-board');
const moles = document.querySelectorAll('.mole');

// random mole

function randomMole() {
    moles.forEach(mole => {
        mole.textContent = '';
    });

    // pick random index 
    const ranIndx = Math.floor(Math.random() * moles.length);

    moles[ranIndx].textContent = "Mole";
}

setInterval(randomMole, 800);


// hammer sfx when clicked
gameBoard.addEventListener('click', () => {
    bonk.pause();          // stop current playback
    bonk.currentTime = 0;  // rewind to start
    bonk.volume = 1.0;

    bonk.play().catch(err => {
        console.log("Audio play failed:", err);
    });
});