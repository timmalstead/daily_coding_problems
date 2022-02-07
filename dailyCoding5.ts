// @ts-ignore
const { log } = console;

//#region

// Boggle is a game played on a 4 x 4 grid of letters. The goal is to find as many words as possible that can be formed by a sequence of adjacent letters in the grid, using each cell at most once. Given a game board and a dictionary of valid words, implement a Boggle solver.

interface Dir {
  name: string;
  rowDir: number;
  colDir: number;
}

type BoggleBoard = Array<Array<string | null>>;

interface BoardAndWord {
  newBoard: BoggleBoard;
  word: string;
}

const dirs: Dir[] = [
  { name: "up", rowDir: -1, colDir: 0 },
  { name: "up-right", rowDir: -1, colDir: 1 },
  { name: "right", rowDir: 0, colDir: 1 },
  { name: "right-down", rowDir: 1, colDir: 1 },
  { name: "down", rowDir: 1, colDir: 0 },
  { name: "down-left", rowDir: 1, colDir: -1 },
  { name: "left", rowDir: 0, colDir: -1 },
  { name: "up-left", rowDir: -1, colDir: -1 },
];

const bBoard: BoggleBoard = [
  ["b", "o", "n", "e"],
  ["a", "x", "s", "f"],
  ["t", "i", "a", "n"],
  ["q", "p", "d", "z"],
];

const validWords: string[] = ["bone", "at", "sad", "pix"];

const searchFromLetter = (
  board: BoggleBoard,
  words: string[],
  row: number,
  col: number,
  word: string
): BoardAndWord => {
  if (words.some((w) => w === word + board[row]?.[col])) {
    const newWord: string = word + board[row][col];
    board[row][col] = null;
    return { newBoard: board, word: newWord };
  } else if (!board[row]?.[col]) return { newBoard: board, word };
  else {
    let searchedWords: BoardAndWord[];

    if (words.some((w) => w.startsWith(word + board[row]?.[col]))) {
      word += board[row][col];
      board[row][col] = null;

      searchedWords = dirs.reduce((newArr, { rowDir, colDir }) => {
        const [newRow, newCol]: number[] = [row + rowDir, col + colDir];

        if (words.some((w) => w.startsWith(word)))
          newArr.push(searchFromLetter(board, words, newRow, newCol, word));

        return newArr;
      }, []);

      searchedWords.sort((a, b) => a.word.length - b.word.length);
    }

    return (
      searchedWords?.pop() || {
        newBoard: board,
        word: "",
      }
    );
  }
};

const solveBoggle = (board: BoggleBoard, words: string[]): string[] => {
  const foundWords: string[] = [];
  let [row, col]: number[] = [0, 0];

  for (let i = 0; i < board.flat().length; ++i) {
    const { newBoard, word } = searchFromLetter(board, words, row, col, "");

    board = newBoard;
    if (word) foundWords.push(word);

    ++col;
    if (board[row][col] === undefined) {
      col = 0;
      ++row;
    }
  }

  return foundWords;
};

log(solveBoggle(bBoard, validWords));
//#endregion
