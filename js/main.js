
/*----- constants -----*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*----- app's state (variables) -----*/
let board;
let turn = 'X';
let win;
let gameOver = false;  // Nouvelle variable pour vérifier si le jeu est terminé
let xScore = 0;
let oScore = 0;

/*----- cached element references -----*/
const squares = Array.from(document.querySelectorAll('#board div'));
const messages = document.querySelector('h2');
const resetButton = document.getElementById('reset-button');
const modal = document.getElementById('modal');
const closeButton = document.getElementById('close');
const noShowButton = document.getElementById('no-show');
const scoreBoard = document.getElementById('score-board');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurn);
resetButton.addEventListener('click', init);
closeButton.addEventListener('click', closeModal);
noShowButton.addEventListener('click', disableModal);

/*----- functions -----*/

// Check for a winner or a tie
function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = board[combo[0]];
        }
    });
    return winner ? winner : board.includes('') ? null : 'T';
}

// Handle player turns
function handleTurn(event) {
    if (gameOver) return;  // Empêcher les mouvements si le jeu est terminé
    if (event.target.textContent !== '') return;  // Ignore if square already filled
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });
    board[idx] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    win = getWinner();
    if (win) {
        gameOver = true;  // Marque la fin du jeu
    }
    render();
}

// Initialize the game board
function init() {
    // Reset the board
    board = ['', '', '', '', '', '', '', '', ''];
    // Only update the score if there was a winner
    if (win === 'X') {
        xScore++;
        localStorage.setItem('xScore', xScore);
    } else if (win === 'O') {
        oScore++;
        localStorage.setItem('oScore', oScore);
    }
    // Reset gameOver state
    gameOver = false;
    win = null;  // Ensure the winner is reset
    render(); // Re-render the game
    resetModalState(); // Reset modal visibility state
    showModal(); // Show the modal again
}

// Render the game state to the DOM
function render() {
    board.forEach(function(mark, index) {
        squares[index].textContent = mark;
    });
    
    // Update the score display
    scoreBoard.textContent = `X: ${xScore} | O: ${oScore}`;
    
    messages.textContent = win === 'T' ? `C'est une égalité !` : win ? `${win} a gagné le jeu !` : `C'est au tour de ${turn}!`;
}

// Open the modal window
function showModal() {
    if (localStorage.getItem('modalClosed') !== 'true') {
        modal.showModal();
        document.body.style.backgroundColor = "rgba(93, 188, 251, 0.5)";
    }
}

// Close the modal window
function closeModal() {
    modal.close();
    document.body.style.backgroundColor = "";
}

// Disable the modal from showing again
function disableModal() {
    modal.close();
    localStorage.setItem('modalClosed', 'true');
}

// Reset modal visibility state
function resetModalState() {
    localStorage.removeItem('modalClosed'); // Reset the 'modalClosed' state
}

// Initialize game on page load
function initializeScores() {
    xScore = parseInt(localStorage.getItem('xScore')) || 0;
    oScore = parseInt(localStorage.getItem('oScore')) || 0;
    scoreBoard.textContent = `X: ${xScore} | O: ${oScore}`;
}

initializeScores();
init();
