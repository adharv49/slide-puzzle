const puzzleContainer = document.getElementById("puzzle-container");
const movesDisplay = document.getElementById("moves");

let tiles = [];
let emptyIndex = 15; // start with last tile empty
let moves = 0;

// Initialize the puzzle
function init() {
  tiles = [];
  puzzleContainer.innerHTML = "";

  for (let i = 0; i < 15; i++) {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    tile.textContent = i + 1;
    tile.addEventListener("click", () => moveTile(i));
    puzzleContainer.appendChild(tile);
    tiles.push(tile);
  }

  let empty = document.createElement("div");
  empty.classList.add("tile", "empty");
  puzzleContainer.appendChild(empty);
  tiles.push(empty);
}

// Swap two tiles
function swapTiles(i, j) {
  [tiles[i].textContent, tiles[j].textContent] = [tiles[j].textContent, tiles[i].textContent];
  tiles[i].classList.toggle("empty");
  tiles[j].classList.toggle("empty");
}

// Move tile using Python-style adjacency logic
function moveTile(i) {
  const row = Math.floor(i / 4);
  const col = i % 4;
  const emptyRow = Math.floor(emptyIndex / 4);
  const emptyCol = emptyIndex % 4;

  // check if tile is next to empty
  if ((row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)) {
    swapTiles(i, emptyIndex);
    emptyIndex = i;
    moves++;
    movesDisplay.textContent = `Moves: ${moves}`;
    checkWin();
  }
}

// Shuffle the tiles by making random valid moves
function shuffle() {
  for (let i = 0; i < 200; i++) {
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;
    const neighbors = [];

    // Collect indices of tiles next to empty
    if (emptyCol > 0) neighbors.push(emptyIndex - 1); // left
    if (emptyCol < 3) neighbors.push(emptyIndex + 1); // right
    if (emptyRow > 0) neighbors.push(emptyIndex - 4); // up
    if (emptyRow < 3) neighbors.push(emptyIndex + 4); // down

    const randomTile = neighbors[Math.floor(Math.random() * neighbors.length)];
    swapTiles(randomTile, emptyIndex);
    emptyIndex = randomTile;
  }
  moves = 0;
  movesDisplay.textContent = "Moves: 0";
}

// Check if the player has won
function checkWin() {
  let correct = true;
  for (let i = 0; i < 15; i++) {
    if (tiles[i].textContent != i + 1) {
      correct = false;
      break;
    }
  }
  if (correct && tiles[15].classList.contains("empty")) {
    setTimeout(() => alert(`🎉 You solved the puzzle in ${moves} moves!`), 100);
  }
}

// Start the game
init();
shuffle();
