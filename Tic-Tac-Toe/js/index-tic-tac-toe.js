function switchToComputerMode() {
    window.location.href = "tic-tac-toe-game-onep.html";
}

function switchToTwoPlayerMode() {
    window.location.href = "tic-tac-toe-game-twop.html";
}

document.getElementById('onep').onclick = switchToComputerMode;
document.getElementById('twop').onclick = switchToTwoPlayerMode;