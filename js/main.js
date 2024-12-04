/*----- constantes -----*/
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

/*----- état de l'application (variables) -----*/
let board;
let turn = 'X';
let win;
let gameOver = false;  // Nouvelle variable pour vérifier si le jeu est terminé
let xScore = 0;
let oScore = 0;

/*----- références des éléments dans le DOM -----*/
const squares = Array.from(document.querySelectorAll('#board div'));
const messages = document.querySelector('h2');
const resetButton = document.getElementById('reset-button');
const modal = document.getElementById('modal');
const closeButton = document.getElementById('close');
const noShowButton = document.getElementById('no-show');
const scoreBoard = document.getElementById('score-board');

/*----- écouteurs d'événements -----*/
document.getElementById('board').addEventListener('click', handleTurn);
resetButton.addEventListener('click', init);
closeButton.addEventListener('click', closeModal);
noShowButton.addEventListener('click', disableModal);

/*----- fonctions -----*/

// Vérifier s'il y a un gagnant ou un match nul
function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = board[combo[0]];
        }
    });
    return winner ? winner : board.includes('') ? null : 'T';
}

// Gérer les tours des joueurs
function handleTurn(event) {
    if (gameOver) return;  // Empêcher les mouvements si le jeu est terminé
    if (event.target.textContent !== '') return;  // Ignorer si la case est déjà remplie
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });
    board[idx] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    win = getWinner();
    if (win) {
        gameOver = true;  // Marquer la fin du jeu
    }
    render();
}

// Initialiser le plateau de jeu
function init() {
    // Réinitialiser le plateau
    board = ['', '', '', '', '', '', '', '', ''];
    // Mettre à jour le score uniquement s'il y a un gagnant
    if (win === 'X') {
        xScore++;
        localStorage.setItem('xScore', xScore);
    } else if (win === 'O') {
        oScore++;
        localStorage.setItem('oScore', oScore);
    }
    // Réinitialiser l'état du jeu terminé
    gameOver = false;
    win = null;  // S'assurer que le gagnant est réinitialisé
    render(); // Re-rendre le jeu
    resetModalState(); // Réinitialiser l'état de visibilité du modal
    showModal(); // Afficher à nouveau le modal
}

// Afficher l'état du jeu dans le DOM
function render() {
    board.forEach(function(mark, index) {
        squares[index].textContent = mark;
    });
    
    // Mettre à jour l'affichage du score
    scoreBoard.textContent = `X: ${xScore} | O: ${oScore}`;
    
    messages.textContent = win === 'T' ? `C'est une égalité !` : win ? `${win} a gagné le jeu !` : `C'est au tour de ${turn}!`;
}

// Ouvrir la fenêtre modale
function showModal() {
    if (localStorage.getItem('modalClosed') !== 'true') {
        modal.showModal();
        document.body.style.backgroundColor = "rgba(93, 188, 251, 0.5)";
    }
}

// Fermer la fenêtre modale
function closeModal() {
    modal.close();
    document.body.style.backgroundColor = "white";
}

// Désactiver l'affichage de la modale à l'avenir
function disableModal() {
    modal.close();
    localStorage.setItem('modalClosed', 'true');
}

// Réinitialiser l'état de visibilité du modal
function resetModalState() {
    localStorage.removeItem('modalClosed'); // Réinitialiser l'état 'modalClosed'
}

// Initialiser les scores à l'ouverture de la page
function initializeScores() {
    xScore = parseInt(localStorage.getItem('xScore')) || 0;
    oScore = parseInt(localStorage.getItem('oScore')) || 0;
    scoreBoard.textContent = `X: ${xScore} | O: ${oScore}`;
}

initializeScores();
init();
