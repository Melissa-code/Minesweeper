const bombe = "💣";
const drapeau = "🚩";
let largeur = 9;
let hauteur = 9;
let nbMines = 3;
let matrice = []; // -1: bombe 
let masque = [];  //  1: voile, 0: afficher, -1: drapeau
let nbDrapeaux = 0;
let partieTerminee = false;

/**
 * Inialisation de la matrice du jeu
 **/
function initGame() {
  for (let i = 0; i < hauteur; i++) {
    let rowMasque = [];
    let rowMatrice = [];
    for (let j = 0; j < largeur; j++) {
      rowMasque.push(1);
      rowMatrice.push(1);
    }
    masque.push(rowMasque);
    matrice.push(rowMatrice);
  }
}

/**
 * Génèrer la position des mines aléatoirement dans la matrice
 *
 **/
function placerMines() {
  let intervalle = largeur * hauteur; // aire

  for (let i = 0; i < nbMines; i++) {
    let positionMine;
    let row, col;
    do {
      //choisit une nouvelle position si case est deja -1
      positionMine = Math.floor(Math.random() * intervalle);
      row = Math.floor(positionMine / largeur);
      col = positionMine % largeur;
    } while (matrice[row][col] == -1);

    // place la mine dans la matrice (case -1)
    matrice[row][col] = -1;
  }
}

/**
 *  Créer la grille de jeu
 **/
function createGrid() {
  let grid = document.getElementById("grid");
  let table = document.createElement("table");

  table.classList.add("minesweeper-grid");
  for (let i = 0; i < hauteur; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < largeur; j++) {
      let cell = document.createElement("td");
      cell.classList.add("cell_cachee");
      cell.id = i + "-" + j;
      cell.textContent = "";

      // Event play : left click on a cell
      cell.addEventListener("click", () => {
        jouer(i, j);
      });

      // Event flag : right click on a cell
      cell.addEventListener("contextmenu", (event) => {
        afficheDrapeau(event);
      });
      row.append(cell);
    }
    table.append(row);
  }
  grid.append(table);
}

/**
 * Jouer : clic gauche sur une case
 **/
function jouer(i, j) {
  if (partieTerminee) return;

  // drapeau ou case deja devoilée
  if (masque[i][j] != 1) return; 
  
  // si bombe (-1)
  if (matrice[i][j] == -1) {
    devoilerToutesLesMines();
    afficherMessagePerdu();
    partieTerminee = true;
  } else {
    devoilerVoisinage(i, j);
  }

  displayGrid();
}

/**
 * Afficher toutes les mines
 **/
function devoilerToutesLesMines() {
  for (let i = 0; i < hauteur; i++) {
    for (let j = 0; j < largeur; j++) {
      // devoiler mines sans drapeau
      if (matrice[i][j] == -1 && masque[i][j] != -1) {
        masque[i][j] = 0;
      }
    }
  }
}

/**
 * Dévoiler les cases adjacentes (floodfill) sauf si la case est deja dévoilée
 * s'il y a une mine ou un drapeau
 * Fonction récursive
 */
function devoilerVoisinage(i, j) {
  masque[i][j] = 0;

  if (matrice[i][j] != 0) {
    return;
  } else {
    // get voisinage
    let casesVoisines = voisinages_lineaires(i, j);
  
    for (let k = 0; k < casesVoisines.length; k++) {
      let i1 = Math.trunc(casesVoisines[k] / largeur);
      let j1 = casesVoisines[k] % largeur;

      if (masque[i1][j1] == 1 && matrice[i1][j1] != -1)
        devoilerVoisinage(i1, j1);
    }
  }
}

/**
 *  Effacer le style des cellules
 **/
function effacerStyle(elem) {
  elem.classList.forEach((style_) => {
    elem.classList.remove(style_);
  });
}

/**
 * Affiche un drapeau ou retire un drapeau
 **/
function afficheDrapeau(event) {
  event.preventDefault();

  if (partieTerminee) return;

  const cell = event.target; // cell (td)
  if (cell.classList.contains("cell_devoilee")) return; //impossible
  
  if (cell.classList.contains("cell_drapeau")) {
    cell.classList.remove("cell_drapeau"); //retire
    cell.textContent = "";
  } else {
    nbDrapeaux++;
    cell.classList.add("cell_drapeau"); //ajoute
    cell.textContent = drapeau;
  }
  verifierGagnant();
}

/**
 * Return tableau des cases adjacentes aux bombes
 **/
function voisinages_lineaires(i, j) {
  let voisinages = [];

  for (let ii = i - 1; ii <= i + 1; ii++)
    for (let jj = j - 1; jj <= j + 1; jj++) {
      if (ii < 0 || ii >= hauteur || jj < 0 || jj >= largeur) continue;
      if ((ii == i) & (jj == j)) continue;
      voisinages.push(ii * largeur + jj);
    }

  return voisinages;
}

/**
 * vérifie s'il y a un gagnant
 **/
function verifierGagnant() {
  // Check si nb drapeau == nb mines
  if (nbDrapeaux !== nbMines) return;

  let minesMarqueesParDrapeaux = true;
  // Check les cases de la matrice
  for (let i = 0; i < hauteur; i++) {
    for (let j = 0; j < largeur; j++) {
      // Si mine et pas marquée par un drapeau
      if (matrice[i][j] === -1 && !document.getElementById(i + "-" + j).classList.contains("cell_drapeau")) {
        minesMarqueesParDrapeaux = false;
        break;
      }
    }
    // Si mine non marquée
    if (!minesMarqueesParDrapeaux) break; 
  }

  // si toutes les mines sont marquées d'un drapeau
  if (minesMarqueesParDrapeaux) {
    afficherMessageGagnant();
    devoilerCasesSansMines();
    partieTerminee = true;
  }
}

/**
 * Afficher message  
 */
function afficherMessage(message, classe) {
    const alertMsg = document.querySelector(".alertMsg");
    alertMsg.className = 'alertMsg ' + classe; 
    alertMsg.style.display = "flex";
    alertMsg.textContent = message;

    // Affiche alert
    setTimeout(() => {
        alertMsg.style.opacity = "1";
    }, 100);

    // Cache alert (with transition)
    setTimeout(() => {
        alertMsg.style.opacity = "0";
        setTimeout(() => {
            alertMsg.style.display = "none";
        }, 500);
    }, 3000);
}

function afficherMessageGagnant() {
  afficherMessage("Vous avez gagné !", "gagnant");
}

function afficherMessagePerdu() {
  afficherMessage("Perdu! Une mine a explosé.", "perdant");
}

/**
 * Dévoile les cases sans mines
 **/
function devoilerCasesSansMines() {
  for (let i = 0; i < hauteur; i++) {
    for (let j = 0; j < largeur; j++) {
      //si la case actuelle est une mine
      if (matrice[i][j] !== -1) { 
        let cell = document.getElementById(i + "-" + j);
        if (cell) {
          effacerStyle(cell);
          cell.classList.add("cell_devoilee");
          cell.textContent = matrice[i][j] > 0 ? matrice[i][j] : "";  
        }
      }
    }
  }
}

/**
 *  Affiche la grille de jeu
 **/
function displayGrid() {
  for (let i = 0; i < hauteur; i++) {
    for (let j = 0; j < largeur; j++) {
      let cell = document.getElementById(i + "-" + j);
      effacerStyle(cell);

      //  1 (voile), 0 (afficher), -1 (drapeau)
      switch (masque[i][j]) {
        case 1:
          cell.classList.add("cell_cachee");
          break;
        case 0:
          cell.classList.add("cell_devoilee");
          if (matrice[i][j] > 0) {
            cell.textContent = matrice[i][j];
            cell.classList.add("couleur" + matrice[i][j]);
          }
          if (matrice[i][j] == -1) {
            cell.textContent = bombe;
          }
          break;
        case -1:
          cell.classList.add("cell_drapeau");
          break;
      }
    }
  }
}

/**
 * Mettre les numéros à côté des mines 
 **/
function remplir_chiffres() {
  for (i = 0; i < matrice.length; i++)
    for (let j = 0; j < matrice[i].length; j++) {
      // Vérifie si la case a une bombe -1
      if (matrice[i][j] == -1) {
        continue;
      } else {
        let vecteurVoisinage = voisinages_lineaires(i, j);
        let counterMines = 0;

        for (let k = 0; k < vecteurVoisinage.length; k++) {
          let row = Math.floor(vecteurVoisinage[k] / largeur);
          let col = vecteurVoisinage[k] % largeur;
          if (matrice[row][col] == -1) {
            counterMines++;
          }
        }
       
        matrice[i][j] = counterMines;
      }
    }
}

/**
* Efface contenu de la grille (visuel)
**/
function resetGrid() {
    let grid = document.getElementById("grid");
    grid.innerHTML = ""; 
}

/**
* Rejouer 
**/
document.getElementById("reset-btn").addEventListener("click", ()=> {
    rejouer(); 
});

function rejouer() {
    partieTerminee = false;
    // Vide la matrice le masque et la grille visuelle
    masque = [];
    matrice = [];

    resetGrid();
    initGame(); 
    placerMines(); 
    remplir_chiffres(); 
    createGrid();
    displayGrid();
}

initGame();
placerMines();
remplir_chiffres();
createGrid();
displayGrid();
//console.table(matrice);