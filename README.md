# Minesweeper / Démineur

Jouer au jeu: [Demineur](https://jeu-du-demineur.netlify.app/)


Le Démineur (Minesweeper) est un jeu qui consiste à découvrir des cases d'une grille sans déclencher de mines cachées.


1. Le but du jeu est de dévoiler toutes les cases de la grille qui ne contiennent pas de mines, tout en évitant de cliquer sur une case contenant une mine. Si un joueur clique sur une mine, la partie est perdue.
Grille de Jeu:

2. Le jeu se joue sur une grille composée de cellules. Chaque cellule peut contenir soit une mine, soit un chiffre indiquant combien de mines se trouvent dans les cellules adjacentes (voisines).

Types de Cases:

Case Vide: Ne contient aucune mine adjacente, et toutes les cases voisines sont dévoilées automatiquement.

Case Chiffrée: Contient un chiffre de 1 à 8 qui indique le nombre de mines adjacentes.

Case Mine: Une case qui contient une mine. Si elle est cliquée, le joueur perd la partie.

Case Drapeau: Le joueur peut marquer une case comme suspecte (potentiellement une mine) en plaçant un drapeau dessus.


3. Cliquer (Gauche): Révèle la case. Si c'est une mine, la partie se termine. Si c'est vide, les cases adjacentes sont révélées.

4. Clic Droit: Place ou enlève un drapeau sur une case pour signaler une mine présumée.
Victoire:

5. Le joueur gagne en révélant toutes les cases qui ne contiennent pas de mines. Cela peut impliquer le placement correct de drapeaux sur toutes les mines.


## 1. définir les variables globales 

```
    let largeur = 9;
    let hauteur = 9;
    let nbMines = 10;
    let matrice = [];
```


## 2. Créer la matrice de jeu (la grille virtuelle) avec initGame(): 

Remplir chaque ligne de la matrice de cases non jouées définies à -1 


## 3. Déterminer la position de chacune des 10 mines avec placeMines():

Remplir le tableau vecteur de 10 mines dont la position est déterminée de manière aléatoire dans les cases de la matrice (ex: 9*9=81)

Convertir la position en coordonnées 2D (x et y) : 

Soit : `i = Math.floor(positionMine / largeur)` (int), ex: let row = Math.floor(23 / 9); // row = 2

Soit : `j = positionMine % largeur` (reste), ex: let col = 23 % 9; // col = 5

pour remplir la matrice de -2 quand il y a une bombe.


## 4. Afficher la grille de jeu en HTML avec displayGame(): 

Créer la grille de jeu. Affiche la bome si la case -2 est cliquée. 


