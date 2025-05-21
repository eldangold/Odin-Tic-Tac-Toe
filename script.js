let cells = document.getElementById("gameboard");
const GameBoard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;
  const makeMove = (symbol, index) => (board[index] = symbol);
  return { getBoard, makeMove };
})();

const GameController = (function () {
  userMoveSymbol = "X";
  computerMoveSymbol = "0";

  const players = [
    {
      name: "User",
      symbol: userMoveSymbol,
    },
    {
      name: "Computer",
      symbol: computerMoveSymbol,
    },
  ];

  const render = () => {
    GameBoard.getBoard().forEach((value, index) => {
      let cell = document.createElement("div");
      cell.dataset.index = index;
      cell.addEventListener("click", userInput);
      cell.textContent = value;
      cell.className = "cell";

      cells.appendChild(cell);
    });
  };

  const determineWinner = () => {
    if (
      (GameBoard.getBoard()[0] == userMoveSymbol &&
        GameBoard.getBoard()[1] == userMoveSymbol &&
        GameBoard.getBoard()[2] == userMoveSymbol) ||
      (GameBoard.getBoard()[3] == userMoveSymbol &&
        GameBoard.getBoard()[4] == userMoveSymbol &&
        GameBoard.getBoard()[5] == userMoveSymbol) ||
      (GameBoard.getBoard()[6] == userMoveSymbol &&
        GameBoard.getBoard()[7] == userMoveSymbol &&
        GameBoard.getBoard()[8] == userMoveSymbol) ||
      (GameBoard.getBoard()[0] == userMoveSymbol &&
        GameBoard.getBoard()[3] == userMoveSymbol &&
        GameBoard.getBoard()[6] == userMoveSymbol) ||
      (GameBoard.getBoard()[1] == userMoveSymbol &&
        GameBoard.getBoard()[4] == userMoveSymbol &&
        GameBoard.getBoard()[7] == userMoveSymbol) ||
      (GameBoard.getBoard()[2] == userMoveSymbol &&
        GameBoard.getBoard()[5] == userMoveSymbol &&
        GameBoard.getBoard()[8] == userMoveSymbol) ||
      (GameBoard.getBoard()[0] == userMoveSymbol &&
        GameBoard.getBoard()[4] == userMoveSymbol &&
        GameBoard.getBoard()[8] == userMoveSymbol) ||
      (GameBoard.getBoard()[2] == userMoveSymbol &&
        GameBoard.getBoard()[4] == userMoveSymbol &&
        GameBoard.getBoard()[6] == userMoveSymbol)
    ) {
      return 0;
    } else if (
      (GameBoard.getBoard()[0] == computerMoveSymbol &&
        GameBoard.getBoard()[1] == computerMoveSymbol &&
        GameBoard.getBoard()[2] == computerMoveSymbol) ||
      (GameBoard.getBoard()[3] == computerMoveSymbol &&
        GameBoard.getBoard()[4] == computerMoveSymbol &&
        GameBoard.getBoard()[5] == computerMoveSymbol) ||
      (GameBoard.getBoard()[6] == computerMoveSymbol &&
        GameBoard.getBoard()[7] == computerMoveSymbol &&
        GameBoard.getBoard()[8] == computerMoveSymbol) ||
      (GameBoard.getBoard()[0] == computerMoveSymbol &&
        GameBoard.getBoard()[3] == computerMoveSymbol &&
        GameBoard.getBoard()[6] == computerMoveSymbol) ||
      (GameBoard.getBoard()[1] == computerMoveSymbol &&
        GameBoard.getBoard()[4] == computerMoveSymbol &&
        GameBoard.getBoard()[7] == computerMoveSymbol) ||
      (GameBoard.getBoard()[2] == computerMoveSymbol &&
        GameBoard.getBoard()[5] == computerMoveSymbol &&
        GameBoard.getBoard()[8] == computerMoveSymbol) ||
      (GameBoard.getBoard()[0] == computerMoveSymbol &&
        GameBoard.getBoard()[4] == computerMoveSymbol &&
        GameBoard.getBoard()[8] == computerMoveSymbol) ||
      (GameBoard.getBoard()[2] == computerMoveSymbol &&
        GameBoard.getBoard()[4] == computerMoveSymbol &&
        GameBoard.getBoard()[6] == computerMoveSymbol)
    ) {
      return 1;
    } else return 2;
  };

  const displayWinner = () => {
    if (determineWinner() == 0) alert("You win !");
    else if (determineWinner() == 1) alert("You lose!");
  };

  function computerMove() {
    if (determineWinner() == 2) {
      let move = Math.floor(Math.random() * 9);
      while (GameBoard.getBoard()[move]) {
        move = Math.floor(Math.random() * 9);
      }
      document
        .querySelector(`[data-index="${move}"]`)
        .removeEventListener("click", userInput);
      GameBoard.getBoard()[move] = computerMoveSymbol;
      document.querySelector(`[data-index="${move}"]`).textContent =
        GameBoard.getBoard()[move];
    } else displayWinner();
  }

  const userInput = (e) => {
    if (determineWinner() == 2) {
      document
        .querySelector(`[data-index="${e.target.dataset.index}"]`)
        .removeEventListener("click", userInput);
      GameBoard.getBoard()[e.target.dataset.index] = userMoveSymbol;
      document.querySelector(
        `[data-index="${e.target.dataset.index}"]`
      ).textContent = userMoveSymbol;
      e.target.textContent = GameBoard.getBoard()[e.target.dataset.index];
      computerMove();
    } else displayWinner();
  };

  const playGame = () => {
    render();
    computerMove();
  };

  return { playGame };
})();

GameController.playGame();
