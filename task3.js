const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart-button');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        alert(`${currentPlayer} has won!`);
        gameActive = false;
        return;
    }

    if (gameState.every(cell => cell !== '')) {
        alert('It\'s a draw!');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

function restartGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

let gameActive = true;
