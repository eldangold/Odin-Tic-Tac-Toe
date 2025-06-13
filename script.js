const GameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;
  const resetBoard = () => (board = ["", "", "", "", "", "", "", "", ""]);
  const makeMove = (symbol, index) => (board[index] = symbol);
  return { getBoard, resetBoard, makeMove };
})();

const displayController = (function () {
  const renderGameboard = () => {
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

  const renderDisplay = () => {
    const display = document.createElement("div");
    display.id = "display";
    document.getElementById("game-components").appendChild(display);
  };

  const display = () => document.getElementById("display");

  return { renderGameboard, renderDisplay, display };
})();

const GameController = (function () {
  let gameMode;
  let activePlayer;

  let firstPlayerMoveSymbol = "X";
  let secondPlayerMoveSymbol = "0";

  const players = [
    {
      name: "Player 1",
      symbol: firstPlayerMoveSymbol,
    },
    {
      name: "Player 2",
      symbol: secondPlayerMoveSymbol,
    },
  ];

  const assignPlayerNames = () => {
    if (document.getElementById("player1-name").value)
      players[0].name = document.getElementById("player1-name").value;
    else players[0].name = "Player 1";

    if (document.getElementById("player2-name").value)
      players[1].name = document.getElementById("player2-name").value;
    else players[1].name = "Player 2";
  };

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    if (gameMode === 1)
      displayController.display().textContent =
        "Current player: " + activePlayer.name;
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
    if (determineWinner() == 0)
      displayController.display().textContent = players[0].name + " win !";
    else if (determineWinner() == 1)
      displayController.display().textContent = players[1].name + " win!";
    else if (determineWinner() == 2)
      displayController.display().textContent = "It's a tie!";
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

  const userInput = (cell) => {
    if (determineWinner() == 3) {
      document
        .querySelector(`[data-index="${cell.target.dataset.index}"]`)
        .removeEventListener("click", userInput);
      GameBoard.makeMove(activePlayer.symbol, cell.target.dataset.index);
      cell.target.textContent = GameBoard.getBoard()[cell.target.dataset.index];
      switchPlayerTurn();
      if (gameMode === 0) computerMove();
      displayWinner();
    } else displayWinner();
  };

  const singlePlayerPlayGame = () => {
    gameMode = 0;
    players[0].name = "You";
    players[1].name = "Computer";
    GameBoard.resetBoard();
    document.getElementById("game-components").innerHTML = "";
    displayController.renderGameboard();
    displayController.renderDisplay();
    computerMove();
    activePlayer = players[0];
    window.scrollTo(0, document.body.scrollHeight);
  };

  const multiPlayerPlayGame = () => {
    document.getElementById("multiplayer-modal-dialog").close();
    gameMode = 1;
    assignPlayerNames();
    activePlayer = players[0];
    GameBoard.resetBoard();
    document.getElementById("game-components").innerHTML = "";
    displayController.renderGameboard();
    displayController.renderDisplay();
    displayController.display().textContent =
      "Current player: " + activePlayer.name;
    window.scrollTo(0, document.body.scrollHeight);
  };

  return { singlePlayerPlayGame, multiPlayerPlayGame, userInput };
})();

document
  .getElementById("start-restart-singleplayer")
  .addEventListener("click", () => GameController.singlePlayerPlayGame());

document
  .getElementById("multiplayer-modal-open")
  .addEventListener("click", () =>
    document.getElementById("multiplayer-modal-dialog").showModal()
  );

document
  .getElementById("multiplayer-modal-close")
  .addEventListener("click", () =>
    document.getElementById("multiplayer-modal-dialog").close()
  );

document
  .getElementById("multiplayer-name-input-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    GameController.multiPlayerPlayGame();
  });
