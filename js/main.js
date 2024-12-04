/*----- Constantes -----*/
const winningCombos = [
    [0, 1, 2], // Combinaisons gagnantes horizontales
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Combinaisons gagnantes verticales
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Combinaisons gagnantes diagonales
    [2, 4, 6]
];

/*----- État de l'application (variables) -----*/
let board; // État actuel de la grille
let turn = 'X'; // Tour du joueur actuel ('X' ou 'O')
let win; // Résultat du jeu (gagnant ou égalité)
let gameOver = false; // Indique si le jeu est terminé
let xScore = 0; // Score du joueur 'X'
let oScore = 0; // Score du joueur 'O'

/*----- Références des éléments HTML -----*/
const squares = Array.from(document.querySelectorAll('#board div')); // Cases de la grille
const messages = document.querySelector('h2'); // Message d'état du jeu
const resetButton = document.getElementById('reset-button'); // Bouton pour réinitialiser le jeu
const modal = document.getElementById('modal'); // Fenêtre modale
const closeButton = document.getElementById('close'); // Bouton pour fermer la fenêtre modale
const noShowButton = document.getElementById('no-show'); // Bouton pour désactiver la fenêtre modale
const scoreBoard = document.getElementById('score-board'); // Affichage des scores

/*----- Écouteurs d'événements -----*/
document.getElementById('board').addEventListener('click', handleTurn); // Clique sur une case
resetButton.addEventListener('click', init); // Clique sur le bouton de réinitialisation
closeButton.addEventListener('click', closeModal); // Clique pour fermer la fenêtre modale
noShowButton.addEventListener('click', disableModal); // Clique pour ne plus afficher la fenêtre modale

/*----- Fonctions -----*/

// Vérifie si un joueur a gagné ou si c'est une égalité
function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = board[combo[0]]; // Attribue le gagnant ('X' ou 'O')
        }
    });
    return winner ? winner : board.includes('') ? null : 'T'; // Retourne 'T' pour une égalité
}

// Gère le tour d'un joueur lorsqu'une case est cliquée
function handleTurn(event) {
    if (gameOver) return; // Empêche de jouer si le jeu est terminé
    if (event.target.textContent !== '') return; // Ignore les cases déjà remplies
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });
    board[idx] = turn; // Marque la case avec le symbole du joueur
    turn = turn === 'X' ? 'O' : 'X'; // Change de joueur
    win = getWinner(); // Vérifie s'il y a un gagnant
    if (win) {
        gameOver = true; // Marque le jeu comme terminé
    }
    render();
}

// Réinitialise la grille et les états du jeu
function init() {
    board = ['', '', '', '', '', '', '', '', '']; // Vide la grille
    if (win === 'X') {
        xScore++; // Augmente le score de 'X'
        localStorage.setItem('xScore', xScore); // Sauvegarde dans le stockage local
    } else if (win === 'O') {
        oScore++; // Augmente le score de 'O'
        localStorage.setItem('oScore', oScore); // Sauvegarde dans le stockage local
    }
    gameOver = false; // Réinitialise l'état du jeu
    render();
    showModal(); // Affiche la fenêtre modale si activée
}

// Met à jour l'affichage de la grille et des messages
function render() {
    board.forEach(function(mark, index) {
        squares[index].textContent = mark; // Met à jour le contenu des cases
    });
    scoreBoard.textContent = `X: ${xScore} | O: ${oScore}`; // Met à jour le tableau des scores
    messages.textContent = win === 'T' 
        ? `C'est une égalité !` 
        : win 
        ? `${win} a gagné le jeu !` 
        : `C'est au tour de ${turn}!`;
}

// Affiche la fenêtre modale si elle n'est pas désactivée
function showModal() {
    if (localStorage.getItem('modalClosed') !== 'true') {
        modal.showModal();
        document.body.style.backgroundColor = "rgba(93, 188, 251, 0.5)"
    }
}

// Ferme la fenêtre modale
function closeModal() {
    modal.close();
    document.body.style.backgroundColor = "white"

}

// Désactive définitivement l'affichage de la fenêtre modale
function disableModal() {
    modal.close();
    localStorage.setItem('modalClosed', 'true'); // Marque comme désactivée dans le stockage local
    document.body.style.backgroundColor = "white"
}

// Charge les scores depuis le stockage local
function initializeScores() {
    xScore = parseInt(localStorage.getItem('xScore')) || 0; // Récupère ou initialise le score de 'X'
    oScore = parseInt(localStorage.getItem('oScore')) || 0; // Récupère ou initialise le score de 'O'
    scoreBoard.textContent = `X: ${xScore} | O: ${oScore}`; // Affiche les scores
}

// Initialisation des scores et du jeu au chargement
initializeScores();
init();
