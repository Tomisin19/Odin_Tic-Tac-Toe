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

const gameController = (function () {
  let gameOver = false;
  let player1Score = 0;
  let player2Score = 0;
  let currentPlayer;

  function startGame() {
    GameBoard.resetBoard();
    GameBoard.getBoard();
    gameOver = false;
    currentPlayer = player1;
  }

  function playRound(index) {
    //place the marker of the currentPlayer at the chosen index
    //check the board if the player has satisfied the conditions for a win
    // if not, switch currentPlayer to player2 then repeat process
    if (gameOver || GameBoard.getBoard()[index] !== "") {
      return;
    } else {
      GameBoard.placeMarker(index, currentPlayer.marker);
      const winner = checkWinner();
      if (winner) {
        console.log(`${currentPlayer.name} is the winner!`);
        if (currentPlayer === player1) {
          player1Score++;
        } else {
          player2Score++;
        }
      } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
      }
    }
  }

  function checkWinner() {
    const board = GameBoard.getBoard();
    const winnerComb = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winnerComb.length; i++) {
      const [a, b, c] = winnerComb[i];
      if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
        gameOver = true;
        return board[a];
      }
    }
    if (!board.includes("")) {
      gameOver = true;
      console.log("Its a draw!");
    }
    return null;
  }

  function resetGame() {
    GameBoard.resetBoard();
    player1Score = 0;
    player2Score = 0;
    gameOver = false;
    currentPlayer = player1;
  }
  return { startGame, playRound, resetGame };
})();

// gameController.startGame();
// gameController.playRound(0);
// gameController.playRound(1);
// gameController.playRound(3);
// gameController.playRound(4);
// gameController.playRound(6);
// console.log(GameBoard.getBoard());

const displayController = (function () {})();
