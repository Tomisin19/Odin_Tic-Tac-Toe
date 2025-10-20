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
    gameBoard = ["", "", "", "", "", "", "", "", ""];
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

  const playerScore = document.getElementById("playerScore");

  function startGame() {
    GameBoard.resetBoard();
    GameBoard.getBoard();
    gameOver = false;
    currentPlayer = player1;
  }

  function playRound(index) {
    if (gameOver || GameBoard.getBoard()[index] !== "") {
      return;
    } else {
      GameBoard.placeMarker(index, currentPlayer.marker);
      const winner = checkWinner();
      if (winner) {
        const winners = document.getElementById("winners");
        let winnerText = document.createElement("p");
        winnerText.textContent = `${currentPlayer.marker} is the winner!`;
        winnerText.classList.toggle("winner");
        winners.appendChild(winnerText);

        if (currentPlayer === player1) {
          player1Score++;
        } else {
          player2Score++;
        }

        // update visible scores
        displayController.updateScores();
      } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
      }
      displayController.render();
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
      const draw = document.getElementById("winners");
      let drawText = document.createElement("p");
      drawText.textContent = ` It's a draw! `;
      drawText.classList.toggle("winner");
      draw.appendChild(drawText);
    }
    return null;
  }

  function resetGame() {
    GameBoard.resetBoard();
    player1Score = 0;
    player2Score = 0;
    gameOver = false;
    currentPlayer = player1;
    document.getElementById("winners").innerHTML = "";
    // update visible scores after full reset
    displayController.updateScores();
    displayController.render();
  }
  function nextRound() {
    GameBoard.resetBoard();
    gameOver = false;
    currentPlayer = player1;
    displayController.render();
    document.getElementById("winners").innerHTML = "";
  }

  function getScores() {
    return { player1: player1Score, player2: player2Score };
  }

  return { startGame, playRound, resetGame, getScores, nextRound };
})();

const displayController = (function () {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      gameController.playRound(index);
    });
  });

  function render() {
    let board = GameBoard.getBoard();
    cells.forEach((cell, i) => {
      cell.textContent = board[i];
    });
  }

  function updateScores() {
    const scores = gameController.getScores();
    const p1 = document.getElementById("player1Score");
    const p2 = document.getElementById("player2Score");
    if (p1) p1.textContent = scores.player1;
    if (p2) p2.textContent = scores.player2;
  }
  function resetGame() {
    const reset = document.getElementById("restart");
    reset.addEventListener("click", () => {
      gameController.resetGame();
    });
  }

  function nextRound() {
    const next = document.getElementById("nextRound");
    next.addEventListener("click", () => {
      gameController.nextRound();
    });
  }
  function displayControllers() {
    render();
    updateScores();
    resetGame();
    nextRound();
  }

  return { render, updateScores, resetGame, nextRound, displayControllers };
})();

// initialize UI
gameController.startGame();
displayController.displayControllers();
