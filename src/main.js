const GameBoard = () => {
  return { board: Array(9).fill(0) };
};

const Player = (name, mark) => {
  return { name: name.trim(), mark };
};

const board = GameBoard();

const player1 = Player("Jasmir", "X");
const player2 = Player("Cafeina", "O");

const GameFlow = ((brd, p1, p2) => {
  const player1Positions = [];
  const player2Positions = [];

  const checkWinner = () => {
    const wPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    wPatterns.forEach((pattern) => {
      if (pattern.every((i) => player1Positions.includes(i))) return pattern;
      if (pattern.every((i) => player2Positions.includes(i))) return pattern;
    });
  };

  const handleMark = (mark, index) => {
    if (!brd[index]) {
      brd[index] = mark;

      if (mark === p1.mark) {
        player1Positions.push(index);
      }

      if (mark === p2.mark) {
        player2Positions.push(index);
      }
    } else {
      return;
    }
  };

  return { handleMark, checkWinner };
})(board, player1, player2);
