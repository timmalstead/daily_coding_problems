//#region helpers

import { count } from "console";
import { add } from "./helpers";

// @ts-ignore
const [
  { log },
  { abs, max, min, floor, random, round, sqrt },
  { now },
  { isInteger },
] = [console, Math, Date, Number];

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

//#region rotate matrix
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

// log(
//   rotate90([
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12],
//     [13, 14, 15, 16],
//   ])
// );

//#endregion

//#region find indices of concatenated words

// Given a string s and a list of words words, where each word is the same length, find all starting indices of substrings in s that is a concatenation of every word in words exactly once.

// For example, given s = "dogcatcatcodecatdog" and words = ["cat", "dog"], return [0, 13], since "dogcat" starts at index 0 and "catdog" starts at index 13.

// Given s = "barfoobazbitbyte" and words = ["dog", "cat"], return [] since there are no substrings composed of "dog" and "cat" in s.

// The order of the indices does not matter.

const permut = (s: string): Set<string> | string => {
  const len: number = s.length;
  if (len < 2) return s;

  const permutations = new Set<string>();
  for (let i = 0; i < len; ++i) {
    const char: string = s[i];

    if (s.indexOf(char) != i) continue;

    const remainingString: string = `${s.slice(0, i)}${s.slice(i + 1, len)}`;

    for (const subPermutation of permut(remainingString))
      permutations.add(char + subPermutation);
  }
  return permutations;
};

const findConcatWordsIndices = (s: string, words: string[]): number[] => {
  const indices: number[] = [];
  const conCat: string = words.join("");

  const uniqueStr: Set<string> = permut(conCat) as Set<string>;

  const catLen: number = conCat.length;
  const startLen: number = s.length - catLen;

  for (let i = startLen; i >= 0; --i)
    if (uniqueStr.has(s.slice(i, i + catLen))) indices.push(i);

  return indices;
};

// log(findConcatWordsIndices("dogcatcatcodecatdog", ["cat", "dog"]));

//#endregion

//#region find one to one mapping in strings

// Determine whether there exists a one-to-one character mapping from one string s1 to another s2.
// For example, given s1 = abc and s2 = bcd, return true since we can map a to b, b to c, and c to d.
// Given s1 = foo and s2 = bar, return false since the o cannot map to two characters.

const hasOneToOneCharMapping = (s1: string, s2: string): boolean =>
  new Set<string>(s1).size === new Set<string>(s2).size;

// log(hasOneToOneCharMapping("abc", "bcd"), hasOneToOneCharMapping("foo", "bar"));

//#endregion

//#region create interleaved stack

// Given a stack of N elements, interleave the first half of the stack with the second half reversed using only one other queue. This should be done in-place.
// Recall that you can only push or pop from a stack, and enqueue or dequeue from a queue.
// For example, if the stack is [1, 2, 3, 4, 5], it should become [1, 5, 2, 4, 3]. If the stack is [1, 2, 3, 4], it should become [1, 4, 2, 3].
// Hint: Try working backwards from the end state.

// const createInterleaveStack = (n: number[]): number[] => {
//   const interleavedStack: number[] = [];
//   const half: number = floor(n.length / 2);

//   for (let i = n.length - 1; i >= half; --i) interleavedStack.push(n.pop());

//   for (let j = n.length - 1; j >= 0; --j)
//     interleavedStack.splice(j, 0, n.pop());

//   return interleavedStack;
// };

// const createInterleaveStack = (n: number[]): number[] => {
//   const interleavedStack: number[] = [];
//   const half: number = floor(n.length / 2);

//   for (let i = n.length - 1; i >= 0; --i)
//     if (i >= half) interleavedStack.push(n.pop());
//     else interleavedStack.splice(i, 0, n.pop());

//   return interleavedStack;
// };

// couldn't quite do it without splice. oh well

// const createInterleaveStack = (n: number[]): number[] => {
//   const interleavedStack: number[] = [];
//   let i: number = 0,
//     j: number = n.length - 1;

//   while (i <= j) {
//     interleavedStack.push(n[i]);
//     if (i !== j) interleavedStack.push(n[j]);

//     ++i;
//     --j;
//   }

//   return interleavedStack;
// };

// huh, managed to do it with just push after all

const createInterleaveStack = (n: number[]): number[] => {
  const interleavedStack: number[] = [];

  while (n.length) {
    interleavedStack.push(n.shift());
    if (n.length) interleavedStack.push(n.pop());
  }

  return interleavedStack;
};

//an even easier way

// log(createInterleaveStack([1, 2, 3, 4]));

//#endregion

//#region greatest common denominator

//[42,56,14]

const findGCD = (x: number[]): number | null => {
  for (let i = min(...x); i >= 0; --i)
    if (x.every((n) => isInteger(n / i))) return i;

  return null;
};

// log(findGCD([42, 56, 14]));
//#endregion

//#region partition into two minimum subsets

// Given an array of positive integers, divide the array into two subsets such that the difference between the sum of the subsets is as small as possible.

// For example, given [5, 10, 15, 20, 25], return the sets {10, 25} and {5, 15, 20}, which has a difference of 5, which is the smallest possible difference

const intArr: number[] = [5, 10, 15, 20, 25];

const findMin = (
  arr: number[],
  i: number,
  curSum: number,
  sumTotal: number
): number => {
  if (i === 0) return abs(sumTotal - curSum - curSum);
  else
    return min(
      findMin(arr, i - 1, curSum + arr[i - 1], sumTotal),
      findMin(arr, i - 1, curSum, sumTotal)
    );
};

// log(findMin(intArr, intArr.length, 0, intArr.reduce(add)));

//#endregion

//#region overlapping squares

// You are given given a list of rectangles represented by min and max x- and y-coordinates. Compute whether or not a pair of rectangles overlap each other. If one rectangle completely covers another, it is considered overlapping.

// For example, given the following rectangles:

// {
//     "top_left": (1, 4),
//     "dimensions": (3, 3) # width, height
// },
// {
//     "top_left": (-1, 3),
//     "dimensions": (2, 1)
// },
// {
//     "top_left": (0, 5),
//     "dimensions": (4, 3)
// }
// return true as the first and third rectangle overlap each other.

interface Rectangle {
  top_left: [number, number];
  dimensions: [number, number];
}

const recs: Rectangle[] = [
  {
    top_left: [1, 4],
    dimensions: [3, 3], // width, height
  },
  {
    top_left: [-1, 3],
    dimensions: [2, 1],
  },
  {
    top_left: [0, 5],
    dimensions: [4, 3],
  },
];

const findOverlap = (r: Rectangle[]): boolean => {
  const positions: Set<string> = new Set<string>();

  for (const { top_left, dimensions } of r)
    for (let j = 0; j < dimensions[0]; ++j)
      for (let k = 0; k < dimensions[1]; ++k) {
        const pos: string = `${top_left[0] + j}-${top_left[1] + k}`;

        if (positions.has(pos)) return true;
        else positions.add(pos);
      }

  return false;
};

// log(findOverlap(recs));

//#endregion

//#region longest subarray of distinct elements

// Given an array of elements, return the length of the longest subarray where all its elements are distinct.
// For example, given the array [5, 1, 3, 5, 2, 3, 4, 1], return 5 as the longest subarray of distinct elements is [5, 2, 3, 4, 1]

const longestSubArray = (nums: number[]): number => {
  let longestLen: number = 0;

  const checker = new Set<number>();
  for (const n of nums) {
    if (checker.has(n)) checker.clear();
    checker.add(n);
    if (checker.size > longestLen) longestLen = checker.size;
  }
  return longestLen;
};

// log(longestSubArray([5, 2, 3, 4, 1, 5, 1, 3]));

//#endregion

//#region maximum subarray sum

//Given a circular array, compute its maximum subarray sum in O(n) time. A subarray can be empty, and in this case the sum is 0.

//For example, given [8, -1, 3, 4], return 15 as we choose the numbers 3, 4, and 8 where the 8 is obtained from wrapping around.

//Given [-4, 5, 1, 0], return 6 as we choose the numbers 5 and 1.

const maxSubArray = (nums: number[]): number => {
  let max: number = 0;

  const len: number = nums.length;

  for (let i = 0; i < len * len; ++i) {
    const arrToSum: number[] = [];
    const bin: string = i.toString(2).padStart(len, "0");

    for (let j = 0; j < len; ++j) if (bin[j] === "1") arrToSum.push(nums[j]);

    const arrSum: number = arrToSum.reduce(add, 0);

    if (arrSum > max) max = arrSum;
  }
  return max;
};

log(maxSubArray([-4, 5, 1, 0]));

//don't know the trick to get this done in pure linear time

//#endregion

//#region

//#endregion
