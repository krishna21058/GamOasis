const cells = document.querySelectorAll('.cell');
let currentPlayer = 'O';
let gameOver = false;
let res = document.getElementById("result");
const winningCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let bg = document.getElementById("wrapper");
let restart = document.getElementById('restart');
let quit = document.getElementById('quit');

function restartGame() {
    currentPlayer = 'O';
    gameOver = false;

    cells.forEach(function (cell) {
        cell.textContent = '';
        cell.style.color = '';
        cell.classList.remove('strikethrough');
    });

    res.innerText = '';
    bg.style.background = "#636fab";
}

function quitGame() {
    restartGame();
    window.location.href = "tic-tac-toe-index.html";
}


cells.forEach(function (cell) {
    restart.onclick = () => restartGame();
    quit.onclick = () => quitGame();
    cell.onclick = handleCellClick;
});




function checkWin(player) {
    let winningCombination = null;

    for (let i = 0; i < winningCases.length; i++) {
        const combo = winningCases[i];
        let won = true;

        for (let j = 0; j < combo.length; j++) {
            const index = combo[j];
            if (cells[index].textContent !== player) {
                won = false;
                break;
            }
        }

        if (won) {
            winningCombination = combo;
            winningCombination.forEach(function (index) {
                cells[index].classList.add("strikethrough");
            });
            break;
        }
    }
    return winningCombination;
}

function checkDraw() {
    let isBoardFull = true;
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === '') {
            isBoardFull = false;
            break;
        }
    }
    return isBoardFull;
}



function computerMove() {
    if (gameOver) return;

    let emptyCells = Array.from(cells).filter(cell => cell.textContent === '');
    if (emptyCells.length === 0) return;
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = currentPlayer;
    randomCell.style.color = currentPlayer === 'X' ? 'red' : 'blue';


    bg.style.background = "#636fab";

    if (checkWin(currentPlayer)) {
        gameOver = true;
        res.innerText = 'Player ' + currentPlayer + ' wins!';
        bg.style.background = " #ab6563";

        return;
    }

    if (checkDraw()) {
        gameOver = true;
        res.innerText = 'It\'s a draw!';
        bg.style.background = "#9163ab";
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}


function handleCellClick() {

    if (gameOver) return;

    if (this.textContent !== '') return;

    bg.style.background = " #ab6563";

    this.textContent = currentPlayer;
    this.style.color = currentPlayer === 'X' ? 'red' : 'blue';

    if (checkWin(currentPlayer)) {
        gameOver = true;
        res.innerText = 'Player ' + currentPlayer + ' wins!';
        bg.style.background = " #636fab";
        return;
    }

    if (checkDraw()) {
        gameOver = true;
        res.innerText = 'It\'s a draw!';
        bg.style.background = " #9163ab";
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    setTimeout(() => { computerMove(); }, 1000);
}