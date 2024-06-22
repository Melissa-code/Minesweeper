# Minesweeper / Démineur


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


