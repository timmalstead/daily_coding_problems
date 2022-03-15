// @ts-ignore
const [{ log }, { ceil, random, floor }, { values, entries }, { isInteger }] = [
  console,
  Math,
  Object,
  Number,
];

import { asc, dsc } from "./helpers";

//#region boggler

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

// log(solveBoggle(bBoard, validWords));
//#endregion

//#region largest combination of numbers

// Given a list of numbers, create an algorithm that arranges them in order to form the largest possible integer. For example, given [10, 7, 76, 415], you should return 77641510
const permutations = (inputArr: any[]): any[] => {
  const result: any[] = [];

  const permute = (arr: any[], m: any[] = []) => {
    if (!arr.length) result.push(m);
    else
      for (let i = 0; i < arr.length; ++i) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
  };
  permute(inputArr);

  return result;
};
//copied the above, i don't know why this kind of stuff is so tough for me

const largestPossible = (n: number[]): number => {
  const perms: number[][] = permutations(n);

  const summedPerms: number[] = perms.map((perm) => +perm.join(""));

  summedPerms.sort(asc);

  return summedPerms.pop();
};

// log(largestPossible([10, 7, 76, 415]));

//#endregion

//#region snakes and ladders

// Snakes and Ladders is a game played on a 10 x 10 board, the goal of which is get from square 1 to square 100. On each turn players will roll a six-sided die and move forward a number of spaces equal to the result. If they land on a square that represents a snake or ladder, they will be transported ahead or behind, respectively, to a new square.

// Find the smallest number of turns it takes to play snakes and ladders.

const sAndL: { [location: number]: number } = {
  16: 6,
  48: 26,
  49: 11,
  56: 53,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  98: 78,
  1: 38,
  4: 14,
  9: 31,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  80: 100,
};

const rollDie = (): number => ceil(random() * 6);

const snakesAndLadders = (): number => {
  let [curSpace, turns]: number[] = [1, 0];

  while (curSpace < 100) {
    curSpace += rollDie();
    if (sAndL[curSpace]) curSpace = sAndL[curSpace];
    ++turns;
  }

  return turns;
};

// const plays: number[] = [];
// for (let i = 0; i < 10000; ++i) plays.push(snakesAndLadders());

// plays.sort(dsc).forEach((p) => log(p));

//#endregion

//#region no adjacent characters

// Given a string with repeated characters, rearrange the string so that no two adjacent characters are the same. If this is not possible, return None.

// For example, given "aaabbc", you could return "ababac". Given "aaab", return None.

// i say thee nay to this problem. i'm not going to return the string, because i don't have the time right now, but i will return (i think) a reliable indicator of whether it can be done or not

const canBeRearrangedWithNoRepeats = (str: string): boolean => {
  const counter: { [num: number]: number } = {};
  for (const s of str) counter[s] = ++counter[s] || 1;

  const sortedFrequencies: number[] = values(counter).sort(asc);

  return floor(str.length / 2) >= sortedFrequencies.pop();
};

// huh, no i think i may be able to do it while using above algo to help

const arrangeStrWithNoRepeats = (str: string): string | null => {
  if (canBeRearrangedWithNoRepeats(str)) {
    const strAsArr: string[] = str.split("");
    let finalStr: string = strAsArr.shift();

    while (strAsArr.length) {
      let i: number = 0;

      for (; i < strAsArr.length; ++i) {
        const curChar: string = strAsArr[i];

        if (curChar !== finalStr[finalStr.length - 1]) {
          finalStr += curChar;
          break;
        }
      }
      strAsArr.splice(i, 1);
    }
    return finalStr;
  } else return null;
};

// log(arrangeStrWithNoRepeats("howdy"));
// log(arrangeStrWithNoRepeats("aaabbc"));
// "aaabbc" -> can be rearranged? === true -> [a,a,b,b,c] 'a' -> [a,a,b,c] 'ab' -> [a,b,c] 'aba' -> [a,c] 'abab' -> [c] 'ababa' -> [] 'ababac' -> [].length === 0 -> 'ababac'
// log(arrangeStrWithNoRepeats("aaab"));

//#endregion

//#region prefix map sum

// Implement a PrefixMapSum class with the following methods:

// insert(key: str, value: int): Set a given key's value in the map. If the key already exists, overwrite the value.
// sum(prefix: str): Return the sum of all values of keys that begin with a given prefix.
// For example, you should be able to run the following code:

// mapsum.insert("columnar", 3)
// assert mapsum.sum("col") == 3

// mapsum.insert("column", 2)
// assert mapsum.sum("col") == 5

class PrefixMapSum {
  private data: { [key: string]: number } = {};

  public insert(key: string, val: number): this {
    this.data[key] = val;
    return this;
  }

  public sum(prefix: string): number {
    return entries(this.data)
      .filter(([key]): boolean => key.startsWith(prefix))
      .reduce((total, [_, num]): number => total + num, 0);
  }
}

// const pre = new PrefixMapSum();

// pre.insert("colOne", 5).insert("colTwo", 3);

// log(pre.sum("col"));

//#endregion

//#region return nth fib number

// Implement the function fib(n), which returns the nth number in the Fibonacci sequence, using only O(1) space.

const fibNth = (n: number): number => {
  if (isInteger(n) && n > 0) {
    const fibIter = (a: number, b: number, n: number): number =>
      n === 0 ? b : fibIter(a + b, a, --n);
    return fibIter(0, 1, n);
  } else throw new Error("fibNth argument must be an integer above 0");
};

// fibNth(5) -> fibIter(0,1,5) -> fibIter(1,0,4) -> fibIter(1,1,3) -> fibIter(2,1,2) -> fibIter(3,2,1) -> 3

// log(fibNth(10));

//#endregion

//#region min and max with minimum comparisons

// Given an array of numbers of length N, find both the minimum and maximum using less than 2 * (N - 2) comparisons.

const testNums: number[] = [19, 51, 22, 29, 236, 54, 8, 6, 7, 1]; // 10 elements, so aim for fewer than 16 comparions and a return of [1, 236]
let comparisons: number = 0;

const minMax = (n: number[]): number[] | null => {
  if (n.length < 2) return null;
  else {
    let min: number, max: number;

    if (n[1] > n[0]) {
      min = n[0];
      max = n[1];
    } else {
      min = n[1];
      max = n[0];
    }
    ++comparisons;

    for (let i = 2; i < n.length; ++i) {
      const cur: number = n[i];
      if (cur < min) {
        min = cur;
        ++comparisons;
        log("min");
      } else if (cur > max) {
        max = cur;
        comparisons += 2;
        log("max");
      } else {
        comparisons += 2;
        log("no change");
      }
    }
    return [min, max];
  }
};

const randomize = (a: any[]): any[] => {
  const finalArr: any[] = [];

  while (a.length) {
    const cur: number = floor(random() * a.length);

    finalArr.push(a[cur]);
    a.splice(cur, 1);
  }
  return finalArr;
};

// log(minMax(randomize(testNums)), `Comparisons: ${comparisons}`);

//#endregion

//#region is point inside polygon

// You are given a list of N points (x1, y1), (x2, y2), ..., (xN, yN) representing a polygon. You can assume these points are given in order; that is, you can construct the polygon by connecting point 1 to point 2, point 2 to point 3, and so on, finally looping around to connect point N to point 1.

// Determine if a new point p lies inside this polygon. (If p is on the boundary of the polygon, you should return False).

// this is not something i know how to do at all. indeed, i've used turf js for this very reason, so let's look at the ol' hivemind to see if they know something

// type Point = [number, number];

type Point = [number, number];

const pointDoesIntersect = (
  xI: number,
  yI: number,
  xJ: number,
  yJ: number,
  lat: number,
  long: number
): boolean =>
  yI > long !== yJ > long && lat < ((xJ - xI) * (long - yI)) / (yJ - yI) + xI;

const isPointInPolygon = (
  lat: number,
  long: number,
  polygon: Point[]
): boolean => {
  if (
    typeof lat !== "number" ||
    typeof long !== "number" ||
    lat === NaN ||
    long === NaN
  )
    throw new TypeError("Invalid latitude or longitude. Numbers are expected");
  else if (!polygon || !Array.isArray(polygon))
    throw new TypeError("Invalid polygon. Array with locations expected");
  else if (!polygon.length)
    throw new TypeError("Invalid polygon. Non-empty Array expected");
  else {
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++)
      if (
        pointDoesIntersect(
          polygon[i][0],
          polygon[i][1],
          polygon[j][0],
          polygon[j][1],
          lat,
          long
        )
      )
        return true;

    return false;
  }
};

// log(
//   isPointInPolygon(5, 5, [
//     [1, 1],
//     [10, 1],
//     [10, 10],
//     [1, 10],
//   ])
// );

//#endregion

//#region academic h index

// In academia, the h-index is a metric used to calculate the impact of a researcher's papers. It is calculated as follows:

// A researcher has index h if at least h of her N papers have h citations each. If there are multiple h satisfying this formula, the maximum is chosen.

// For example, suppose N = 5, and the respective citations of each paper are [4, 3, 0, 1, 5]. Then the h-index would be 3, since the researcher has 3 papers with at least 3 citations.

// Given a list of paper citations of a researcher, calculate their h-index.

//#region incorrect approach

// const hIndex = (papers: number[]): number | any => {
//   const counter: { [num: number]: number } = {};

//   for (let i = 0; i < papers.length; ++i) {
//     const cite: number = papers[i];

//     for (let j = 0; j < papers.length; ++j) {
//       const cur: number = papers[j];

//       log(cur, cite);
//       if (cite <= cur) counter[cite] = ++counter[cite] || 1;
//     }
//   }

//   log(counter);
// };

// const hIndex = (papers: number[]): number | any => {
//   const counter: { [num: number]: number } = {};

//   for (let i = 0; i < papers.length; ++i) {
//     const cite: number = papers[i];
//     counter[cite] = 1;

//     for (let j = 0; j < papers.length; ++j) {
//       const cur: number = papers[j];

//       log(cur, cite);
//       if (cite < cur) ++counter[cite];
//     }
//   }

//   log(counter);
// };

//#endregion
// how many elements are greater than or equal to the value of that element in the list
// does length minus index equal current element

const hIndex = (p: number[]): number | null => {
  p.sort(asc);

  for (let i = p.length - 1; i >= 0; --i) if (p.length - i >= p[i]) return p[i];

  return null;
};

// log(hIndex([4, 3, 0, 1, 5]));

//#endregion

//#region simple addition, but for some reason it's listed as hard

// You are given an array of length 24, where each element represents the number of new subscribers during the corresponding hour. Implement a data structure that efficiently supports the following:

// update(hour: int, value: int): Increment the element at index hour by value.
// query(start: int, end: int): Retrieve the number of subscribers that have signed up between start and end (inclusive).
// You can assume that all values get cleared at the end of the day, and that you will not be asked for start and end values that wrap around midnight.

// class TwentyFour {
//   private data: number[] = [];

//   private isValidHour(hour: number): boolean {
//     return hour >= 1 && hour <= 24;
//   }

//   public update(hour: number, value: number): this {
//     if (isInteger(value) && isInteger(hour) && this.isValidHour(hour))
//       this.data[hour - 1] += value;

//     return this;
//   }

//   public query(start: number, end: number): number {
//     let total: number = 0;

//     if (
//       isInteger(start) &&
//       isInteger(end) &&
//       this.isValidHour(start) &&
//       this.isValidHour(end)
//     )
//       for (let i = start - 1; i < end; ++i) total += this.data[i];

//     return total;
//   }

//   constructor() {
//     for (let i = 0; i < 24; ++i) this.data.push(0);
//   }
// }

class TwentyFour {
  private data: number[] = new Array(24).fill(0);

  private isValidHour(hour: number): boolean {
    return isInteger(hour) && hour >= 1 && hour <= 24;
  }

  public update(hour: number, value: number): this {
    if (isInteger(value) && this.isValidHour(hour))
      this.data[hour - 1] += value;

    return this;
  }

  public query(start: number, end: number): number {
    let total: number = 0;

    if (this.isValidHour(start) && this.isValidHour(end))
      for (let i = start - 1; i < end; ++i) total += this.data[i];

    return total;
  }
}

// const bluh = new TwentyFour();

// bluh.update(5, 58).update(3, 12).update(5.5, 15).update(4, 5);

// log(bluh);
// log(bluh.query(3, 5));

//#endregion

//#region word circle

// Given a list of words, determine whether the words can be chained to form a circle. A word X can be placed in front of another word Y in a circle if the last character of X is same as the first character of Y.

// For example, the words ['chair', 'height', 'racket', touch', 'tunic'] can form the following circle: chair --> racket --> touch --> height --> tunic --> chair.

const canFormCircle = (w: string[]): boolean => {
  for (let i = 0; i < w.length - 1; ++i) {
    const [cur, nxt]: number[] = [i, i + 1]

    if (w[cur][w[cur].length - 1] !== w[nxt][0] || (nxt === w.length - 1 && w[nxt][w[nxt].length - 1] !== w[0][0])) return false
  }
  return true
}

const canWordsMakeCircle = (w: string[]): boolean => {
  const perms: string[][] = permutations(w)

  for (const perm of perms) if (canFormCircle(perm)) return true

  return false
}


// log(canWordsMakeCircle(['chair', 'racket', 'touch', 'height', 'tunic']))
// log(canWordsMakeCircle(['chair', 'height', 'racket', 'touch', 'tunic']))

//rarrargh! permutations, my old enemy
//#endregion

//#region word zig zag

// Given a string and a number of lines k, print the string in zigzag form. In zigzag, characters are printed out diagonally from top left to bottom right until reaching the kth line, then back up to top right, and so on.

// For example, given the sentence "thisisazigzag" and k = 4, you should print:

// t     a     g
//  h   s z   a
//   i i   i z
//    s     g

const zigZag = (s: string, k: number): string => {
  const mat: string[][] = new Array(k).fill(null).map(() => new Array(s.length).fill(' '))

  for (let i = 0, j = 0, inc = true; i < s.length; ++i) {
    mat[j][i] = s[i]

    inc ? ++j : --j

    if (j === k - 1 || j === 0) inc = !inc
  }

  return mat.map(s => s.join('')).join('\n')
}

// log(zigZag('thisisazigzag', 6))

//#endregion

//#region

// Create a basic sentence checker that takes in a stream of characters and determines whether they form valid sentences. If a sentence is valid, the program should print it out.

// We can consider a sentence valid if it conforms to the following rules:

// The sentence must start with a capital letter, followed by a lowercase letter or a space.
// All other characters must be lowercase letters, separators (,,;,:) or terminal marks (.,?,!,‽).
// There must be a single space between each word.
// The sentence must end with a terminal mark immediately following a word.

const isCap = (char: string): boolean => /[A-Z]/.test(char)
const isLow = (char: string): boolean => /[a-z]/.test(char)
const isTerminal = (char: string): boolean => /[\. | ? | ! | ‽]/.test(char)
const isSeperator = (char: string): boolean => /[, | ; | :]/.test(char)
const isValidChar = (char: string): boolean => isLow(char) || isSeperator(char) || isTerminal(char)
const isSpacingValid = (word: string): boolean => word && word[0] !== " " && word[word.length - 1] !== " "

const printIfValidSentence = (word: string): void => isCap(word[0]) && word.slice(1).split('').every(isValidChar) && word.split(" ").every(isSpacingValid) && word[word.length - 2] !== " " && isTerminal(word[word.length - 1]) && log(word)


printIfValidSentence('Howdy there!')

//#endregion



//#region

//#endregion