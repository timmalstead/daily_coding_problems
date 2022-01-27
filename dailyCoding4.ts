//#region helpers

import { add, asc } from "./helpers";

const [
  { log, error },
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
  let [max, len]: number[] = [0, nums.length];

  for (let i = 0; i < len * len; ++i) {
    const arrToSum: number[] = [];
    const bin: string = i.toString(2).padStart(len, "0");

    for (let j = 0; j < len; ++j) if (bin[j] === "1") arrToSum.push(nums[j]);

    const arrSum: number = arrToSum.reduce(add, 0);

    if (arrSum > max) max = arrSum;
  }

  return max;
};

// log(maxSubArray([-4, 5, 1, 0]));

//don't know the trick to get this done in pure linear time

//#endregion

//#region minimum number to make non overlapping intervals

// Given a collection of intervals, find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.
// Intervals can "touch", such as [0, 1] and [1, 2], but they won't be considered overlapping.

// For example, given the intervals [7, 9], [2, 4], [5, 8], return 1 as the last interval can be removed and the first two won't overlap.
// The intervals are not necessarily sorted in any order.

const nonOverlapIntervals = (...intervals: number[][]): number => {
  let intervalsToRemove: number = 0;

  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < intervals.length; ++i)
    if (intervals[i][0] < intervals[i - 1][1]) ++intervalsToRemove;

  return intervalsToRemove;
};

// log(nonOverlapIntervals([7, 9], [2, 4], [5, 8]));
//#endregion

//#region reach the end of the array

// You are given an array of nonnegative integers. Let's say you start at the beginning of the array and are trying to advance to the end. You can advance at most, the number of steps that you're currently on. Determine whether you can get to the end of the array.

// For example, given the array [1, 3, 1, 2, 0, 1], we can go from indices 0 -> 1 -> 3 -> 5, so return true.

// Given the array [1, 2, 1, 0, 0], we can't reach the end, so return false.

const advanceToEnd = (nums: number[]): boolean => {
  for (let i = 0; i < nums.length; ++i)
    for (let j = i; j < i + nums[i]; ++j)
      if (i + nums[j] === nums.length - 1) return true;

  return false;
};

// log(advanceToEnd([1, 3, 1, 2, 0, 1]));

//#endregion

//#region count over/under

// Let A be an N by M matrix in which every row and every column is sorted.

// Given i1, j1, i2, and j2, compute the number of elements of M smaller than M[i1, j1] and larger than M[i2, j2].

// For example, given the following matrix:

// [[1, 3, 7, 10, 15, 20],
//  [2, 6, 9, 14, 22, 25],
//  [3, 8, 10, 15, 25, 30],
//  [10, 11, 12, 23, 30, 35],
//  [20, 25, 30, 35, 40, 45]]
// And i1 = 1, j1 = 1, i2 = 3, j2 = 3, return 15 as there are 14 numbers in the matrix smaller than 6 or greater than 23.

const a: number[][] = [
  [1, 3, 7, 10, 15, 20],
  [2, 6, 9, 14, 22, 25],
  [3, 8, 10, 15, 25, 30],
  [10, 11, 12, 23, 30, 35],
  [20, 25, 30, 35, 40, 45],
];

const [i, j]: number[][] = [
  [1, 2],
  [3, 3],
];

const countOverUnder = (
  mat: number[][],
  sm: number[],
  lg: number[]
): number => {
  let count: number = 0;

  const [under, over]: number[] = [mat[sm[0]][sm[1]], mat[lg[0]][lg[1]]];
  mat.flat().forEach((n: number): void => {
    if (n < under || n > over) ++count;
  });

  return count;
};

// log(countOverUnder(a, i, j));
//#endregion

//#region rotate array by k

// Given an array and a number k that's smaller than the length of the array, rotate the array to the right k elements in-place.

const rotateArrByK = (arr: any[], k: number): any[] => {
  for (let i = 0; i < k; ++i) arr.unshift(arr.pop());

  return arr;
};

// log(rotateArrByK([1, 2, 3, 4, 5], 3));

//#endregion

//#region subset does not have a remainder

//Given a set of distinct positive integers, find the largest subset such that every pair of elements in the subset (i, j) satisfies either i % j = 0 or j % i = 0.

//For example, given the set [3, 5, 10, 20, 21], you should return [5, 10, 20]. Given [1, 3, 6, 24], return [1, 3, 6, 24].

const setA = new Set<number>([3, 5, 10, 20, 21]);
const setB = new Set<number>([1, 3, 6, 24]);

const largestModuloSubset = (nums: Set<number>): Set<number> => {
  const returnSet = new Set<number>();

  const numArr: number[] = [...nums];
  for (let iter = 1; iter < numArr.length; ++iter) {
    const [i, j]: number[] = [numArr[iter - 1], numArr[iter]];

    if (i % j === 0 || j % i === 0) returnSet.add(i).add(j);
  }

  return returnSet;
};

// log(largestModuloSubset(setA));
// log(largestModuloSubset(setB));

//#endregion

//#region balanced string of parentheses

//Given a string of parentheses, find the balanced string that can be produced from it using the minimum number of insertions and deletions. If there are multiple solutions, return any of them.

//For example, given "(()", you could return "(())". Given "))()(", you could return "()()()()".

const isBalancedString = (str: string): boolean => {
  const stack: string[] = [];

  for (const s of str)
    if (s === "(") stack.push(s);
    else if (stack.pop() !== "(") return false;

  return stack.length === 0;
};

// i do not think i know how to go about this
// log(isBalancedString("()((()))()()()"));

//#endregion

//#region largest sum in a triangle

// You are given an array of arrays of integers, where each array corresponds to a row in a triangle of numbers. For example, [[1], [2, 3], [1, 5, 1]] represents the triangle:

//   1
//  2 3
// 1 5 1

// We define a path in the triangle to start at the top and go down one row at a time to an adjacent value, eventually ending with an entry on the bottom row. For example, 1 -> 3 -> 5. The weight of the path is the sum of the entries.

const largestTriangleSum = (mat: number[][]): number => {
  let largestSum: number = 0;

  for (const arr of mat) {
    let largestValInArr: number = 0;

    for (const num of arr) if (num > largestValInArr) largestValInArr = num;

    largestSum += largestValInArr;
  }

  return largestSum;
};

// log(largestTriangleSum([[1], [2, 3], [1, 5, 1]]));

//#endregion

//#region find integer palindrome

//Write a program that checks whether an integer is a palindrome. For example, 121 is a palindrome, as well as 888. 678 is not a palindrome.
//Do not convert the integer into a string.

const isIntPalindrome = (int: number): boolean | null => {
  if (isInteger(int)) {
    const stack: number[] = [];

    int = abs(int);
    while (int) {
      stack.unshift(int % 10);
      int = floor(int / 10);
    }

    for (let i = 0; i < floor(stack.length / 2); ++i)
      if (stack[i] !== stack[stack.length - 1 - i]) return false;

    return true;
  } else {
    error(
      "The argument supplied to isIntPalindrome must be a number and an integer"
    );
    return null;
  }
};

// log(isIntPalindrome(-2232));

//#endregion

//#region find min sum in pivoted array

//Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand. Find the minimum element in O(log N) time. You may assume the array does not contain duplicates.

//For example, given [5, 7, 10, 3, 4], return 3.

//i'm on vacation and i don't care to do a very complex recursive operation with a binary search, so i'm just going to aim for O(N) time and O(1) space complexity

const findLowestValInPivotArr = (arr: number[]): number => {
  for (let i = 1; i < arr.length; ++i) if (arr[i] < arr[i - 1]) return arr[i];

  return arr[0];
};

// log(findLowestValInPivotArr([5, 7, 10, 3, 4]));

//#endregion

//#region find next integer in absolute order

//Given an integer, find the next permutation of it in absolute order. For example, given 48975, the next permutation would be 49578.

const nextAbsoluteInteger = (num: number): number => {
  const numHolder: number[] = [];

  const numStr: string = num.toString();

  const len: number = numStr.length;

  for (let i = 0; i <= len * len; ++i) {
    let curNumStr: string = "";

    const binStr: string = i.toString(2).padStart(len, "0");

    for (let j = 0; j < len; ++j) if (binStr[j] === "1") curNumStr += numStr[j];

    log(curNumStr);
  }

  return 0;
};

// log(nextAbsoluteInteger(48975));

//#endregion

//#region rotate to permutation

//A permutation can be specified by an array P, where P[i] represents the location of the element at i in the permutation. For example, [2, 1, 0] represents the permutation where elements at the index 0 and 2 are swapped.

//Given an array and a permutation, apply the permutation to the array. For example, given the array ["a", "b", "c"] and the permutation [2, 1, 0], return ["c", "b", "a"].

const arrToPerm = (arr: any[], perm: number[]): any[] | null => {
  const len: number = arr.length;
  if (len === perm.length) {
    const returnArr: any[] = new Array(len);

    for (let i = 0; i < len; ++i) returnArr[i] = arr[perm[i]];

    return returnArr;
  } else {
    error("The length of each array used as an argument must be equal");
    return null;
  }
};

// log(arrToPerm(["a", "b", "c"], [2, 1, 0]));

//#endregion

//#region longest common subsequence

//Write a program that computes the length of the longest common subsequence of three given strings. For example, given "epidemiologist", "refrigeration", and "supercalifragilisticexpialodocious", it should return 5, since the longest common subsequence is "eieio".

const findPermutations = (str: string): Set<string> | string | null => {
  if (!str || typeof str !== "string") {
    error("Please enter a truthy string");
    return null;
  } else if (str.length < 2) return str;
  else {
    const permutationsSet = new Set<string>();

    const len: number = str.length;
    for (let i = 0; i < len; ++i) {
      const char = str[i];

      if (str.indexOf(char) != i) continue;

      const remainingChars = `${str.slice(0, i)}${str.slice(i + 1, len)}`;

      for (const permutation of findPermutations(remainingChars)) {
        const newPerm: string = `${char}${permutation}`;

        if (!permutationsSet.has(newPerm)) permutationsSet.add(newPerm);
      }
    }

    return permutationsSet;
  }
};

// log(findPermutations("abc"));

//alright, the above does work but it's also very easy to overflow the stack

// const longestCommonSubsequence = (...strs: string[]): number | any => {
//   const perms: string[] = strs.map(findPermutations).flat();

//   return perms;
// };

// log(findPermutations("epidemiologist"));

// so this one will be tough because it doesn't have to be a contiguous subsequence

//#endregion

//#region collatz sequence

// A Collatz sequence in mathematics can be defined as follows. Starting with any positive integer:

// if n is even, the next number in the sequence is n / 2
// if n is odd, the next number in the sequence is 3n + 1
// It is conjectured that every such sequence eventually reaches the number 1. Test this conjecture.

// Bonus: What input n <= 1000000 gives the longest sequence?

interface CollatzCount {
  iterations: number;
  num: number;
}

const isEven = (n: number): boolean => n % 2 === 0;

// const collatzSeq = (n: number): void => {
//   while (n > 1) {
//     log(n);
//     if (isEven(n)) n /= 2;
//     else n = n * 3 + 1;
//   }
//   log(n);
// };

const collatzCounter = (num: number): CollatzCount => {
  const counter: CollatzCount = { iterations: 1, num };

  while (num > 1) {
    if (isEven(num)) num /= 2;
    else num = num * 3 + 1;
    ++counter.iterations;
  }

  return counter;
};

const seqTester = (num: number): number => {
  const countings: CollatzCount[] = [];

  for (let i = 1; i <= num; ++i) countings.push(collatzCounter(i));

  countings.sort((a, b) => a.iterations - b.iterations);

  return countings.pop().num;
};

// log(seqTester(1000000));

// i think that the longest sequence is produced by 837799, but i'm not the best at math problems

//#endregion

//#region find starting indices of string pattern

// Given a string and a pattern, find the starting indices of all occurrences of the pattern in the string. For example, given the string "abracadabra" and the pattern "abr", you should return [0, 7]

const findStartIndices = (str: string, pat: string): number[] => {
  const idxs: number[] = [];

  for (let i = 0; i < str.length; ++i) {
    let cur: string = "";

    for (let j = i; j < str.length; ++j) {
      cur += str[j];

      if (cur === pat) {
        idxs.push(i);
        break;
      }
    }
  }
  return idxs;
};

// log(findStartIndices("abracadabra", "bra"));

//#endregion

//#region spreadsheet column id

// Spreadsheets often use this alphabetical encoding for its columns: "A", "B", "C", ..., "AA", "AB", ..., "ZZ", "AAA", "AAB", ....

// Given a column number, return its alphabetical column id. For example, given 1, return "A". Given 27, return "AA".

const findColumnId = (n: number): string | null => {
  if (!isInteger(n) || n <= 0) {
    error("Argument for findColumnId must be an integer above zero");
    return null;
  } else {
    let columnId: string = "";

    while (n > 0) {
      const charId: number = n % 26;

      //okay, i had part of it. some of the below i had to look up
      if (charId) columnId = `${String.fromCharCode(charId + 64)}${columnId}`;
      else columnId = `Z${columnId}`;

      n = floor(n / 26) - (charId ? 0 : 1);
    }

    return columnId;
  }
};

// log(findColumnId(1));
// log(findColumnId(28));
// log(findColumnId(702));
// log(findColumnId(705));

//#endregion

//#region valid ip addresses

// Given a string of digits, generate all possible valid IP address combinations.

// IP addresses must follow the format A.B.C.D, where A, B, C, and D are numbers between 0 and 255. Zero-prefixed numbers, such as 01 and 065, are not allowed, except for 0 itself.

// For example, given "2542540123", you should return ['254.25.40.123', '254.254.0.123'].

// okey doke, i looked up some of the below, but i think it's alright
const isValidIp = (str: string): boolean => {
  const ipSequences: string[] = str.split(".");

  for (const ip of ipSequences)
    if (
      ip.length > 3 ||
      +ip < 0 ||
      +ip > 255 ||
      (ip.length > 1 && (+ip === 0 || (+ip !== 0 && +ip[0] === 0)))
    )
      return false;

  return true;
};

const allValidIps = (numStr: string): string[] | null => {
  const len: number = numStr.length;

  if (len < 4 || len > 12) return null;
  else {
    const validIps: string[] = [];
    let newNumStr: string = numStr;

    for (let i = 1; i < len - 2; ++i)
      for (let j = i + 1; j < len - 1; ++j)
        for (let k = j + 1; k < len; ++k) {
          newNumStr = `${newNumStr.slice(0, k)}.${newNumStr.slice(k)}`;
          // log(`k: ${k} -- 1: ${newNumStr}`);
          newNumStr = `${newNumStr.slice(0, j)}.${newNumStr.slice(j)}`;
          // log(`j: ${j} -- 2: ${newNumStr}`);
          newNumStr = `${newNumStr.slice(0, i)}.${newNumStr.slice(i)}`;
          // log(`i: ${i} -- 3: ${newNumStr}`);

          if (isValidIp(newNumStr)) {
            // log(newNumStr);
            validIps.push(newNumStr);
          }
          // else {
          //   log(`not correct: ${newNumStr}`);
          // }

          newNumStr = numStr;
        }

    return validIps;
  }
};

// log(allValidIps("2542540123"));

// log(isValidIp("254.254.00.123"));
// log(isValidIp("254.254.0.123"));

//#endregion

//#region longest string of ones in binary

// Given an integer n, return the length of the longest consecutive run of '1's in its binary representation.

// For example, given 156, you should return 3.

const longestBinStrOfOnes = (num: number): number | null => {
  if (typeof num !== "number" || Number.isNaN(num) || !Number.isFinite(num)) {
    console.error(
      "Argument supplied to longestBinStrOfOnes must be a finite float or integer"
    );
    return null;
  } else {
    let [current, longest]: number[] = [0, 0];

    for (const bit of num.toString(2))
      if (bit === "1") {
        ++current;
        if (current > longest) longest = current;
      } else current = 0;

    return longest;
  }
};

// log(longestBinStrOfOnes(156));
// log(longestBinStrOfOnes(1.1));
// log(longestBinStrOfOnes(1005.15));

//#endregion

//#region roman numeral decoder

// Given a number in Roman numeral format, convert it to decimal.

// The values of Roman numerals are as follows:

// {
//     'M': 1000,
//     'D': 500,
//     'C': 100,
//     'L': 50,
//     'X': 10,
//     'V': 5,
//     'I': 1
// }
// In addition, note that the Roman numeral system uses subtractive notation for numbers such as IV and XL.

// Below from Wikipedia
// The numerals for 4 (IV) and 9 (IX) are written using "subtractive notation",[6] where the first symbol (I) is subtracted from the larger one (V, or X), thus avoiding the clumsier (IIII, and VIIII). Subtractive notation is also used for 40 (XL), 90 (XC), 400 (CD) and 900 (CM). These are the only subtractive forms in standard use.

// For the input XIV, for instance, you should return 14.

const romanNums: { [numeral: string]: number } = {
  M: 1000,
  D: 500,
  C: 100,
  L: 50,
  X: 10,
  V: 5,
  I: 1,
};

const simpleRomanNumeralDecoder = (numeral: string): number => {
  let acc: number = 0;

  for (let i = 0; i < numeral.length; ) {
    let compoundNumeral: boolean = true;

    const first: string = numeral[i];
    const firstAndSecond: string = `${first}${numeral[i + 1]}`;

    if (firstAndSecond === "CM") acc += 900;
    else if (firstAndSecond === "CD") acc += 400;
    else if (firstAndSecond === "XC") acc += 90;
    else if (firstAndSecond === "XL") acc += 40;
    else if (firstAndSecond === "IX") acc += 9;
    else if (firstAndSecond === "IV") acc += 4;
    else {
      acc += romanNums[first];
      compoundNumeral = false;
    }
    i += compoundNumeral ? 2 : 1;
  }
  return acc;
};

// log(simpleRomanNumeralDecoder("MMCDXIV"));

//#endregion

//#region sparse binary numbers

// We say a number is sparse if there are no adjacent ones in its binary representation. For example, 21 (10101) is sparse, but 22 (10110) is not. For a given input N, find the smallest sparse number greater than or equal to N.

// Do this in faster than O(N log N) time.
// I'm gonna solve the problem first and then see how i feel about optimizing it

const findNextSparseNumber = (num: number): number => {
  let isSparseNumFound: boolean = false;

  while (!isSparseNumFound) {
    let numIsSparse: boolean = true;

    const bin: string = num.toString(2);
    for (let i = 0; i < bin.length - 1; ++i)
      if (bin[i] === "1" && bin[i + 1] === "1") {
        numIsSparse = false;
        break;
      }

    if (numIsSparse) isSparseNumFound = true;
    else ++num;
  }
  return num;
};

log(findNextSparseNumber(11));

//#endregion

//#region

//#endregion
