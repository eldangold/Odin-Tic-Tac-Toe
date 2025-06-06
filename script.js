const GameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;
  const resetBoard = () => (board = ["", "", "", "", "", "", "", "", ""]);
  const makeMove = (symbol, index) => (board[index] = symbol);
  return { getBoard, resetBoard, makeMove };
})();

const displayController = (function () {
  const render = () => {
    const gameboard = document.createElement("div");
    gameboard.id = "gameboard";

    GameBoard.getBoard().forEach((value, index) => {
      let cell = document.createElement("div");
      cell.dataset.index = index;
      cell.addEventListener("click", GameController.userInput);
      cell.textContent = value;
      cell.className = "cell";
      gameboard.appendChild(cell);
    });

    document.getElementById("game-components").appendChild(gameboard);
  };

  const display = () => {
    const displayElement = document.createElement("div");
    displayElement.id = "display";
    document.getElementById("game-components").appendChild(displayElement);
  };
  return { render, display };
})();

const GameController = (function () {
  let gameMode;
  let activePlayer;

  firstPlayerMoveSymbol = "X";
  secondPlayerMoveSymbol = "0";

  player1 = "Player 1";
  player2 = "Player 2";

  const players = [
    {
      name: player1,
      symbol: firstPlayerMoveSymbol,
    },
    {
      name: player2,
      symbol: secondPlayerMoveSymbol,
    },
  ];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    if (gameMode === 1)
      display.textContent = "Current player: " + activePlayer.name;
  };

  const determineWinner = () => {
    if (
      (GameBoard.getBoard()[0] == firstPlayerMoveSymbol &&
        GameBoard.getBoard()[1] == firstPlayerMoveSymbol &&
        GameBoard.getBoard()[2] == firstPlayerMoveSymbol) ||
      (GameBoard.getBoard()[3] == firstPlayerMoveSymbol &&
        GameBoard.getBoard()[4] == firstPlayerMoveSymbol &&
        GameBoard.getBoard()[5] == firstPlayerMoveSymbol) ||
      (GameBoard.getBoard()[6] == firstPlayerMoveSymbol &&
        GameBoard.getBoard()[7] == firstPlayerMoveSymbol &&
        GameBoard.getBoard()[8] == firstPlayerMoveSymbol) ||
      (GameBoard.getBoard()[0] == firstPlayerMoveSymbol &&
        GameBoard.getBoard()[3] == firstPlayerMoveSymbol &&
        GameBoard.getBoard()[6] == firstPlayerMoveSymbol) ||
      (GameBoard.getBoard()[1] == firstPlayerMoveSymbol &&
        GameBoard.getBoard()[4] == firstPlayerMoveSymbol &&
        GameBoard.getBoard()[7] == firstPlayerMoveSymbol) ||
      (GameBoard.getBoard()[2] == firstPlayerMoveSymbol &&
        GameBoard.getBoard()[5] == firstPlayerMoveSymbol &&
        GameBoard.getBoard()[8] == firstPlayerMoveSymbol) ||
      (GameBoard.getBoard()[0] == firstPlayerMoveSymbol &&
        GameBoard.getBoard()[4] == firstPlayerMoveSymbol &&
        GameBoard.getBoard()[8] == firstPlayerMoveSymbol) ||
      (GameBoard.getBoard()[2] == firstPlayerMoveSymbol &&
        GameBoard.getBoard()[4] == firstPlayerMoveSymbol &&
        GameBoard.getBoard()[6] == firstPlayerMoveSymbol)
    ) {
      return 0;
    } else if (
      (GameBoard.getBoard()[0] == secondPlayerMoveSymbol &&
        GameBoard.getBoard()[1] == secondPlayerMoveSymbol &&
        GameBoard.getBoard()[2] == secondPlayerMoveSymbol) ||
      (GameBoard.getBoard()[3] == secondPlayerMoveSymbol &&
        GameBoard.getBoard()[4] == secondPlayerMoveSymbol &&
        GameBoard.getBoard()[5] == secondPlayerMoveSymbol) ||
      (GameBoard.getBoard()[6] == secondPlayerMoveSymbol &&
        GameBoard.getBoard()[7] == secondPlayerMoveSymbol &&
        GameBoard.getBoard()[8] == secondPlayerMoveSymbol) ||
      (GameBoard.getBoard()[0] == secondPlayerMoveSymbol &&
        GameBoard.getBoard()[3] == secondPlayerMoveSymbol &&
        GameBoard.getBoard()[6] == secondPlayerMoveSymbol) ||
      (GameBoard.getBoard()[1] == secondPlayerMoveSymbol &&
        GameBoard.getBoard()[4] == secondPlayerMoveSymbol &&
        GameBoard.getBoard()[7] == secondPlayerMoveSymbol) ||
      (GameBoard.getBoard()[2] == secondPlayerMoveSymbol &&
        GameBoard.getBoard()[5] == secondPlayerMoveSymbol &&
        GameBoard.getBoard()[8] == secondPlayerMoveSymbol) ||
      (GameBoard.getBoard()[0] == secondPlayerMoveSymbol &&
        GameBoard.getBoard()[4] == secondPlayerMoveSymbol &&
        GameBoard.getBoard()[8] == secondPlayerMoveSymbol) ||
      (GameBoard.getBoard()[2] == secondPlayerMoveSymbol &&
        GameBoard.getBoard()[4] == secondPlayerMoveSymbol &&
        GameBoard.getBoard()[6] == secondPlayerMoveSymbol)
    ) {
      return 1;
    } else if (GameBoard.getBoard().every((cell) => cell !== "")) return 2;
    else return 3;
  };

  const displayWinner = () => {
    if (determineWinner() == 0) display.textContent = player1 + " win !";
    else if (determineWinner() == 1) display.textContent = player2 + " win!";
    else if (determineWinner() == 2) display.textContent = "It's a tie!";
  };

  function computerMove() {
    if (determineWinner() == 3) {
      let move = Math.floor(Math.random() * 9);
      while (GameBoard.getBoard()[move]) {
        move = Math.floor(Math.random() * 9);
      }
      document
        .querySelector(`[data-index="${move}"]`)
        .removeEventListener("click", userInput);
      GameBoard.getBoard()[move] = secondPlayerMoveSymbol;
      document.querySelector(`[data-index="${move}"]`).textContent =
        GameBoard.getBoard()[move];
      switchPlayerTurn();
      displayWinner();
    } else displayWinner();
  }

  const userInput = (e) => {
    if (determineWinner() == 3) {
      document
        .querySelector(`[data-index="${e.target.dataset.index}"]`)
        .removeEventListener("click", userInput);
      GameBoard.getBoard()[e.target.dataset.index] = activePlayer.symbol;
      document.querySelector(
        `[data-index="${e.target.dataset.index}"]`
      ).textContent = firstPlayerMoveSymbol;
      e.target.textContent = GameBoard.getBoard()[e.target.dataset.index];
      switchPlayerTurn();
      if (gameMode === 0) computerMove();
    } else displayWinner();
  };

  const singlePlayerPlayGame = () => {
    gameMode = 0;
    player1 = "You";
    player2 = "Computer";
    GameBoard.resetBoard();
    document.getElementById("game-components").innerHTML = "";
    displayController.render();
    displayController.display();
    computerMove();
    activePlayer = players[0];
  };

  const multiPlayerPlayGame = () => {
    gameMode = 1;
    activePlayer = players[0];
    GameBoard.resetBoard();
    document.getElementById("game-components").innerHTML = "";
    displayController.render();
    displayController.display();
  };

  return { singlePlayerPlayGame, multiPlayerPlayGame, userInput };
})();

document
  .getElementById("start-restart-singleplayer")
  .addEventListener("click", () => GameController.singlePlayerPlayGame());

document
  .getElementById("start-restart-multiplayer")
  .addEventListener("click", () => GameController.multiPlayerPlayGame());
