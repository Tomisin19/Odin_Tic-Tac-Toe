const GameBoard = (function () {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  function getBoard() {
    return gameBoard;
  }

  function placeMarker(index, marker) {
    if (gameBoard[index] === "") {
      gameBoard[index] = marker;
    } else {
      return;
    }
  }

  function resetBoard() {
    gameBoard.fill("");
  }
  return { getBoard, placeMarker, resetBoard };
})();

function createPlayer(name, marker) {
  return {
    name: name,
    marker: marker,
  };
}

const player1 = createPlayer("Player1", "X");
const player2 = createPlayer("player2", "O");

const gameController = function () {
  let gameOver = false;
  let player1Score = 0;
  let player2Score = 0;
  player1Turn = false;
  player2Turn = false;

  function startGame() {
    GameBoard.resetBoard();
    GameBoard.getBoard();
  }

  function playRound(index) {}

  function resetGame() {
    GameBoard.resetBoard();
    player1Score = 0;
    player2Score = 0;
  }
};
