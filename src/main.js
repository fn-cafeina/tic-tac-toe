const board = GameBoard();

const players = [];

const game = document.querySelector(".game");

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", handleStartBtn);

function handleStartBtn() {
  const player1Name = document.getElementById("player1-name");
  const player2Name = document.getElementById("player2-name");

  if (player1Name.value && player2Name.value) {
    players.push(Player(player1Name.value, "X"));
    players.push(Player(player2Name.value, "O"));

    closeModal(document.querySelector("dialog"));
  } else {
    alert("Please enter your names.");
  }
}

function renderBoard(board) {
  while (game.firstChild) game.removeChild(game.firstChild);

  board.forEach((element) => {
    const div = document.createElement("div");

    if (element) {
      const span = document.createElement("span");
      span.textContent = element;
      div.appendChild(span);
      game.appendChild(div);
    } else {
      game.appendChild(div);
    }
  });
}

function init() {
  showModal(document.querySelector("dialog"));
}

function showModal(dialog) {
  dialog.showModal();
}

function closeModal(dialog) {
  dialog.close();
}

function GameBoard() {
  return { board: Array(9).fill(0) };
}

function Player(name, mark) {
  return { name: name.trim(), mark };
}

const GameFlow = (function () {
  let turn = true;

  let player1Positions = [];
  let player2Positions = [];

  function turnToTrue() {
    turn = true;
  }

  function toggleTurn() {
    turn = !turn;
  }

  function resetPlayersPositions() {
    player1Positions = [];
    player2Positions = [];
  }

  function checkWinner() {
    const wPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    wPatterns.forEach((pattern) => {
      if (pattern.every((i) => player1Positions.includes(i))) {
        handleWinner({ winner: players[0], pattern });
      }

      if (pattern.every((i) => player2Positions.includes(i))) {
        handleWinner({ winner: players[1], pattern });
      }
    });
  }

  function handleMark(index) {
    if (board.board[index] === 0) {
      if (turn) {
        board.board[index] = players[0].mark;
        player1Positions.push(index);
        toggleTurn();
      } else {
        board.board[index] = players[1].mark;
        player2Positions.push(index);
        toggleTurn();
      }
    } else {
      return;
    }
  }

  return { handleMark, checkWinner, resetPlayersPositions, turnToTrue };
})();

function handleWinner(w) {
  setTimeout(() => {
    alert(`The winner is: ${w.winner.name}`);
    if (confirm("Play with the same names?")) {
      handleRestart();
    } else {
      location.reload();
    }
  }, 100);
}

function handleRestart() {
  board.board = Array(9).fill(0);
  renderBoard(board.board);
  GameFlow.resetPlayersPositions();
  GameFlow.turnToTrue();
}

game.addEventListener("click", (event) => {
  GameFlow.handleMark(Array.from(game.children).indexOf(event.target));
  renderBoard(board.board);
  GameFlow.checkWinner();
});

init();
