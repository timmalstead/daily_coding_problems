// @ts-ignore
const { log } = console;
// @ts-ignore
const { abs, max, min } = Math;

//#region senSplit

// Given a string s and an integer k, break up the string into multiple lines such that each line has a length of k or less and return as a list. You must break it up so that words don't break across lines. Each line has to have the maximum possible amount of words. If there's no way to break the text up, then return null.

// You can assume that there are no spaces at the ends of the string and that there is exactly one space between each word.

// For example, given the string "the quick brown fox jumps over the lazy dog" and k = 10, you should return: ["the quick", "brown fox", "jumps over", "the lazy", "dog"]. No string in the list has a length of more than 10.

// const sen: string = "the quick brown fox jumps over the lazy dog shirtz"
// const len: number = 10
// const sp: string = " "

// const isSpace = (char: string): boolean => char === sp

// const senSplit = (sen: string, len: number): string[] | null => {
//   let final: string[] = []
//   let [i, lastSpace]: number[] = [0, 0]

//   while (sen) {
//     const [cur, nxt]: string[] = [sen[i], sen[i + 1]]

//     if (!nxt) {
//       if (sen.length > len) final = [...final, ...sen.split(sp)]
//       else final.push(sen)

//       sen = ""
//     } else if (i === len) {
//       let pushNum: number, sliceNum: number

//       if (isSpace(cur)) {
//         pushNum = i
//         sliceNum = i + 1
//       } else if (!isSpace(cur) && isSpace(nxt)) {
//         pushNum = i + 1
//         sliceNum = i + 2
//       } else {
//         pushNum = lastSpace
//         sliceNum = lastSpace + 1
//       }
//       final.push(sen.slice(0, pushNum))
//       sen = sen.slice(sliceNum)

//       i = 0
//       lastSpace = 0
//     } else {
//       if (isSpace(cur)) lastSpace = i
//       ++i
//     }
//   }

//   return final.length ? final : null
// }

// senSplit(sen, len).forEach((ele) => log(ele))

//#endregion

//#region findUnsortedIndex

// A sorted array of integers has been rotated an unknown number of times.
// Given such an array, and a target integer, find the index of the target in the array in faster than linear time.
// If the element doesn't exist in the array, return null.

// For example, given the array [13, 18, 25, 2, 8, 10] and the target 8, return 4 (the index of 8 in the array).
// You can assume all the integers in the array are unique.

let iter: number = 0;
const findUnsortedIndex = (arr: number[], target: number): number | null => {
  const { length } = arr;

  for (let i = 0; i <= Math.floor(length / 2); ++i) {
    ++iter;
    const mirrorIndex = length - 1 - i;
    const [current, mirror]: number[] = [arr[i], arr[mirrorIndex]];

    if (current === target) return i;
    else if (mirror === target) return mirrorIndex;
  }

  return null;
};

// log(`Index: ${findUnsortedIndex([13, 18, 25, 4, 5, 10, 0], 8)}`)
// log(`Iterations: ${iter}`)

//#endregion

//#region twoSubArrsSameSum

// Given a multiset of integers, return whether it can be partitioned into two subsets whose sums are the same.

// For example, given the multiset [15, 5, 20, 10, 35, 15, 10], it would return true, since we can split it up into {15, 5, 10, 15, 10} and {20, 35}, which both add up to 55.

// Given the multiset [15, 5, 20, 10, 35], it would return false, since we can't split it up into two subsets that add up to the same sum.

const twoSubArrsSameSum = (arr: number[]): boolean => {
  let doTwoSubArrsAddUpToTheSameSum: boolean = false;

  const len: number = arr.length;
  const powers: number = 2 ** len;

  for (let i = 1; i < powers; ++i) {
    const positiveSet: number[] = [];
    const negativeSet: number[] = [];

    const binString: string = i.toString(2).padStart(len, "0");

    for (let j = 0; j < len; ++j) {
      if (binString[j] === "1") positiveSet.push(arr[j]);
      else negativeSet.push(arr[j]);
    }

    const posSum: number = positiveSet.reduce((sum, num) => sum + num, 0);
    const negSum: number = negativeSet.reduce((sum, num) => sum + num, 0);

    if (posSum === negSum) {
      doTwoSubArrsAddUpToTheSameSum = true;
      break;
    }
  }

  return doTwoSubArrsAddUpToTheSameSum;
};

// log(twoSubArrsSameSum([15, 5, 20, 10, 35, 15, 10]))

//#endregion

//#region integer exponents

// Implement integer exponentiation. That is, implement the pow(x, y) function, where x and y are integers and returns x^y.

// Do this faster than the naive method of repeated multiplication.

const power = (base: number, exp: number): number => {
  if (base === 0) return 0;

  if (exp === 0) return 1;
  else if (exp % 2 === 0) return base * base * power(base, exp / 2);
  else return base * base * power(base, exp - 1);
};

// log(power(2, 10))

//#endregion

//#region number of moves

// There is an N by M matrix of zeroes. Given N and M, write a function to count the number of ways of starting at the top-left corner and getting to the bottom-right corner. You can only move right or down.

// For example, given a 2 by 2 matrix, you should return 2, since there are two ways to get to the bottom-right:

// Right, then down
// Down, then right
// Given a 5 by 5 matrix, there are 70 ways to get to the bottom-right.

// const numberOfPaths = (m: number, n: number): number => {
//   // We have to calculate m+n-2 C n-1 here
//   // which will be (m+n-2)! / (n-1)! (m-1)!
//   let path: number = 1
//   for (let i = n; i < m + n - 1; i++) {
//     path *= i
//     path /= i - n + 1
//   }
//   return path
// }

// const numberOfPaths = (row: number, col: number): number => {
//   let paths: number = 1

//   const gridSize: number = row - 1 + col - 1

//   // iterate from number of colums to total gridsize
//   for (let i = col; i <= gridSize; ++i) {
//     // paths = (paths * i) / (i - col + 1)

//     // multiply number of paths by current col
//     paths *= i
//     // divide number of paths by current col minus total columns + 1
//     paths /= i - col + 1
//   }

//   return paths
// }

const numberOfPaths = (row: number, col: number): number => {
  let paths: number = 1;

  for (let i = col; i <= row - 1 + col - 1; ++i)
    paths = (paths * i) / (i - col + 1);

  return paths;
};

// log(numberOfPaths(5, 5))

//#endregion

//#region targetWord2DMatrix

// Given a 2D matrix of characters and a target word, write a function that returns whether the word can be found in the matrix by going left-to-right, or up-to-down.

// For example, given the following matrix:

// [['F', 'A', 'C', 'I'],
//  ['O', 'B', 'Q', 'P'],
//  ['A', 'N', 'O', 'B'],
//  ['M', 'A', 'S', 'S']]
// and the target word 'FOAM', you should return true, since it's the leftmost column. Similarly, given the target word 'MASS', you should return true, since it's the last row.

//#region
// const findWordInMatrix = (arr: string[][], target: string): boolean => {
//   let isWordInMatrix: boolean = false

//   const arrStr: string = arr.flat(1).join("")

//   if (arrStr.includes(target)) isWordInMatrix = true
//   else {
//     let curWord: string = ""
//     let [i, j]: number[] = [0, 0]

//     const len: number = target.length

//     while (j < len) {
//       curWord += arrStr[i]

//       if (curWord === target) {
//         isWordInMatrix = true
//         break
//       }

//       i += len

//       if (i > arrStr.length) i = ++j
//     }
//   }

//   return isWordInMatrix
// }
//#endregion
//#region
// const findWordInMatrix = (arr: string[][], target: string): boolean => {
//   let isWordInMatrix: boolean = false

//   const arrStr: string = arr.flat(1).join("")

//   let curWord: string = ""
//   let [i, j]: number[] = [0, 0]

//   const len: number = target.length

//   while (j < len) {
//     curWord += arrStr[i]

//     if (curWord === target || (!j && arrStr.slice(i, i + len) === target)) {
//       isWordInMatrix = true
//       break
//     }

//     i += len

//     if (i > arrStr.length) {
//       i = ++j
//       curWord = ""
//     }
//   }

//   return isWordInMatrix
// }
//#endregion
//#region
// const findWordInMatrix = (arr: string[][], target: string): boolean => {
//   let isWordInMatrix: boolean = false
//   let curWord: string = ""
//   let [i, j]: number[] = [0, 0]

//   const len: number = target.length

//   while (j < len) {
//     curWord += arr[i][j]

//     if (curWord === target || (!j && arr[i].join("") === target)) {
//       isWordInMatrix = true
//       break
//     }
//     ++i

//     if (i === len) {
//       i = 0
//       ++j
//       curWord = ""
//     }
//   }

//   return isWordInMatrix
// }
//#endregion

const findWordInMatrix = (matrix: string[][], target: string): boolean => {
  let [i, j, word]: [number, number, string] = [0, 0, ""];

  const arr: string[] = matrix.map((arr) => arr.join(""));

  while (j < arr[0].length) {
    word += arr[i][j];

    if (
      (word.length >= target.length && word.includes(target)) ||
      (!j && arr[i].includes(target))
    )
      return true;
    else {
      ++i;

      if (i === arr.length) {
        i = 0;
        ++j;
        word = "";
      }
    }
  }

  return false;
};

// I think this will be my final answer. This assumes that all the arrays of strings are the same length

const matrix: string[][] = [
  ["F", "A", "F", "I"],
  ["O", "B", "O", "P"],
  ["A", "N", "A", "B"],
  ["M", "A", "S", "S"],
  ["T", "R", "U", "E"],
];

// ;["FOAS", "ASS", "ABNA", "BO", "ASU", "OP", "SE", "FI", "OM"].forEach(
//   (word: string): void => log(findWordInMatrix(matrix, word))
// )

//#endregion

//#region two sums!
// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.

// Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?

const twoSum = (nums: number[], target: number): number[] => {
  const indexes: { [number: string]: number } = nums.reduce((obj, num, i) => {
    obj[num] = i;
    return obj;
  }, {});

  for (let i = 0; i < nums.length; ++i)
    if (indexes[target - nums[i]] && i !== indexes[target - nums[i]])
      return [i, indexes[target - nums[i]]];

  return [];
};

// const twoSum = (nums: number[], target: number): number[] => {
//   const indexes: { [number: string]: number } = {}
//   for (let i = 0; i < nums.length; ++i) indexes[nums[i]] = i

//   for (let i = 0; i < nums.length; ++i) {
//     if (indexes[target - nums[i]] && i !== indexes[target - nums[i]])
//       return [i, indexes[target - nums[i]]]
//   }
// }

const nums: number[] = [3, 2, 4];
const target: number = 6;

// log(twoSum(nums, target))
//#endregion

//#region longest common prefix

// Write a function to find the longest common prefix string amongst an array of strings.

// If there is no common prefix, return an empty string ""

// const longestCommonPrefix = (arr: string[]): string => {
//   const { length } = arr

//   if (!length) return ""
//   if (length === 1) return arr[0]

//   arr.sort()

//   const smallestLen: number = Math.min(arr[0].length, arr[length - 1].length)

//   let i: number = 0
//   while (i < smallestLen && arr[0][i] === arr[length - 1][i]) ++i

//   const prefix: string = arr[0].slice(0, i)

//   return prefix
// }

const longestCommonPrefix = (arr: string[]): string => {
  const { length } = arr;

  if (!length) return "";
  else if (length === 1) return arr[0];
  else {
    arr.sort();

    const [first, last]: string[] = [arr[0], arr[length - 1]];

    let prefix: string = "";
    for (let i = 0; i < Math.min(first.length, last.length); ++i) {
      if (first[i] === last[i]) prefix += first[i];
      else break;
    }

    return prefix;
  }
};

// log(longestCommonPrefix(["flaower", "fla", "flaoaaht", "flaht"]))
//#endregion

//#region spiral

// Given a N by M matrix of numbers, print out the matrix in a clockwise spiral.

// For example, given the following matrix:

// [[1,  2,  3,  4,  5],
//  [6,  7,  8,  9,  10],
//  [11, 12, 13, 14, 15],
//  [16, 17, 18, 19, 20]]
// You should print out the following:

//#region

// 0 0, 0 1, 0 2, 0 3, 0 4, ---- += 0 += 1
// 1 4, 2 4, 3 4, ---- += 1 += 0
// 3 3, 3 2, 3 1, 3 0, ---- += 0 += -1
// 2 0, 1 0, ---- += -1 += 0
// 1 1, 1 2, 1 3, ---- += 0 += 1
// 2 3, ---- += 1 += 0
// 2 2, 2 1 += 0 += -1

// 1
// 2
// 3
// 4
// 5
// 10
// 15
// 20
// 19
// 18
// 17
// 16
// 11
// 6
// 7
// 8
// 9
// 14
// 13
// 12

// const spiral = (matrix: number[][]): void => {
//   const len: number = matrix.flat(1).length
//   const directions: any[][] = [
//     [-1, 0, "up"],
//     [0, -1, "left"],
//     [1, 0, "down"],
//     [0, 1, "right"],
//   ]

//   let curDir: number[] = directions.pop()
//   let [i, j]: number[] = [0, 0]

//   for (let iter = 0; iter < len; ++iter) {
//     let curRow: number[] = matrix[i]
//     if (curRow === undefined) i -= curDir[0]

//     let cur: number | undefined = matrix[i][j]

//     if (cur === undefined) {
//       if (matrix[i] === undefined) i -= curDir[0]
//       j -= curDir[1]

//       // cur = matrix[i][j]

//       directions.unshift(curDir)
//       curDir = directions.pop()

//       i += curDir[0]
//       j += curDir[1]

//       cur = matrix[i][j]
//       log(matrix[i])

//       // log(cur)

//       delete matrix[i][j]

//       i += curDir[0]
//       j += curDir[1]
//     } else {
//       // log(cur)

//       delete matrix[i][j]

//       i += curDir[0]
//       j += curDir[1]
//     }
//   }
// }

// const spiral = (matrix: number[][]): void => {
//   const len: number = matrix.flat(1).length

//   const arrDirections: number[] = [-1, 0, 1, 0]
//   const iDirections: number[] = [0, -1, 0, 1]

//   let arrDir: number = arrDirections.pop()
//   let iDir: number = iDirections.pop()

//   let [arr, i]: number[] = [0, 0]

//   const incr = (): void => {
//     i += iDir
//     arr += arrDir
//   }

//   for (let iter = 0; iter < len; ++iter) {
//     if (!matrix[arr] || matrix[arr][i] === undefined) {
//       i -= iDir
//       arr -= arrDir
//       arrDirections.unshift(arrDir)
//       arrDir = arrDirections.pop()
//       iDirections.unshift(iDir)
//       iDir = iDirections.pop()
//       incr()
//     }

//     log(matrix[arr][i])
//     matrix[arr][i] = undefined

//     incr()
//   }
// }

// // data type to describe each move and its information
// interface Direction {
//   dir: string
//   arr: number
//   idx: number
// }

// // func to list index values in a spiral
// const spiral = (matrix: any[][]): void => {
//   // value to keep track of current row and current indice
//   let [arr, idx]: number[] = [0, 0]

//   // increment row and indice value for targeting
//   const increment = (): void => {
//     arr += curDirection.arr
//     idx += curDirection.idx
//   }

//   // array of directions, in order of execution, in a stack to be repeated as many times as neccesary
//   const directions: Direction[] = [
//     { dir: "\u25b2", arr: -1, idx: 0 }, // up
//     { dir: "\u276e", arr: 0, idx: -1 }, // left
//     { dir: "\u25bc", arr: 1, idx: 0 }, // down
//     { dir: "\u276f", arr: 0, idx: 1 }, // right
//   ]

//   // direction to execute, popped off stack and ready to be used
//   let curDirection: Direction = directions.pop()

//   // a loop, that will be executed as many times as there are values in the flattened matrix
//   for (let iter = 0; iter < matrix.flat(1).length; ++iter) {
//     // if the row or indice are undefined execute following block
//     if (matrix[arr] === undefined || matrix[arr][idx] === undefined) {
//       // reverse the last direction command
//       arr -= curDirection.arr
//       idx -= curDirection.idx

//       // stash now invalid command in bottom of stack
//       directions.unshift(curDirection)
//       // pop new direction to execute off top of stack
//       curDirection = directions.pop()

//       increment()
//     }

//     // log currently targeted direction and element
//     log(curDirection.dir, matrix[arr][idx])

//     // change targeted element to undefined. for some reason i've yet to grasp this only works when changing it to undefined
//     matrix[arr][idx] = undefined

//     increment()
//   }
// }

//#endregion

// interface Direction {
//   dir: string
//   arr: number
//   idx: number
// }

// const spiral = (matrix: any[][]): void => {
//   let [arr, idx]: number[] = [0, 0]

//   const increment = (): void => {
//     arr += directions[d].arr
//     idx += directions[d].idx
//   }

//   const directions: Direction[] = [
//     { dir: "\u25b2", arr: -1, idx: 0 }, // up
//     { dir: "\u276e", arr: 0, idx: -1 }, // left
//     { dir: "\u25bc", arr: 1, idx: 0 }, // down
//     { dir: "\u276f", arr: 0, idx: 1 }, // right
//   ]
//   const d: number = directions.length - 1

//   for (let iter = 0; iter < matrix.flat(1).length; ++iter) {
//     if (matrix[arr] === undefined || matrix[arr][idx] === undefined) {
//       arr -= directions[d].arr
//       idx -= directions[d].idx

//       directions.unshift(directions.pop())
//       increment()
//     }

//     log(directions[d].dir, matrix[arr][idx])

//     matrix[arr][idx] = undefined

//     increment()
//   }
// }

// spiral([
//   ["M", "W", " ", ".", "m"],
//   ["y", "h", "p", "u", "i"],
//   [" ", "a", "?", " ", "T"],
//   ["n", "t", "'", "s", " "],
//   ["a", "m", "e", "'", "s"],
// ])

// spiral([
//   [1, 16, 15, 14, 13],
//   [2, 17, 24, 23, 12],
//   [3, 18, 25, 22, 11],
//   [4, 19, 20, 21, 10],
//   [5, 6, 7, 8, 9],
// ])

// spiral([
//   ["s", "s", "s", "s", "s"],
//   ["r", "a", "a", "a", "p"],
//   ["r", ".", ".", "l", "p"],
//   ["r", "s", "s", "l", "p"],
//   ["i", "i", "i", "i", "p"],
// ])

//#endregion

//#region traverse matrix

interface Direction {
  dir: string;
  arr: number;
  idx: number;
}

interface StartingPosition {
  y: number;
  x: number;
}

//#region
// const traverseMatrix = (matrix: any[][], directions: Direction[]): void => {
//   let [arr, idx]: number[] = [0, 0]

//   const increment = (): void => {
//     arr += directions[d].arr
//     idx += directions[d].idx
//   }

//   const d: number = directions.length - 1

//   for (let iter = 0; iter < matrix.flat(1).length; ++iter) {
//     if (matrix[arr] === undefined || matrix[arr][idx] === undefined) {
//       arr -= directions[d].arr
//       idx -= directions[d].idx

//       directions.unshift(directions.pop())
//       increment()
//       // directions.unshift(directions.pop()) needed for side to side
//     }

//     log(directions[d].dir, matrix[arr][idx])

//     matrix[arr][idx] = undefined

//     increment()
//   }
// }

//#endregion

const traverseMatrix = (
  matrix: any[][],
  directions: Direction[],
  start?: StartingPosition,
  len?: number
): void => {
  let y: number, x: number;
  if (start) {
    y = start.y;
    x = start.x;
  }

  let [arr, idx]: number[] = [y || 0, x || 0];

  const increment = (): void => {
    arr += directions[d].arr;
    idx += directions[d].idx;
  };

  const d: number = directions.length - 1;

  for (let iter = 0; iter < len || matrix.flat(1).length; ++iter) {
    if (matrix[arr] === undefined || matrix[arr][idx] === undefined) {
      arr -= directions[d].arr;
      idx -= directions[d].idx;

      directions.unshift(directions.pop());
      increment();

      log(matrix[arr][idx]);
      // directions.unshift(directions.pop()) // needed for side to side

      if (matrix[arr][idx] === 11) break;
    }

    log(directions[d].dir, matrix[arr][idx]);

    matrix[arr][idx] = undefined;

    increment();
  }
};

const u: Direction = { dir: "\u25b2", arr: -1, idx: 0 }; // up
const l: Direction = { dir: "\u276e", arr: 0, idx: -1 }; // left
const d: Direction = { dir: "\u25bc", arr: 1, idx: 0 }; // down
const r: Direction = { dir: "\u276f", arr: 0, idx: 1 }; // right
const ur: Direction = { dir: "dia", arr: -1, idx: 1 };

// side to side
// traverseMatrix(
//   [
//     [1, 2, 3, 4, 5],
//     [10, 9, 8, 7, 6],
//     [11, 12, 13, 14, 15],
//     [20, 19, 18, 17, 16],
//     [21, 22, 23, 24, 25],
//   ],
//   [d, l, d, r]
// )

// down then up
// traverseMatrix(
//   [
//     [1, 10, 11, 20, 21],
//     [2, 9, 12, 19, 22],
//     [3, 8, 13, 18, 23],
//     [4, 7, 14, 17, 24],
//     [5, 6, 15, 16, 25],
//   ],
//   [r, u, r, d]
// )

// side to side from upper right corner
// traverseMatrix(
//   [
//     [5, 4, 3, 2, 1],
//     [6, 7, 8, 9, 10],
//     [15, 14, 13, 12, 11],
//     [16, 17, 18, 19, 20],
//     [25, 24, 23, 22, 21],
//   ],
//   [d, r, d, l],
//   { y: 0, x: 4 }
// )

// traverseMatrix(
//   [
//     [21, 22, 23, 24, 25],
//     [20, 19, 18, 17, 16],
//     [11, 12, 13, 14, 15],
//     [10, 9, 8, 7, 6],
//     [1, 2, 3, 4, 5],
//   ],
//   [u, l, u, r],
//   { y: 4, x: 0 }
// )

// diagonal spiral
// traverseMatrix(
//   [
//     [9, 8, 7, 6, 5],
//     [10, 15, 14, 4, 0],
//     [11, 13, 3, 0, 0],
//     [12, 2, 0, 0, 0],
//     [1, 0, 0, 0, 0],
//   ],
//   [d, l, ur],
//   { y: 4, x: 0 },
//   15
// )

//#endregion

//#region valid parentheses

// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.

// Open brackets must be closed in the correct order.

const isValid = (s: string): boolean => {
  if (s.length % 2 !== 0) return false;

  const brackets: { [bracket: string]: string } = {
    "}": "{",
    "]": "[",
    ")": "(",
  };

  const stack: string[] = [];
  const startingBrackets: Set<string> = new Set<string>(
    Object.values(brackets)
  );

  for (const char of s) {
    if (startingBrackets.has(char)) stack.push(char);
    else if (!stack.length || stack.pop() !== brackets[char]) return false;
  }

  return stack.length === 0;
};

// log(isValid("{[]}[]"))
//#endregion

//#region length of last word

// Given a string s consisting of some words separated by some number of spaces, return the length of the last word in the string.

// A word is a maximal substring consisting of non-space characters only.

// const lengthOfLastWord = (s: string): number =>
//   s.trimRight().split(/\s+/).pop().length

const lengthOfLastWord = (s: string): number => {
  const trim: string = s.trimRight();
  const lastIdx: number = trim.length - 1;

  for (let i = lastIdx; i >= 0; --i) if (trim[i] === " ") return lastIdx - i;

  return trim.length;
};

// log(lengthOfLastWord("  Snax of th e     World     "))
// log(lengthOfLastWord("     "))

//#endregion

//#region find disappeared numbers

// function findDisappearedNumbers(nums: number[]): number[] {}

const findDisappearedNumbers = (nums: number[]): number[] => {
  let missingInts: number[] = [];

  if (nums.length) {
    const sortNums: number[] = [...new Set(nums)].sort(
      (a: number, b: number) => a - b
    );

    const [first, last]: number[] = [
      sortNums[0],
      sortNums[sortNums.length - 1],
    ];

    const checkNums: number[] = [];
    for (let i = first; i <= last; ++i) checkNums.push(i);

    const diff: number[] = checkNums.filter((num) => !sortNums.includes(num));

    if (diff.length) missingInts = diff;
    else missingInts.push(last + 1);
  } else missingInts.push(1);

  return missingInts;
};

// log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]))
//#endregion

//#region missing number, easier version of above

const missingNumber = (inputNums: number[]): number => {
  let missingInt: number;

  if (inputNums.length) {
    const posNums: number[] = [...new Set(inputNums)]
      .filter((num: number) => num > 0)
      .sort((a: number, b: number) => a - b);

    const lastNum: number = posNums[posNums.length - 1];

    const checkNums: number[] = [];
    for (let i = 1; i <= lastNum; i++) checkNums.push(i);

    for (let i = 0; i < checkNums.length; i++) {
      const [currentNum, checkNum]: number[] = [posNums[i], checkNums[i]];

      if (currentNum !== checkNum) {
        missingInt = checkNum;
        break;
      }
    }

    if (!missingInt) missingInt = lastNum + 1;
  } else missingInt = 1;

  return missingInt;
};

//#endregion

//#region chess board i confess board

// This problem was asked by Google.

// On our special chessboard, two bishops attack each other if they share the same diagonal. This includes bishops that have another bishop located between them, i.e. bishops can attack through pieces.

// You are given N bishops, represented as (row, column) tuples on a M by M chessboard. Write a function to count the number of pairs of bishops that attack each other. The ordering of the pair doesn't matter: (1, 2) is considered the same as (2, 1).

// For example, given M = 5 and the list of bishops:

// (0, 0)
// (1, 2)
// (2, 2)
// (4, 0)
// The board would look like this:

// [b 0 0 0 0]
// [0 0 b 0 0]
// [0 0 b 0 0]
// [0 0 0 0 0]
// [b 0 0 0 0]
// You should return 2, since bishops 1 and 3 attack each other, as well as bishops 3 and 4.

const battlingBishops = () => {};

//#endregion

//#region multiply last three

// Given a list of integers, return the largest product that can be made by multiplying any three integers.

// For example, if the list is [-10, -10, 5, 2], we should return 500, since that's -10 * -10 * 5.

// You can assume the list has at least three integers.

const multiplyThreeInts = (ints: number[]): number =>
  ints
    .sort((a, b) => abs(a) - abs(b))
    .slice(ints.length - 3)
    .reduce((total, int) => int * total);

const ints: number[] = [-10, -10, 5, 2];

// log(multiplyThreeInts(ints))

//#endregion

//#region perfect number

// A number is considered perfect if its digits sum up to exactly 10.

// Given a positive integer n, return the n-th perfect number.

// For example, given 1, you should return 19. Given 2, you should return 28.

// worth saying that this does not seem to be the generally accepted definition of a perfect number

// const perfNum = (num: number): number => {
//   let i: number = num

//   while (true) {
//     const remainder: number = i % 10
//     if (remainder + num === 10) return +`${num}${remainder}`
//     else i++
//   }
// }

const sumDigits = (num: number): number =>
  num
    .toString()
    .split("")
    .reduce((sum, num) => +sum + +num, 0);

const perfNum = (num: number): number => (num + 1) * 9 + 1;

function toss_biased() {
  return Math.random() < 0.7;
}
// average toss_biased() 100 times => 70%
// return toss_biased() != toss_biased()

// 19, 28, 37, 46, 55, 64, 73, 82, 91 = diff 9 (9 total)
// at 100, add 9 (repeats at every 100)
// 109, 118, 127, 136, 145, 154, 163, 172, 181, 190 = add 2 (10+9+8+7+6+5+4+3+2)
// 208, 217, 226, 235, 244, 253, 262, 271, 280 = add 3
// 307, 316, 325, 334, 343, 352, 361, 370
// 901, 910 = add 10
// at 1000, add 90(+9) (repeats at every 1000)
// 1009, 1018 ..., 1900
// 2008 (add 108 = 99 + 9)
// 9100
// at 10000, add 900(+9)
// 10009
//
// const perfNum = (num: number): number => {
//   let nthPerfNum: number = 9

//   for (let i = 0; i < num; i++) nthPerfNum = num * 9 + 1

//   return nthPerfNum
// }

function findNth(n) {
  let count = 0;

  for (let curr = 19; ; curr += 9) {
    // Find sum of digits in
    // current no.
    let sum = 0;
    for (let x = curr; x > 0; x = x / 10) sum = sum + (x % 10);

    // If sum is 10, we increment
    // count
    if (sum == 10) count++;

    // If count becomes n, we return
    // current number.
    if (count == n) return curr;
  }
  return -1;
}

// log(perfNum(10))
// log(findNth(10))

// i was not getting what this was asking me for a bit

//#endregion

//#region number of n in multiplication table

// Suppose you have a multiplication table that is N by N. That is, a 2D array where the value at the i-th row and j-th column is (i + 1) * (j + 1) (if 0-indexed) or i * j (if 1-indexed).

// Given integers N and X, write a function that returns the number of times X appears as a value in an N by N multiplication table.

// For example, given N = 6 and X = 12, you should return 4, since the multiplication table looks like this:

// | 1 | 2 | 3 | 4 | 5 | 6 |

// | 2 | 4 | 6 | 8 | 10 | 12 |

// | 3 | 6 | 9 | 12 | 15 | 18 |

// | 4 | 8 | 12 | 16 | 20 | 24 |

// | 5 | 10 | 15 | 20 | 25 | 30 |

// | 6 | 12 | 18 | 24 | 30 | 36 |

// And there are 4 12's in the table.

// const countNInMulTable = (n: number, target: number): number => {
//   let [tally, i, j, curBound]: number[] = [0, 1, 1, n]

//   while (i <= n * n) {
//     log(i)
//     if (i === target) ++tally

//     if (i === curBound) {
//       i = ++j
//       curBound = i * n
//     } else i += j
//   }
//   return tally
// }

// log("\n", countNInMulTable(6, 36))

const countNInMulTable = (n: number, target: number): number => {
  let [tally, bound, i, j]: number[] = [0, n, 1, 1];

  for (let k = 0; k < n * n; ++k) {
    if (i === target) ++tally;

    if (i === bound) {
      i = ++j;
      bound = i * n;
    } else i += j;
  }

  return tally;
};

// log(countNInMulTable(72, 12))

//#endregion

//#region longest increasing subsequence

// Given an array of numbers, find the length of the longest increasing subsequence in the array. The subsequence does not necessarily have to be contiguous.

// For example, given the array [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15], the longest increasing subsequence has length 6: it is 0, 2, 6, 9, 11, 15.

const increasingSubsequence = (arr: number[]): number => {
  const records: { [num: string]: number[] } = {};

  while (arr.length) {
    const cur: number = arr.shift();

    if (!records[cur]) records[cur] = [cur];

    Object.values(records).forEach(
      (val) => val[val.length - 1] < cur && val.push(cur)
    );
  }

  return Object.values(records)
    .sort((a, b) => a.length - b.length)
    .pop().length;
};

// log(
//   increasingSubsequence([1, 3, 4, 12, 2, 10, 6, 14, 9, 0, 5, 13, 8, 11, 7, 15])
// )

// I'm getting something, but I don't think that it is what this problem is actually asking for. I think this would be a Dynamic Programming problem. It's probably something I could check. But not tonight.

//#endregion

//#region columns ordered top to bottom lexigraphically

// This problem was asked by Google.

// You are given an N by M 2D matrix of lowercase letters. Determine the minimum number of columns that can be removed to ensure that each row is ordered from top to bottom lexicographically. That is, the letter at each column is lexicographically later as you go down each row. It does not matter whether each row itself is ordered lexicographically.

// For example, given the following table:

// cba
// daf
// ghi

// This is not ordered because of the a in the center. We can remove the second column to make it ordered:

// ca
// df
// gi
// So your function should return 1, since we only needed to remove 1 column.

// As another example, given the following table:

// abcdef
// Your function should return 0, since the rows are already ordered (there's only one row).

// As another example, given the following table:

// zyx
// wvu
// tsr
// Your function should return 3, since we would need to remove all the columns to order it.

const numOfColumnsToRemove = (mat: string[][]): number => {
  let [colsToRemove, colsProcessed, row, col]: number[] = [0, 0, 0, 0];

  const setNextColumn = (): void => {
    row = 0;
    ++col;
    ++colsProcessed;
  };

  for (let i = 0; i < mat.flat().length; ++i) {
    if (!mat[row + 1]) setNextColumn();
    else if (mat[row][col] > mat[row + 1][col]) {
      setNextColumn();
      ++colsToRemove;
    } else ++row;

    if (colsProcessed === mat[0].length) break;
  }

  return colsToRemove;
};

const colsOne: string[][] = [
  ["c", "b", "a"],
  ["d", "a", "f"],
  ["g", "h", "i"],
];

const colsTwo: string[][] = [["a", "b", "c", "d", "e", "f"]];

const colsThree: string[][] = [
  ["z", "u", "x"],
  ["w", "v", "u"],
  ["t", "s", "r"],
];

// log(numOfColumnsToRemove(colsOne))
// log(numOfColumnsToRemove(colsTwo))
// log(numOfColumnsToRemove(colsThree))

//#endregion

//#region overlapping intervals

// Given a list of possibly overlapping intervals, return a new list of intervals where all overlapping intervals have been merged.

// The input list is not necessarily ordered in any way.

// For example, given [[1, 3], [5, 8], [4, 10], [20, 25]], you should return [(1, 3), (4, 10), (20, 25)]

type Intervals = number[][];

const overlapIntervals = (inter: Intervals): Intervals => {
  const sortedByEnd: Intervals = [...inter].sort((a, b) => a[1] - b[1]);

  const finalIntervals: Intervals = [sortedByEnd.shift()];

  sortedByEnd.forEach((cur: number[]): void => {
    if (cur[0] >= finalIntervals[finalIntervals.length - 1][1])
      finalIntervals.push(cur);
    else
      finalIntervals.push([
        min(cur[0], finalIntervals[finalIntervals.length - 1][0]),
        max(cur[1], finalIntervals[finalIntervals.length - 1][1]),
      ]);
  });

  return finalIntervals;
};

// log(
//   overlapIntervals([
//     [1, 3],
//     [5, 8],
//     [4, 10],
//     [20, 25],
//   ])
// )

//#endregion

//#region make array non decreasing

// This problem was asked by Facebook.

// Given an array of integers, write a function to determine whether the array could become non-decreasing by modifying at most 1 element.

// For example, given the array [10, 5, 7], you should return true, since we can modify the 10 into a 1 to make the array non-decreasing.

// Given the array [10, 5, 1], you should return false, since we can't modify any one element to get a non-decreasing array.

const canArrBeMadeNonDecreasing = (arr: number[]): boolean => {
  let numOfChanges: number = 0;

  for (let i = 0; i < arr.length - 1; ++i) {
    if (numOfChanges > 1) break;
    else if (arr[i] > arr[i + 1]) ++numOfChanges;
  }

  return numOfChanges <= 1;
};

// log(canArrBeMadeNonDecreasing([10, 5, 7]))
// log(canArrBeMadeNonDecreasing([10, 5, 1]))

//#endregion

//#region CZI subdomain problem

// You are in charge of a display advertising program. Your ads are displayed on websites all over the internet. You have some CSV input data that counts how many times that users have clicked on an ad on each individual domain. Every line consists of a click count and a domain name, like this:

// counts = [ "900,google.com",
//      "60,mail.yahoo.com",
//      "10,mobile.sports.yahoo.com",
//      "40,sports.yahoo.com",
//      "300,yahoo.com",
//      "10,stackoverflow.com",
//      "20,overflow.com",
//      "5,com.com",
//      "2,en.wikipedia.org",
//      "1,m.wikipedia.org",
//      "1,mobile.sports",
//      "1,google.co.uk"]

// Write a function that takes this input as a parameter and returns a data structure containing the number of clicks that were recorded on each domain AND each subdomain under it. For example, a click on "mail.yahoo.com" counts toward the totals for "mail.yahoo.com", "yahoo.com", and "com". (Subdomains are added to the left of their parent domain. So "mail" and "mail.yahoo" are not valid domains. Note that "mobile.sports" appears as a separate domain near the bottom of the input.)

// Sample output (in any order/format):

// calculateClicksByDomain(counts) =>
// com:                     1345
// google.com:              900
// stackoverflow.com:       10
// overflow.com:            20
// yahoo.com:               410
// mail.yahoo.com:          60
// mobile.sports.yahoo.com: 10
// sports.yahoo.com:        50
// com.com:                 5
// org:                     3
// wikipedia.org:           3
// en.wikipedia.org:        2
// m.wikipedia.org:         1
// mobile.sports:           1
// sports:                  1
// uk:                      1
// co.uk:                   1
// google.co.uk:            1

// n: number of domains in the input
// (individual domains and subdomains have a constant upper length)

const counts = [
  "900,google.com",
  "60,mail.yahoo.com",
  "10,mobile.sports.yahoo.com",
  "40,sports.yahoo.com",
  "300,yahoo.com",
  "10,stackoverflow.com",
  "20,overflow.com",
  "5,com.com",
  "2,en.wikipedia.org",
  "1,m.wikipedia.org",
  "1,mobile.sports",
  "1,google.co.uk",
];

// const calculateClicksByDomain = (counts: string[]) => {
//   const counter: ClickCounter = {}

//   const countMap: [number, string][] = counts.map((str: string) => {
//     const splitString: string[] = str.split(",")

//     return [parseInt(splitString[0]), splitString[1]]
//   })

//   const subdomains = new Set<string>()

//   countMap.forEach(([_, str]) => {
//     const split = str.split(".")

//     for (let i = split.length - 1; i >= 0; --i)
//       subdomains.add(split.slice(i).join("."))
//   })

//   const subDomainArr: string[] = [...subdomains]

//   for (let i = 0; i < subDomainArr.length; ++i) {
//     const currentSubDomain: string = subDomainArr[i]

//     for (let j = 0; j < countMap.length; ++j) {
//       const [curNum, curBaseDomain]: [number, string] = [
//         countMap[j][0],
//         countMap[j][1],
//       ]

//       if (curBaseDomain.endsWith(currentSubDomain))
//         counter[currentSubDomain] = counter[currentSubDomain] + curNum || curNum
//     }
//   }

//   return counter
// }

// hash table data structure to store string keys and numerical values
interface ClickCounter {
  [domain: string]: number;
}

const calculateClicksByDomain = (counts: string[]): ClickCounter => {
  // final return value, used to hold final subdomain and final number of clicks
  const counter: ClickCounter = {};
  // helper array, used to transform strings from input into arrays of one number and one string
  const countArr: [number, string][] = [];
  // set used to hold complete list of subdomains before calculating total number of clicks
  const subdomains = new Set<string>();

  // we will loop through the array of strings and extract both numerical click information and the coplete list of domains and subdomains
  counts.forEach((str: string): void => {
    // split the string into a two element array at the comma
    const splitString: string[] = str.split(",");

    // the full domain will be the second element in the array
    const domain: string = splitString[1];

    // push an array consisting of the first element in splitString, coerced into a number, and the full domain
    countArr.push([+splitString[0], domain]);

    // split the full domain on the dots
    const split: string[] = domain.split(".");

    // iterate backwards through the domain array and add the subdomains to the set, which will filter out any duplicate strings
    for (let i = split.length - 1; i >= 0; --i)
      subdomains.add(split.slice(i).join("."));
  });

  // iterate through the set of subdomains
  subdomains.forEach((curSubDomain: string): void => {
    // for each subdomain we will iterate through the helper array of click counts and full domains
    for (let i = 0; i < countArr.length; ++i) {
      const [curNum, curBaseDomain]: [number, string] = [
        countArr[i][0],
        countArr[i][1],
      ];

      // if the full domain ends with the subdomain, one of two things will happen:
      // if a key with the current subdomain does not exist, it will be created with the value of the current number
      // if it does already exist, the current number will be added to its current value
      if (curBaseDomain.endsWith(curSubDomain))
        counter[curSubDomain] = counter[curSubDomain] + curNum || curNum;
    }
  });

  // return the full calculated hash table of domains, subdomains and click counts
  return counter;
};

// log(calculateClicksByDomain(counts))

// add time/space complexity, mention that i got it done in an additional hour

//#endregion

// #region all possible phone number combos

// Given a mapping of digits to letters (as in a phone number), and a digit string, return all possible letters the number could represent. You can assume each valid number in the mapping is a single digit.

// For example if {“2”: [“a”, “b”, “c”], 3: [“d”, “e”, “f”], …} then “23” should return [“ad”, “ae”, “af”, “bd”, “be”, “bf”, “cd”, “ce”, “cf"].

interface PhoneMapping {
  [number: string]: string[];
}

const phoneDigits: PhoneMapping = {
  2: ["a", "b", "c"],
  3: ["d", "e", "f"],
  4: ["g", "h", "i"],
  5: ["j", "k", "l"],
  6: ["m", "n", "o"],
  7: ["p", "q", "r", "s"],
  8: ["t", "u", "v"],
  9: ["w", "x", "y", "z"],
};

const phoneNumberCombos = (digits: string): string[] => {
  const letterCombos: string[] = [];

  if (digits) {
    let iterations: number = 1;
    let letters: string[] = [];

    for (const digit of digits) {
      const cur: string[] = phoneDigits[digit];

      iterations *= cur.length;
      letters = [...letters, ...cur];
    }

    const len: number = letters.length;
    for (let i = 1; i < iterations * len; ++i) {
      let letterCombo: string = "";

      const binString: string = i.toString(2).padStart(len, "0");

      for (let j = 0; j < len; ++j)
        if (binString[j] === "1") letterCombo += letters[j];

      letterCombos.push(letterCombo);
    }
  }

  return letterCombos;
};

// log(phoneNumberCombos("23"))
// log(phoneNumberCombos(""))

// #endregion

// #region find islands in the stream

// Given a matrix of 1s and 0s, return the number of "islands" in the matrix. A 1 represents land and 0 represents water, so an island is a group of 1s that are neighboring whose perimeter is surrounded only by water.

// For example, this matrix has 4 islands.

// 1 0 0 0 0
// 0 0 1 1 0
// 0 1 1 0 0
// 0 0 0 0 0
// 1 1 0 0 1
// 1 1 0 0 1

// const searchIslands = (row: number, col: number, matrix: number[][]): void => {
//   // checking to see if element is out of bounds or if it has been "explored"
//   if (!matrix[row] || !matrix[row][col]) return

//   // marking the current part as "explored"
//   matrix[row][col] = 0

//   // the exploring logic
//   // look all around the element
//   for (let r = row - 1; r <= row + 1; ++r)
//     for (let c = col - 1; c <= col + 1; ++c)
//       if (r !== row || c !== col) searchIslands(r, c, matrix)
// }

// const countIslands = (matrix: number[][]): number => {
//   let [numOfIslands, row, col]: number[] = [0, 0, 0]

//   for (let i = 0; i < matrix.flat(1).length; ++i) {
//     if (matrix[row][col] === 1) {
//       ++numOfIslands
//       searchIslands(row, col, matrix)
//     }

//     ++col
//     if (matrix[row][col] === undefined) {
//       col = 0
//       ++row
//     }
//   }

//   return numOfIslands
// }

// interface Dir {
//   name: string;
//   rowDir: number;
//   colDir: number;
// }

const directions: Dir[] = [
  { name: "right", rowDir: 0, colDir: 1 },
  { name: "dwnRght", rowDir: 1, colDir: 1 },
  { name: "down", rowDir: 1, colDir: 0 },
  { name: "dwnLeft", rowDir: 1, colDir: -1 },
  { name: "left", rowDir: 0, colDir: -1 },
  { name: "upLeft", rowDir: -1, colDir: -1 },
  { name: "up", rowDir: -1, colDir: 0 },
  { name: "upRght", rowDir: -1, colDir: 1 },
];

const searchIsland = (
  row: number,
  col: number,
  matrix: number[][]
): number[][] => {
  matrix[row][col] = 0;

  directions.forEach((direction: Dir): void => {
    const { rowDir, colDir } = direction;

    const [newRowDir, newColDir]: number[] = [row + rowDir, col + colDir];

    if (matrix[newRowDir] && matrix[newRowDir][newColDir])
      matrix = searchIsland(newRowDir, newColDir, matrix);
  });

  return matrix;
};

const countIslands = (matrix: number[][]): number => {
  let [numOfIslands, row, col]: number[] = [0, 0, 0];

  for (let i = 0; i < matrix.flat().length; ++i) {
    if (matrix[row][col]) {
      ++numOfIslands;
      matrix = searchIsland(row, col, matrix);
    }

    ++col;
    if (matrix[row][col] === undefined) {
      col = 0;
      ++row;
    }
  }

  return numOfIslands;
};

//#region up to down
//so what if we wanted to read in values up to down, instead of left to right. i'll do it for an n x m matrix

// const searchIslands = (
//   row: number,
//   col: number,
//   matrix: number[][]
// ): number[][] => {
//   matrix[row][col] = 0

//   directions.forEach((direction: Dir): void => {
//     const { rowDir, colDir } = direction

//     const [newRowDir, newColDir]: number[] = [row + rowDir, col + colDir]

//     if (matrix[newRowDir] && matrix[newRowDir][newColDir])
//       matrix = searchIslands(newRowDir, newColDir, matrix)
//   })

//   return matrix
// }

// const countIslandsUpToDown = (matrix: number[][]): number => {
//   let [numOfIslands, row, col]: number[] = [0, 0, 0]

//   for (let i = 0; i < matrix.flat().length; ++i) {
//     if (matrix[row][col]) {
//       ++numOfIslands
//       matrix = searchIslands(row, col, matrix)
//     }

//     ++row
//     if (matrix[row] === undefined) {
//       row = 0
//       ++col
//     }
//   }

//   return numOfIslands
// }

//#endregion

// log(
//   countIslands([
//     [1, 0, 0, 0, 0],
//     [0, 0, 1, 0, 1],
//     [0, 1, 1, 1, 1],
//     [0, 0, 0, 0, 0],
//     [1, 1, 1, 0, 1],
//     [1, 1, 0, 0, 1],
//   ])
// )

// #endregion
// 🏖

//#region return x y and by
// This problem was asked by Facebook.

// Given three 32-bit integers x, y, and b, return x if b is 1 and y if b is 0, using only mathematical or bit operations. You can assume b can only be 1 or 0.

const returnXYB = (x: number, y: number, b: number): number =>
  1 * b > 0 ? x : y;

// i think this is right, and it's not using any logical operators. so there's that

//#endregion

//#region valid parentheses

// This problem was asked by Google.

// Given a string of parentheses, write a function to compute the minimum number of parentheses to be removed to make the string valid (i.e. each open parenthesis is eventually closed).

// For example, given the string "()())()", you should return 1. Given the string ")(", you should return 2, since we must remove all of them.

// const validParan = (s: string): number => s.replace(/\(\)/g, "").length

const removePairs = (s: string): string => s.replace(/\(\)/g, "");
// const validParan = (s: string): number => {
//   let removed: string = removePairs(s)
//   let startLen: number, endLen: number

//   do {
//     startLen = removed.length
//     removed = removePairs(removed)
//     endLen = removed.length
//   } while (startLen !== endLen)

//   return endLen
// }

const validParan = (s: string): number => {
  let removed: string, startLen: number, endLen: number;

  do {
    startLen = (removed && removed.length) || 0;
    removed = removed ? removePairs(removed) : removePairs(s);
    endLen = removed.length;
  } while (startLen !== endLen);

  return endLen;
};

// log(validParan("()()()"))
// log(validParan(")("))
// log(validParan("(()())))()()()("))

// I thought this was a stack problem but i did not get it to work this way. i'm not sure this is what an interviewer would look for, but it is damn concise

// No. this definitely is not it. i'll think on this one a bit...

//it was a regex and do while loop needed. probably pretty smelly code. whatever
//#endregion

//#region random num not in list

// Given an integer n and a list of integers l, write a function that randomly generates a number from 0 to n-1 that isn't in l (uniform).

const randoNotInList = (n: number, l: number[]): number => {
  const numSet = new Set<number>(l);
  let rando: number;

  do rando = Math.floor(Math.random() * n);
  while (numSet.has(rando));

  return rando;
};

// log(randoNotInList(5, [1, 3]))

//#endregion

//#region second czi question
// i panic under examination and i don't think things through all the way. i hate it like fire.
// so how do i get better at that or was i just running out the clock for myself?

/*
We are writing a tool to help users manage their calendars. Given an unordered list of times of day when someone is busy, write a function that tells us whether they're available during a specified period of time.

Each time is expressed as an integer using 24-hour notation, such as 1200 (12:00), 1530 (15:30), or 800 (8:00).

Sample input:

meetings = [
  [1230, 1300], // 12:30 PM to 1:00 PM
  [845, 900],   //  8:45 AM to 9:00 AM
  [1300, 1500]  //  1:00 PM to 3:00 PM
]

Expected output:

isAvailable(meetings, 915, 1215)   => true
isAvailable(meetings, 900, 1230)   => true
isAvailable(meetings, 850, 1240)   => false
isAvailable(meetings, 1200, 1300)  => false
isAvailable(meetings, 700, 1600)   => false
isAvailable(meetings, 800, 845)    => true
isAvailable(meetings, 1500, 1800)  => true
isAvailable(meetings, 845, 859)    => false
isAvailable(meetings, 846, 900)    => false
isAvailable(meetings, 846, 859)    => false
isAvailable(meetings, 845, 900)    => false
isAvailable(meetings, 2359, 2400)  => true
isAvailable(meetings, 930, 1600)   => false
isAvailable(meetings, 800, 850)    => false
isAvailable(meetings, 1400, 1600)  => false
isAvailable(meetings, 1300, 1501)  => false

Complexity Analysis:

n = number of meetings
r = total minutes in range of all meetings

*/

const meetings: number[][] = [
  [1230, 1300],
  [845, 900],
  [1300, 1500],
];

const isAvailable = (
  meetings: number[][],
  queryStart: number,
  queryEnd: number
): boolean => {
  const noConflictMeetings: number[][] = meetings.filter(
    (meeting: number[]) => {
      const [meetingStart, meetingEnd] = [meeting[0], meeting[1]];

      return (
        (meetingStart <= queryStart && meetingEnd <= queryStart) ||
        (meetingStart >= queryEnd && meetingEnd >= queryEnd)
      );
    }
  );

  return noConflictMeetings.length === meetings.length;
};

// console.log(isAvailable(meetings, 915, 1215)) // => true
// console.log(isAvailable(meetings, 900, 1230)) //  => true
// console.log(isAvailable(meetings, 850, 1240)) //   => false
// console.log(isAvailable(meetings, 1200, 1300)) //   => false

//#endregion

//#region what's wrong with this code?

// This problem was asked by Dropbox.

// What does the below code snippet print out? How can we fix the anonymous functions to behave as we'd expect?

// functions = []
// for i in range(10):
//     functions.append(lambda : i)

// i think maybe this isn't returning in the lambda? i don't really know enough about python to know at a glance. but i think there is only the explicit return in python. it's adorable.

// for f in functions:
//     print(f())

//gonna see if i can recreate this is typescript

const funcs: Array<() => number> = [];

for (let i = 1; i <= 10; ++i) funcs.push(() => i);

// funcs.forEach((func) => log(func()))

// well, it's-ah working for me

//#endregion

//#region course ids

// We're given a hashmap associating each courseId key with a list of courseIds values, which represents that the prerequisites of courseId are courseIds. Return a sorted ordering of courses such that we can finish all courses.

// Return null if there is no such ordering.

// For example, given {'CSC300': ['CSC100', 'CSC200'], 'CSC200': ['CSC100'], 'CSC100': []}, should return ['CSC100', 'CSC200', 'CSCS300']

interface Reqs {
  [className: string]: string[];
}

const CSC: Reqs = {
  CSC300: ["CSC200"],
  CSC200: ["CSC100"],
  CSC100: [],
};

const ABA: Reqs = {
  ABA300: ["ABA200", "BTB101"],
  ABA200: ["ABA100"],
  ABA100: ["CSC300"],
};

const BTB: Reqs = {
  BTB101: [],
};

const bySuffix = (course1: string, course2: string): number => {
  const [suf1, suf2]: number[] = [+course1.slice(3), +course2.slice(3)];

  if (suf1 === suf2) return course1 > course2 ? 1 : -1;
  else return suf1 - suf2;
};

const courseReqs = (reqs: Reqs): string[] =>
  [
    ...new Set<string>(
      Object.entries(reqs).reduce(
        (classes: string[], [key, values]) => [key, ...values, ...classes],
        []
      )
    ),
  ].sort(bySuffix);

// log([CSC, ABA, BTB].map((course) => courseReqs(course)))
//#endregion

//#region findGreaterLexographicPermutation

// Given a number represented by a list of digits, find the next greater permutation of a number, in terms of lexicographic ordering. If there is not greater permutation possible, return the permutation with the lowest value/ordering.

// For example, the list [1,2,3] should return [1,3,2]. The list [1,3,2] should return [2,1,3]. The list [3,2,1] should return [1,2,3].

// Can you perform the operation without allocating extra memory (disregarding the input memory)?

// const factorial = (num: number): number =>
//   num <= 1 ? 1 : num * factorial(num - 1)

const findGreaterLexographicPermutation = (nums: number[]): number[] => {
  const numsAsStr: string = nums.join("");

  const { length } = nums;

  const permutations: Set<string> = new Set<string>();

  for (let i = 0; i < factorial(length) / 2; ++i) {
    const current: string = nums.join("");

    if (!permutations.has(current)) {
      permutations.add(current);

      let reversed: string = "";

      for (let i = length - 1; i >= 0; --i) reversed += current[i];

      permutations.add(reversed);
    }

    nums.push(nums.shift());
  }

  const sortedPermutations: string[] = [...permutations].sort();

  let finalPermutation: string = sortedPermutations[0];

  for (let i = 0; i < sortedPermutations.length - 1; ++i)
    if (sortedPermutations[i] === numsAsStr) {
      finalPermutation = sortedPermutations[i + 1];
      break;
    }

  return finalPermutation.split("").map((str) => +str);
};

// log(findGreaterLexographicPermutation([1, 2, 3]))

// huh, this breaks if i use repeated numbers...
// fixed it
//#endregion

//#region all possible permutations

// This problem was asked by Microsoft.

// Given a number in the form of a list of digits, return all possible permutations.

// For example, given [1,2,3], return [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]].

// so, a variation on the previous problem

const findAllPossiblePermutations = (nums: number[]): number[][] => {
  const { length } = nums;

  const permutations: number[][] = [];

  for (let i = 0; i < length ** 2; ++i) {
    const tmp: number[] = [];

    const bin: string = i.toString(2).padStart(length, "0");

    for (let j = 0; j < length; ++j) if (bin[j] === "1") tmp.push(nums[j]);

    permutations.push(tmp);
  }

  return permutations;
};

// log(findAllPossiblePermutations([1, 2, 3, 4]))

//#endregion

//#region set value in map with time

// This problem was asked by Stripe.

// Write a map implementation with a get function that lets you retrieve the value of a key at a particular time.

// It should contain the following methods:

// set(key, value, time): sets key to value for t = time.
// get(key, time): gets the key at t = time.
// The map should work like this. If we set a key at a particular time, it will maintain that value forever or until it gets set at a later time. In other words, when we get a key at a time, it should return the value that was set for that key set at the most recent time.

// Consider the following examples:

// d.set(1, 1, 0) # set key 1 to value 1 at time 0
// d.set(1, 2, 2) # set key 1 to value 2 at time 2
// d.get(1, 1) # get key 1 at time 1 should be 1
// d.get(1, 3) # get key 1 at time 3 should be 2
// d.set(1, 1, 5) # set key 1 to value 1 at time 5
// d.get(1, 0) # get key 1 at time 0 should be null
// d.get(1, 10) # get key 1 at time 10 should be 1
// d.set(1, 1, 0) # set key 1 to value 1 at time 0
// d.set(1, 2, 0) # set key 1 to value 2 at time 0
// d.get(1, 0) # get key 1 at time 0 should be 2

interface TimeByValue<T> {
  [time: number]: T;
  maxTime: number;
}

class MapByTime<T> {
  private data: TimeByValue<T>[] = [];

  public set(key: number, value: T, time: number): this {
    if (this.data[key] === undefined && key > this.data.length) {
      const tmpArr: TimeByValue<T>[] = new Array(key - this.data.length);
      this.data = [...this.data, ...tmpArr];
    }

    this.data[key] = { ...this.data[key], [time]: value };

    if (this.data[key].maxTime === undefined) this.data[key].maxTime = 0;
    if (time > this.data[key].maxTime) this.data[key].maxTime = time;

    return this;
  }

  public get(key: number, time: number): T | undefined {
    if (this.data[key] === undefined) return undefined;

    if (this.data[key][time] !== undefined) return this.data[key][time];
    else if (time > this.data[key].maxTime)
      return this.data[key][this.data[key].maxTime];
    else return undefined;
  }
}

// const newMap = new MapByTime<string>()

// newMap.set(1, "howdy", 2).set(1, "partner", 3)

// log(newMap.get(1, 2))
// log(newMap.get(1, 4))
// log(newMap.get(1, 0))

//#endregion

//#region search matrix for word

// Given a 2D board of characters and a word, find if the word exists in the grid.

// The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.

// For example, given the following board:

// [
//   ['A','B','C','E'],
//   ['S','F','C','S'],
//   ['A','D','E','E']
// ]
// exists(board, "ABCCED") returns true, exists(board, "SEE") returns true, exists(board, "ABCB") returns false.

// I think i will use the Dir interface and Directions object from the islands problem

const matDirections: Dir[] = [
  { name: "right", rowDir: 0, colDir: 1 },
  { name: "down", rowDir: 1, colDir: 0 },
  { name: "left", rowDir: 0, colDir: -1 },
  { name: "up", rowDir: -1, colDir: 0 },
];

//#region

// const searchForWord = (
//   row: number,
//   col: number,
//   matrix: string[][],
//   target: string,
//   len: number
// ): string => {
//   // log(target)
//   matDirections.forEach((direction: Dir): void => {
//     const { rowDir, colDir } = direction

//     const [newRowDir, newColDir]: number[] = [row + rowDir, col + colDir]

//     if (
//       matrix[newRowDir] &&
//       matrix[newRowDir][newColDir] &&
//       matrix[newRowDir][newColDir][0] === target[0] &&
//       target.length <= len
//     ) {
//       target += searchForWord(
//         newRowDir,
//         newColDir,
//         matrix,
//         target.slice(1),
//         target.length
//       )
//     }
//   })

//   return target
// }

// const searchMatrix = (matrix: string[][], target: string): boolean => {
//   let curString: string = ""
//   let [curIdx, row, col]: number[] = [0, 0, 0]

//   for (let i = 0; i < matrix.flat().length; ++i) {
//     if (matrix[row][col] === target[curIdx]) {
//       ++curIdx
//       curString += matrix[row][col]
//       curString += searchForWord(
//         row,
//         col,
//         matrix,
//         target.slice(curIdx),
//         target.length
//       )
//       log(curString)
//     }
//     if (curString === target || curString.includes(target)) break

//     ++col
//     if (matrix[row][col] === undefined) {
//       col = 0
//       ++row
//     }

//     curIdx = 0
//     curString = ""
//   }

//   return curString === target || curString.includes(target)
// }

// const searchForWord = (
//   row: number,
//   col: number,
//   matrix: string[][],
//   target: string,
//   curIdx: number
// ): string => {
//   let foundWord: string = ""

//   log(foundWord)
//   matDirections.forEach((direction: Dir): void => {
//     const { rowDir, colDir } = direction

//     const [newRowDir, newColDir]: number[] = [row + rowDir, col + colDir]

//     // log(matrix[newRowDir][newColDir] === target[curIdx])

//     if (
//       matrix[newRowDir] &&
//       matrix[newRowDir][newColDir] &&
//       matrix[newRowDir][newColDir] === target[curIdx]
//     ) {
//       log("howdy")
//       foundWord = searchForWord(newRowDir, newColDir, matrix, target, ++curIdx)
//     }
//   })

//   return foundWord
// }

// const searchMatrix = (matrix: string[][], target: string): boolean => {
//   let curString: string = ""
//   let [curIdx, row, col]: number[] = [0, 0, 0]

//   for (let i = 0; i < matrix.flat().length; ++i) {
//     if (matrix[row][col] === target[curIdx]) {
//       ++curIdx
//       curString += matrix[row][col]
//       curString = searchForWord(row, col, matrix, target, curIdx)
//       // log(curString)
//     }
//     if (curString === target || curString.includes(target)) break

//     ++col
//     if (matrix[row][col] === undefined) {
//       col = 0
//       ++row
//     }

//     curIdx = 0
//     curString = ""
//   }

//   return curString === target
// }

// const searchForWord = (
//   row: number,
//   col: number,
//   matrix: string[][],
//   target: string
// ): string => {
//   matDirections.forEach((direction: Dir): void => {
//     const { rowDir, colDir } = direction

//     const [newRowDir, newColDir]: number[] = [row + rowDir, col + colDir]

//     if (
//       matrix[newRowDir] &&
//       matrix[newRowDir][newColDir] &&
//       matrix[newRowDir][newColDir] === target[0]
//     ) {
//       target = searchForWord(newRowDir, newColDir, matrix, target.slice(1))
//     }
//   })

//   return target
// }

// const searchForWord = (
//   row: number,
//   col: number,
//   matrix: string[][],
//   target: string
// ): string => {
//   if (target.length <= 1) return target
//   else {
//     directions.forEach((direction: Dir) => {
//       const { rowDir, colDir } = direction

//       const [newRowDir, newColDir]: number[] = [row + rowDir, col + colDir]

//       if (
//         matrix[newRowDir] &&
//         matrix[newRowDir][newColDir] &&
//         matrix[newRowDir][newColDir] === target[0]
//       )
//         return searchForWord(newRowDir, newColDir, matrix, target.slice(1))
//     })
//   }

//   return target
// }

// const searchMatrix = (matrix: string[][], target: string): boolean => {
//   let curString: string = ""
//   let [row, col]: number[] = [0, 0, 0]

//   for (let i = 0; i < matrix.flat().length; ++i) {
//     if (matrix[row][col] === target[0])
//       curString += searchForWord(row, col, matrix, target)

//     log(curString)

//     if (curString === target) break

//     ++col
//     if (matrix[row][col] === undefined) {
//       col = 0
//       ++row
//     }

//     curString = ""
//   }

//   return curString === target
// }

// const searchForWord = (
//   row: number,
//   col: number,
//   matrix: string[][],
//   target: string
// ): string => {
//   if (target.length <= 1) return target
//   else
//     matDirections.forEach((direction: Dir): string => {
//       const { rowDir, colDir } = direction

//       const [newRowDir, newColDir]: number[] = [row + rowDir, col + colDir]

//       if (
//         matrix[newRowDir] &&
//         matrix[newRowDir][newColDir] &&
//         matrix[newRowDir][newColDir][0] === target[0]
//       ) {
//         return searchForWord(
//           newRowDir,
//           newColDir,
//           matrix,
//           target.slice(1) || target
//         )
//       }
//     })

//   // return target
// }

// const searchMatrix = (matrix: string[][], target: string): boolean => {
//   let curString: string = ""
//   let [curIdx, row, col]: number[] = [0, 0, 0]

//   for (let i = 0; i < matrix.flat().length; ++i) {
//     if (matrix[row][col] === target[curIdx]) {
//       ++curIdx
//       curString += matrix[row][col]
//       curString += searchForWord(row, col, matrix, target.slice(curIdx))
//       log(curString)
//     }
//     if (curString === target || curString.includes(target)) break

//     ++col
//     if (matrix[row][col] === undefined) {
//       col = 0
//       ++row
//     }

//     curIdx = 0
//     curString = ""
//   }

//   return curString === target || curString.includes(target)
// }

//#endregion

const findMatch = (
  mat: string[][],
  target: string,
  row: number,
  col: number,
  depth: number = 0
): boolean => {
  if (depth === target.length) return true;

  if (!mat[row] || !mat[row][col]) return false;

  if (mat[row][col] === target[depth]) {
    const temp: string = mat[row][col];
    mat[row][col] = "👺";

    const numberOfRecursions: number = directions.reduce(
      (numOfRecursions: number, dir: Dir) => {
        const { name, rowDir, colDir } = dir;

        const isRecursion: boolean = findMatch(
          mat,
          target,
          row + rowDir,
          col + colDir,
          depth + 1
        );
        console.log(`${temp} ${name} : ${isRecursion}`);

        return numOfRecursions + +isRecursion;
      },
      0
    );

    mat[row][col] = temp;
    return !!numberOfRecursions;
  } else return false;
};

const findMatchNoRepeat = (
  mat: string[][],
  target: string,
  row: number,
  col: number,
  depth: number = 0
): boolean => {
  if (depth === target.length) return true;

  if (!mat[row] || !mat[row][col]) return false;

  if (mat[row][col] === target[depth]) {
    const temp: string = mat[row][col];
    mat[row][col] = "👺";

    let isNextChar: boolean = false;

    for (const dir of directions) {
      const { name, rowDir, colDir } = dir;

      isNextChar = findMatchNoRepeat(
        mat,
        target,
        row + rowDir,
        col + colDir,
        depth + 1
      );

      console.log(`${temp} ${name} : ${isNextChar}`);
      if (isNextChar) break;
    }

    mat[row][col] = temp;
    return isNextChar;
  } else return false;
};

const searchMatrix = (mat: string[][], target: string): boolean => {
  const matLen: number = mat.flat().length;

  if (target.length > matLen) return false;
  else {
    let [row, col]: number[] = [0, 0];

    for (let i = 0; i < matLen; ++i) {
      if (
        mat[row][col] === target[0] &&
        findMatchNoRepeat(mat, target, row, col)
      )
        return true;

      ++col;
      if (!mat[row][col]) {
        col = 0;
        ++row;
      }
    }
    return false;
  }
};

const board: string[][] = [
  ["A", "B", "C", "E"],
  ["S", "F", "C", "S"],
  ["A", "D", "E", "E"],
];

const find: string = "FEECBCES";

const noRepeatBoard: string[][] = [
  ["A", "B", "C", "D"],
  ["E", "F", "G", "H"],
  ["I", "J", "K", "L"],
];

const noRepeatFind: string = "AFKLHDCG";

// log(searchMatrix(board, find))
// log(searchMatrix(noRepeatBoard, noRepeatFind))

//i looked this one up, and it does make sense, you want to find a continuous chain of booleans

const chunks = (arr: any[], chunkSize: number): any[][] => {
  const mat: any[][] = [];

  if (arr.length <= chunkSize) mat.push(arr);
  else {
    const remainArr: any[] = [];

    while (arr.length % chunkSize !== 0) remainArr.unshift(arr.pop());

    let tmpArr: any[];

    while (arr.length) {
      tmpArr = arr.slice(0, chunkSize);
      arr = arr.slice(chunkSize);
      mat.push(tmpArr);
      tmpArr = [];
    }

    if (remainArr.length) mat.push(remainArr);
  }

  return mat;
};

// log(chunks([1, 2, 3, 4, 5, 6, 7], 2))
// log(chunks([1, 2, 3, 4, 5, 6, 7], 5))

//#endregion

//#region longest consecutive number sequence

// This problem was asked by Microsoft.
// Given an unsorted array of integers, find the length of the longest consecutive elements sequence.
// For example, given [100, 4, 200, 1, 3, 2], the longest consecutive element sequence is [1, 2, 3, 4]. Return its length: 4.
// Your algorithm should run in O(n) complexity.

// const ascending = (a: number, b: number): number => a - b

// const longestConsecutiveElements = (nums: number[]): number => {
//   let [curLen, longestLen]: number[] = [1, 1]

//   nums.sort(ascending)
//   for (let i = 0; i < nums.length - 1; ++i) {
//     const [curNum, nextNum]: number[] = [nums[i], nums[i + 1]]

//     if (nextNum === curNum + 1) ++curLen
//     else curLen = 1

//     if (curLen > longestLen) longestLen = curLen
//   }

//   return longestLen
// }

const longestConsecutiveElements = (nums: number[]): number => {
  let longestLen: number = 0;

  const numSet: Set<number> = new Set<number>(nums);
  numSet.forEach((num: number): void => {
    const numIsStartOfSequence: boolean = !numSet.has(num - 1);
    if (numIsStartOfSequence) {
      let endOfSequence: number = num;
      while (numSet.has(endOfSequence)) ++endOfSequence;

      longestLen = max(longestLen, endOfSequence - num);
    }
  });

  return longestLen;
};

// log(
//   longestConsecutiveElements([
//     4, 1, 3, 2, 8, 9, 10, 11, 12, 13, 14, 20, 21, 22, 23, 24, 25, 26, 27, 28,
//     29, 30,
//   ])
// )

//#endregion

//#region least moves on 2d grid

// This problem was asked by Google.

// You are in an infinite 2D grid where you can move in any of the 8 directions:

//  (x,y) to
//     (x+1, y),
//     (x - 1, y),
//     (x, y+1),
//     (x, y-1),
//     (x-1, y-1),
//     (x+1,y+1),
//     (x-1,y+1),
//     (x+1,y-1)
// You are given a sequence of points and the order in which you need to cover the points. Give the minimum number of steps in which you can achieve it. You start from the first point.

// Example:

// Input: [[0, 0], [1, 1], [1, 2]]
// Output: 2
// It takes 1 step to move from (0, 0) to (1, 1). It takes one more step to move from (1, 1) to (1, 2).

const findChecks = (
  grid: string[][],
  targetNumOfChecks: number,
  row: number = 0,
  col: number = 0,
  curNumOfChecks: number = 0,
  moves: number = 0
): number => {
  if (curNumOfChecks === targetNumOfChecks) return moves;
  else if (!grid[row] || !grid[row][col]) return 0;
  else if (grid[row][col] === "✅" || grid[row][col] === "🚫") {
    const temp: string = grid[row][col];
    grid[row][col] = "👺";
    const arrOfMoves: number[] = directions
      .map((direction: Dir) => {
        const { rowDir, colDir } = direction;

        const [newRowDir, newColDir]: number[] = [row + rowDir, col + colDir];

        return findChecks(
          grid,
          targetNumOfChecks,
          newRowDir,
          newColDir,
          temp === "✅" ? curNumOfChecks + 1 : curNumOfChecks,
          moves + 1
        );
      })
      .filter((num) => num);

    grid[row][col] = temp;
    return min(...arrOfMoves);
  } else return 0;
};

const leastMovesOn2DGrid = (mat: number[][]) => {
  const target: number = mat.length;

  let largestX: number, largestY: number;
  for (let i = 1; i < target; ++i) {
    const [curX, curY]: number[] = [mat[i][0], mat[i][1]];

    if (!largestX || curX > largestX) largestX = curX;
    if (!largestY || curY > largestY) largestY = curY;
  }

  const grid: Array<Array<"🚫" | "✅">> = new Array(largestY + 1)
    .fill(null)
    .map(() => new Array(largestX + 1).fill("🚫"));

  mat.forEach(([x, y]) => (grid[y][x] = "✅"));

  const leastMoves: number = findChecks(grid, target);
  log(grid);

  return leastMoves - 1;
};

log(
  leastMovesOn2DGrid([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4],
    [2, 0],
  ])
);

log(
  leastMovesOn2DGrid([
    [0, 0],
    [1, 1],
    [1, 2],
  ])
);

log(
  leastMovesOn2DGrid([
    [0, 0],
    [3, 0],
    [3, 2],
  ])
);
//#endregion
