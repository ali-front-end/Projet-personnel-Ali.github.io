# aliFrontEnd.github.io.
# Tic-Tac-Toe

## Description

Le projet **Tic-Tac-Toe** est une implémentation du jeu classique de morpion en utilisant HTML, CSS et JavaScript. Le jeu permet à deux joueurs de s'affronter en plaçant alternativement leurs symboles ('X' ou 'O') sur une grille de 3x3. Le joueur qui aligne trois de ses symboles horizontalement, verticalement ou en diagonale remporte la partie. Le projet inclut également un système de score sauvegardé dans le stockage local du navigateur.

### Fonctionnalités

- **Partie classique de Tic-Tac-Toe** : Deux joueurs peuvent jouer l'un contre l'autre.
- **Scores sauvegardés** : Le nombre de victoires de chaque joueur est enregistré dans le stockage local et affiché à l'écran.
- **Réinitialisation du jeu** : Il est possible de réinitialiser la partie en cours et de remettre les scores à zéro.
- **Personnalisation de la grille et des symboles** : La grille est stylisée avec CSS, et les symboles 'X' et 'O' peuvent être modifiés avec une police personnalisée.

## Installation

1. Clonez le dépôt sur votre machine locale en utilisant la commande suivante :

    ```bash
    git clone <url-du-dépôt>
    ```

2. Ouvrez le fichier `index.html` dans un navigateur pour jouer au jeu.

## Fonctionnalités JavaScript

### 1. **getWinner()**
Vérifie si un joueur a gagné ou si la partie est un match nul.

- **Entrée** : Aucune entrée.
- **Sortie** : Retourne `'X'`, `'O'`, `'T'` pour match nul, ou `null` si le jeu continue.

### 2. **handleTurn(event)**
Gère le tour d'un joueur lorsque celui-ci clique sur une case de la grille.

- **Entrée** : L'événement `event` qui est déclenché par un clic sur une case.
- **Sortie** : Met à jour l'état de la grille et passe au joueur suivant. Vérifie également si un joueur a gagné.

### 3. **init()**
Initialise le jeu en réinitialisant la grille et les variables du jeu (`board`, `turn`, `win`).

- **Entrée** : Aucune entrée.
- **Sortie** : Remet la grille à zéro et définit le joueur actif à 'X'.

### 4. **render()**
Met à jour l'affichage de la grille et affiche un message sur l'état actuel du jeu.

- **Entrée** : Aucune entrée.
- **Sortie** : Affiche la grille mise à jour et le message du tour actuel ou du gagnant.

### 5. **saveScore()**
Sauvegarde les scores des joueurs dans le stockage local du navigateur.

- **Entrée** : Aucune entrée.
- **Sortie** : Sauvegarde les scores de "X" et "O" dans le `localStorage`.

### 6. **loadScore()**
Charge et affiche les scores sauvegardés depuis le stockage local.

- **Entrée** : Aucune entrée.
- **Sortie** : Affiche les scores actuels des joueurs.

### 7. **clearScore()**
Réinitialise les scores dans le stockage local.

- **Entrée** : Aucune entrée.
- **Sortie** : Réinitialise les scores de "X" et "O" dans le `localStorage`.

### 8. **resetGame()**
Réinitialise le jeu, y compris la grille et les scores.

- **Entrée** : Aucune entrée.
- **Sortie** : Remet la grille à zéro et réinitialise les scores.

## Technologies Utilisées

- **HTML** : Structure de la page et de la grille de jeu.
- **CSS** : Style de la page, de la grille et des éléments.
- **JavaScript** : Logiciel qui gère l'interaction du jeu, la logique de vérification des gagnants, et le stockage des scores.

## Auteurs

- **Ahmed Ali El Amri** : Développeur principal.

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

