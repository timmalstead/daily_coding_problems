//#region helpers

import { count } from "console";

// @ts-ignore
const [{ log }, { abs, max, min, floor, random, round, sqrt }, { now }] = [
  console,
  Math,
  Date,
];

//#endregion

//#region all palindromes

//variation of previous question. find all of the possible permutations that can be made from all combinations of a string

//for example, given the string 'otto' return ['otto','oto','tot','tt','oo,'o','t']

const findPerms = (s: string): string | string[] => {
  const len: number = s.length;

  if (len <= 1) return s;
  else {
    const perms: string[] = [];

    for (let i = 0; i < len; ++i) {
      const cur: string = s[i];
      const rem: string = `${s.slice(0, i)}${s.slice(i + 1)}`;

      for (const subPerm of findPerms(rem)) perms.push(`${cur}${subPerm}`);
    }

    return perms;
  }
};

const findCombos = (s: string): string[] => {
  const combos = new Set<string>();

  const len: number = s.length;
  for (let i = 0; i < len ** 2; ++i) {
    let tmp: string = "";

    const bin: string = i.toString(2).padStart(len, "1");

    for (let j = 0; j < len; ++j) if (+bin[j]) tmp += s[j];

    const perms: string[] = [...findPerms(tmp)];

    perms.forEach((perm: string): void => {
      combos.add(perm);
    });
  }

  const palindromes: string[] = [...combos].filter((str: string): boolean => {
    const len: number = str.length;
    const half: number = floor(len / 2);

    for (let i = 0, j = len - 1; i <= half; ++i, --j)
      if (str[i] !== str[j]) return false;

    return true;
  });

  return palindromes;
};

// log(findCombos("carrace"));

//haven't got them all, but it's pretty good for now

//#endregion

//#region number of ways to traverse matrix

// You are given an N by M matrix of 0s and 1s. Starting from the top left corner, how many ways are there to reach the bottom right corner?

// You can only move right and down. 0 represents an empty space while 1 represents a wall you cannot walk through.

// For example, given the following matrix:

// [[0, 0, 1],
//  [0, 0, 1],
//  [1, 0, 0]]
// Return two, as there are only two ways to get to the bottom right:

// Right, down, down, right
// Down, right, down, right
// The top left corner and bottom right corner will always be 0.

type NumMat = number[][];

interface Dir {
  name: string;
  rowDir: number;
  colDir: number;
}

const downRight: Dir[] = [
  { name: "down", rowDir: 1, colDir: 0 },
  { name: "right", rowDir: 0, colDir: 1 },
];

const travMaze = (
  mat: NumMat,
  row: number = 0,
  col: number = 0,
  endPoint?: [number, number]
): number => {
  if (!endPoint) endPoint = [mat.length - 1, mat[mat.length - 1].length - 1];

  let ways: number = 0;

  if (row === endPoint[0] && col === endPoint[1]) return 1;
  else
    downRight.forEach(({ rowDir, colDir }: Dir): void => {
      const [newRowDir, newColDir]: number[] = [row + rowDir, col + colDir];

      if (mat[newRowDir]?.[newColDir] === 0)
        ways += travMaze(mat, newRowDir, newColDir, endPoint);
    });

  return ways;
};

// log(
//   travMaze([
//     [0, 0, 1],
//     [0, 0, 1],
//     [1, 0, 0],
//   ])
// );
//#endregion

//#region simple string occurance problem

// Given a string, return the first recurring character in it, or null if there is no recurring character.
// For example, given the string "acbbac", return "b". Given the string "abcdef", return null.

// const firstRecurringChar = (str: string): string | null => {
//   const counter: { [char: string]: number } = {};

//   for (const char of str) {
//     counter[char] = ++counter[char] || 1;
//     if (counter[char] > 1) return char;
//   }

//   return null;
// };

const firstRecurringChar = (str: string): string | null => {
  const set = new Set<string>();

  for (const char of str) {
    if (set.has(char)) return char;
    else set.add(char);
  }

  return null;
};

// log(firstRecurringChar("acbbac") === "b");
// log(firstRecurringChar("abcdef") === null);

//#endregion

//#region reverse bits

// Given a 32-bit integer, return the number with its bits reversed.

// For example, given the binary number 1111 0000 1111 0000 1111 0000 1111 0000, return 0000 1111 0000 1111 0000 1111 0000 1111.

const reverseBits = (bin: string): string => {
  let rev: string = "";

  for (const char of bin) {
    if (char === "0") rev += "1";
    else if (char === "1") rev += "0";
    else rev += char;
  }

  return rev;
};

// log(
//   reverseBits("1111 0000 1111 0000 1111 0000 1111 0000") ===
//     "0000 1111 0000 1111 0000 1111 0000 1111"
// );

//#endregion

//#region
// Given an N by N matrix, rotate it by 90 degrees clockwise.

// For example, given the following matrix:

// [[1, 2, 3],
//  [4, 5, 6],
//  [7, 8, 9]]
// you should return:

// [[7, 4, 1],
//  [8, 5, 2],
//  [9, 6, 3]]
// Follow-up: What if you couldn't use any extra space?

const rotate90 = (mat: NumMat): NumMat => {
  const finalMat: NumMat = [];

  const flatArr: number[] = mat.flat();
  let [startIndex, decrementBy]: number[] = [flatArr.length - 1, mat[0].length];
  let subArr: number[] = [];

  for (let i = 0, j = startIndex; i <= flatArr.length; ++i, j -= decrementBy) {
    if (subArr.length === decrementBy) {
      finalMat.unshift(subArr);

      subArr = [];
      j = --startIndex;
    }
    subArr.push(flatArr[j]);
  }

  return finalMat;
};

log(
  rotate90([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);

//#endregion

//#region

//#endregion
