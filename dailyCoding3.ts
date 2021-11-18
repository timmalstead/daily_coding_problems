// @ts-ignore
const [{ log }, { abs, max, min, floor, random, round }, { now }] = [
  console,
  Math,
  Date,
];
const asc = (a: number, b: number): number => a - b;
const sum = (acc: number, val: number): number => acc + val;

//#region prime: gonna get himself some justice, even from primes

// Given an even number (greater than 2), return two prime numbers whose sum will be equal to the given number.
// A solution will always exist. See Goldbach’s conjecture.

// Example:

// Input: 4
// Output: 2 + 2 = 4
// If there are more than one solution possible, return the lexicographically smaller solution.

// If [a, b] is one solution with a <= b, and [c, d] is another solution with c <= d, then

// [a, b] < [c, d]
// If a < c OR a==c AND b < d.

const isPrime = (value: number): boolean => {
  for (let i = 2; i < value; ++i) if (value % i === 0) return false;
  return true;
};

const evenFromPrimes = (num: number): number[] | null => {
  if (num < 4 || num % 2 !== 0) return null;
  else {
    const solutions: { num: number; arr: number[] }[] = [];

    for (let i = num - 1; i > 0; --i) {
      const rem: number = num - i;

      if (isPrime(i) && isPrime(rem)) {
        const arr: number[] = [i, rem];

        solutions.push({ num: +arr.join(""), arr });
      }
    }

    if (solutions.length > 1) solutions.sort((a, b) => a.num - b.num);

    return solutions[0].arr;
  }
};

// log(evenFromPrimes(16))

//#endregion

//#region contiguous integers sum to k

// Given a list of integers and a number K, return which contiguous elements of the list sum to K.

// For example, if the list is [1, 2, 3, 4, 5] and K is 9, then it should return [2, 3, 4], since 2 + 3 + 4 = 9

const sumsToK = (nums: number[], k: number): number[] => {
  let [curSum, returnArr]: [number, number[]] = [0, []];

  const inc = (num: number): void => {
    curSum += num;
    returnArr.push(num);
  };

  const len: number = nums.length;
  for (let i = 0; i < len; ++i) {
    inc(nums[i]);

    if (curSum === k) return returnArr;
    for (let j = i + 1; j < len; ++j) {
      inc(nums[j]);

      if (curSum === k) return returnArr;
      else if (curSum > k) break;
    }

    curSum = 0;
    returnArr = [];
  }
  return returnArr;
};

// log(sumsToK([1, 2, 8, 4, 5], 14))

//#endregion

//#region shortest substring containing all characters

// Given a string and a set of characters, return the shortest substring containing all the characters in the set.
// For example, given the string "figehaeci" and the set of characters {a, e, i}, you should return "aeci".
// If there is no substring containing all the characters in the set, return null.

const shortestSubstring = (str: string, tar: string): string => {
  let [len, matched]: number[] = [str.length, 0];
  let [curStr, shortStr]: string[] = ["", str];
  let set: Set<string> = new Set<string>(tar);

  const inc = (s: string): void => {
    set.delete(s);
    ++matched;
  };

  for (let i = 0; i < len; ++i) {
    const strt: string = str[i];

    if (set.has(strt)) {
      inc(strt);
      curStr += strt;

      for (let j = i + 1; j < len; ++j)
        if (set.size) {
          const nxt: string = str[j];

          if (set.has(nxt)) inc(nxt);
          curStr += nxt;
        } else break;
    }

    if (matched === tar.length && curStr.length < shortStr.length)
      shortStr = curStr;

    set = new Set<string>(tar);
    matched = 0;
    curStr = "";
  }
  return shortStr;
};

// log(shortestSubstring("haeciai", "aei"))

//#endregion

//#region hops to the end
// Given an integer list where each number represents the number of hops you can make, determine whether you can reach to the last index starting at index 0.

// For example, [2, 0, 1, 0] returns True while [1, 1, 0, 1] returns False.

const hopsToEnd = (nums: number[]): boolean => {
  let [hops, lastIndex]: number[] = [0, nums.length - 1];

  for (let i = 0; i < lastIndex; ++i) hops += nums[i];

  return hops === lastIndex;
};
// log(hopsToEnd([1, 1, 0, 1]))

//#endregion

//#region shift strings to fing

// Given two strings A and B, return whether or not A can be shifted some number of times to get B.
// For example, if A is abcde and B is cdeab, return true. If A is abc and B is acb, return false.

const shiftStringsToEqual = (a: string, b: string): boolean => {
  if (a === b) return true;
  else if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    a = `${a.slice(1)}${a[0]}`;
    if (a === b) return true;
  }
  return false;
};

// log(shiftStringsToEqual("abcde", "cdeab"))
// log(shiftStringsToEqual("abc", "acb"))

//#endregion

//#region switch bits

// Given an unsigned 8-bit integer, swap its even and odd bits. The 1st and 2nd bit should be swapped, the 3rd and 4th bit should be swapped, and so on.

// For example, 10101010 should be 01010101. 11100010 should be 11010001.

// Bonus: Can you do this in one line?

// 10101010 = 170
// 11100010 = 226
// 11 11 10 10 0 = 500
// 101 = 5

//#region
// const switchBits = (num: number): string => {
//   let returnBits: string = ""
//   let [bin, lastBit]: string[] = [num.toString(2), ""]
//   const [isOddLength, lastIdx]: [boolean, number] = [
//     bin.length % 2 !== 0,
//     bin.length - 1,
//   ]

//   if (isOddLength) {
//     lastBit = bin[lastIdx]
//     bin = bin.slice(0, lastIdx)
//   }

//   for (let i = 0; i < bin.length; i += 2) returnBits += `${bin[i + 1]}${bin[i]}`

//   if (isOddLength) returnBits += lastBit === "0" ? "1" : "0"

//   return returnBits
// }
//#endregion

const switchBits = (num: number): string => {
  let returnBits: string = "";
  let [bin, lastBit]: string[] = [num.toString(2), ""];
  const [binIsOddLength, lastIdx]: [boolean, number] = [
    bin.length % 2 !== 0,
    bin.length - 1,
  ];

  if (binIsOddLength) {
    lastBit = bin[lastIdx];
    bin = bin.slice(0, lastIdx);
  }

  for (let i = 0; i < bin.length; i += 2)
    returnBits += `${bin[i + 1]}${bin[i]}`;

  if (binIsOddLength) returnBits += lastBit;

  return returnBits;
};

// log(switchBits(500))
// log(switchBits(170))
// 01010101
// log(switchBits(226) === "11010001")

//#endregion

//#region all permutations of string anagram indices

// Given a word target and a string str, find all starting indices in str which are anagrams of target

// For example, given that target is "ab", and str is "abxaba", return 0, 3, and 4.

const findAnagramIndices = (target: string, str: string): number[] | any => {
  const len: number = target.length;
  const anagrams: Set<string> = new Set<string>();

  for (let i = 0; i < len ** 2; ++i) {
    const bin: string = i.toString(2).padStart(len, "0");

    log(bin);
  }
};

// findAnagramIndices("abc", "abxaba")

//I don't understand finding all permutations where order matters, like in strings
//I will but I may need a bit more time

//#endregion

//#region reverse words in string

// Given a string of words delimited by spaces, reverse the words in string. For example, given "hello world here", return "here world hello"

// Follow-up: given a mutable string representation, can you perform this operation in-place?

const reverseInString = (str: string): string | any => {
  let returnStr: string = "";
  let lastSpc: number = str.length;

  for (let i = lastSpc - 1; i >= 0; --i)
    if (str[i] === " ") {
      returnStr += `${str.slice(i + 1, lastSpc)} `;
      lastSpc = i;
    }

  returnStr += str.slice(0, lastSpc);

  return returnStr;
};

// const reverseInString = (str: string): string =>
// str.split(" ").reverse().join(" ")

// const reverseItems = (
//   array: string[],
//   start: number,
//   end: number
// ): string[] => {
//   for (let i = 0; i < (end - start) / 2; i++) {
//     const j = end - 1 - i
//     const c = array[i + start]
//     array[i + start] = array[j]
//     array[j] = c
//   }
//   return array
// }

// const reverseInString = (str: string): string => {
//   const mutable: string[] = str.split("")

//   reverseItems(mutable, 0, mutable.length)

//   let lastWordStart: number = 0
//   for (let i = 0; i < mutable.length; i++) {
//     if (mutable[i] === " ") {
//       reverseItems(mutable, lastWordStart, i)
//       lastWordStart = i + 1
//     }
//   }

//   reverseItems(mutable, lastWordStart, mutable.length)

//   return mutable.join("")
// }
// log(reverseInString("hello world here"))

//#endregion

//#region reverse words with delimiters in place

// Given a string and a set of delimiters, reverse the words in the string while maintaining the relative order of the delimiters. For example, given "hello/world:here", return "here/world:hello"

// Follow-up: Does your solution work for the following cases: "hello/world:here/", "hello//world:here"

const reverseWithDelimiterList = (
  str: string,
  delimiters: string[]
): string => {
  let returnStr: string = "";
  let first: string, last: string;
  const wordList: string[] = [];

  if (str.startsWith(delimiters[0])) {
    str = str.slice(delimiters[0].length);
    first = delimiters.shift();
  }

  if (str.endsWith(delimiters[delimiters.length - 1])) {
    const l = delimiters.pop();
    str = str.slice(0, str.length - l.length);
    last = l;
  }

  delimiters.forEach((delim: string): void => {
    const splitArr: string[] = str.split(delim);

    wordList.push(splitArr[0]);
    str = splitArr[1];
  });
  wordList.push(str);

  wordList.reverse();

  wordList.forEach((word: string, i: number): void => {
    returnStr += word;

    if (delimiters[i]) returnStr += delimiters[i];
  });

  if (first) returnStr = `${first}${returnStr}`;
  if (last) returnStr = `${returnStr}${last}`;

  return returnStr;
};

// log(reverseWithDelimiterList("//hello/world:here$$", ["//", "/", ":", "$$"]))

//#endregion

//#region square and sort

// Given a sorted list of integers, square the elements and give the output in sorted order.

// For example, given [-9, -2, 0, 2, 3], return [0, 4, 4, 9, 81].

const squareAndSort = (nums: number[]): number[] =>
  nums
    .map((num) => num ** 2)
    .sort((a, b) => {
      log(a, b, a - b);
      return a - b;
    });

// log(squareAndSort([-9, -2, 0, 2, 3]));
//#endregion

//#region closed intervals
// Given a set of closed intervals, find the smallest set of numbers that covers all the intervals. If there are multiple smallest sets, return any of them.
// For example, given the intervals [0, 3], [2, 6], [3, 4], [6, 9],
// one set of numbers that covers all these intervals is {3, 6}.

type Interval = [number, number];

// const coverIntervals = (ints: Interval[]): Interval => {
//   const sorted: Interval[] = ints.map((arr) => arr.sort((a, b) => a - b));

//   const begins: number[] = sorted.reduce((returnArr, numArr) => {
//     returnArr.push(numArr[0]);
//     return returnArr;
//   }, []);

//   const ends: number[] = sorted.reduce((returnArr, numArr) => {
//     returnArr.push(numArr[1]);
//     return returnArr;
//   }, []);

//   return [min(...ends), max(...begins)];
// };

// const coverIntervals = (ints: Interval[]): Interval => {
//   const begins: number[] = [];
//   const ends: number[] = [];

//   ints.forEach((int: Interval): void => {
//     int.sort((a, b) => a - b);

//     begins.push(int[0]);
//     ends.push(int[1]);
//   });

//   return [min(...ends), max(...begins)];
// };

const coverIntervals = (ints: Interval[]): Interval => {
  let lowestHigh: number, highestLow: number;

  ints.forEach((int: Interval): void => {
    int.sort((a, b) => a - b);

    if (lowestHigh === undefined || int[0] > highestLow) lowestHigh = int[0];
    if (highestLow === undefined || int[1] < lowestHigh) highestLow = int[1];
  });

  return [highestLow, lowestHigh];
};

// log(
//   coverIntervals([
//     [3, 0],
//     [6, 2],
//     [3, 4],
//     [9, 6],
//   ])
// );

//#endregion

//#region delete k to achieve palindrome
// Given a string which we can delete at most k, return whether you can make a palindrome.
// For example, given 'waterrfetawx' and a k of 2, you could delete f and x to get 'waterretaw'.

const canMakePalindrome = (str: string, k: number): boolean => {
  const permutations = new Set<string>();

  const len = str.length;
  const possiblePermuatations: number = len ** 4;

  for (let i = 0; i < possiblePermuatations; ++i) {
    let word: string = "";

    const bits: string = i.toString(2).padStart(len, "0");

    for (let j = 0; j < len; ++j) if (bits[j] === "1") word += str[j];

    permutations.add(word);
  }

  const longEnoughWords: string[] = [...permutations].filter(
    (word) => word.length >= len - k
  );

  for (const word of longEnoughWords) {
    let isPalindrome: boolean = true;

    const wLen: number = word.length - 1;
    for (let i = 0; i <= floor(wLen / 2); ++i)
      if (word[i] !== word[wLen - i]) {
        isPalindrome = false;
        break;
      }

    if (isPalindrome) return true;
  }

  return false;
};

const allPalindromesOfLength = (str: string, k: number): string[] | null => {
  const palindromes: string[] = [];
  const permutations = new Set<string>();

  const len = str.length;
  const possiblePermuatations: number = len ** 4;

  for (let i = 0; i < possiblePermuatations; ++i) {
    let word: string = "";

    const bits: string = i.toString(2).padStart(len, "0");

    for (let j = 0; j < len; ++j) if (bits[j] === "1") word += str[j];

    permutations.add(word);
  }

  const longEnoughWords: string[] = [...permutations].filter(
    (word) => word.length >= len - k
  );

  for (const word of longEnoughWords) {
    let isPalindrome: boolean = true;

    const wLen: number = word.length - 1;
    for (let i = 0; i <= floor(wLen / 2); ++i)
      if (word[i] !== word[wLen - i]) {
        isPalindrome = false;
        break;
      }

    if (isPalindrome) palindromes.push(word);
  }

  return palindromes.length ? palindromes : null;
};

const allPalindromes = (str: string): Set<string> | null => {
  const palindromes: Set<string> = new Set<string>();
  const len: number = str.length;

  for (let i = 0; i < len ** 4; ++i) {
    let isPalindrome: boolean = true;
    let word: string = "";

    const bits: string = i.toString(2).padStart(len, "0");

    for (let j = 0; j < len; ++j) if (bits[j] === "1") word += str[j];

    if (!palindromes.has(word) && word.length > 2) {
      const wLen: number = word.length - 1;
      for (let k = 0; k <= floor(wLen / 2); ++k)
        if (word[k] !== word[wLen - k]) {
          isPalindrome = false;
          break;
        }

      if (isPalindrome) palindromes.add(word);
    }
  }

  return palindromes.size ? palindromes : null;
};

// log(canMakePalindrome("waterrfetawx", 2));
// log(canMakePalindrome("txacrocat", 2));
// log(canMakePalindrome("rotachihmcoatohry", 7));
// log(allPalindromesOfLength("rotachihmcoatohry", 7));
// log(allPalindromesOfLength("txacrocat", 2));
// log(allPalindromes("txacrocat"));

// const factorial = (num: number): number =>
//   num <= 1 ? 1 : num * factorial(num - 1);

const factorial = (num: number): number => {
  let result: number = num;

  while (num > 1) {
    --num;
    result = result * num;
  }

  return result;
};

// log(len ** 4);
//#endregion

//#region biggest number in a matrix

// You are given a 2-d matrix where each cell represents number of coins in that cell. Assuming we start at matrix[0][0], and can only move right or down, find the maximum number of coins you can collect by the bottom right corner.

// For example, in this matrix

// 0 3 1 1
// 2 0 0 4
// 1 5 3 1
// The most we can collect is 0 + 2 + 1 + 5 + 3 + 1 = 12 coins.

interface Dir {
  name: string;
  rowDir: number;
  colDir: number;
}

type Matrix = number[][];

const downAndRight: Dir[] = [
  { name: "right", rowDir: 0, colDir: 1 },
  { name: "down", rowDir: 1, colDir: 0 },
];

const maxSumInMatrix = (
  mat: Matrix,
  targetRow: number = mat.length - 1,
  targetCol: number = mat[targetRow].length - 1,
  curRow: number = 0,
  curCol: number = 0,
  sum: number = 0
): number => {
  if (mat[curRow]?.[curCol] === undefined) return sum;
  else {
    const curVal: number = mat[curRow][curCol];

    if (targetRow === curRow && targetCol === curCol) return sum + curVal;
    else {
      const results: number[] = downAndRight.map((dir: Dir) => {
        const { rowDir, colDir } = dir;
        const [nextRow, nextCol]: number[] = [curRow + rowDir, curCol + colDir];
        const newSum: number = sum + curVal;

        return maxSumInMatrix(
          mat,
          targetRow,
          targetCol,
          nextRow,
          nextCol,
          newSum
        );
      });

      return max(...results);
    }
  }
};

// log(
//   maxSumInMatrix([
//     [0, 10, 10, 10],
//     [0, 0, 0, 20],
//     [49, 2, 0, 0],
//   ])
// );

// this produces reliable results as long as the rows are all the same length

//#endregion

//#region can parse as number

// Given a string, return whether it represents a number. Here are the different kinds of numbers:

// "10", a positive integer
// "-10", a negative integer
// "10.1", a positive real number
// "-10.1", a negative real number
// "1e5", a number in scientific notation
// And here are examples of non-numbers:

// "a"
// "x 1"
// "a -2"
// "-"

const canParseAsNumber = (str: string): boolean => !Object.is(NaN, Number(str));

// log(canParseAsNumber("10") === true);
// log(canParseAsNumber("-10") === true);
// log(canParseAsNumber("10.1") === true);
// log(canParseAsNumber("-10.1") === true);
// log(canParseAsNumber("1e5") === true);
// log(canParseAsNumber("a") === false);
// log(canParseAsNumber("x 1") === false);
// log(canParseAsNumber("a -2") === false);
// log(canParseAsNumber("-") === false);

//#endregion

//#region fair coin flips

// You have n fair coins and you flip them all at the same time. Any that come up tails you set aside. The ones that come up heads you flip again. How many rounds do you expect to play before only one coin remains?

// Write a function that, given n, returns the number of rounds you'd expect to play until one coin remains.

const randoBool = () => !!round(random());

const fairFlips = (n: number): number | any => {
  let rounds: number = 0;

  while (n > 1) {
    for (let i = 0; i < n; ++i) {
      const flip: boolean = randoBool();

      if (!flip) --n;
    }
    ++rounds;
  }

  return rounds;
};

// log(fairFlips(5));

//#endregion

//#region swap elements by k

// Write a function that rotates a list by k elements. For example, [1, 2, 3, 4, 5, 6] rotated by two becomes [3, 4, 5, 6, 1, 2]. Try solving this without creating a copy of the list. How many swap or move operations do you need?

const swapByK = (arr: any[], k: number): any[] => {
  for (let i = 0; i < k; ++i) arr.push(arr.shift());
  return arr;
};

// log(swapByK([1, 2, 3, 4, 5, 6], 2));

//#endregion

//#region max profits!

// Given an array of numbers representing the stock prices of a company in chronological order and an integer k, return the maximum profit you can make from k buys and sells. You must buy the stock before you can sell it, and you must sell the stock before you can buy it again.

// For example, given k = 2 and the array [5, 2, 4, 0, 1], you should return 3.

const maxProfits = (nums: number[], k: number): number => {
  let buys: number[] = [];

  for (let i = 0; i < nums.length - 1; ++i) {
    const [cur, next]: number[] = [nums[i], nums[i + 1]];
    if (next > cur) buys.push(next - cur);
  }

  buys.sort(asc);

  const len: number = buys.length;
  if (len > k) buys = buys.slice(len - k);

  return buys.reduce(sum);
};

// log(maxProfits([5, 2, 4, 0, 1, 7], 2));

// I think this was written with more assumptions than explicit constraints. This should work for how it's written.

//#endregion

//#region HitCounter

// Design and implement a HitCounter class that keeps track of requests (or hits). It should support the following operations:

// record(timestamp): records a hit that happened at timestamp
// total(): returns the total number of hits recorded
// range(lower, upper): returns the number of hits that occurred between timestamps lower and upper (inclusive)
// Follow-up: What if our system has limited memory?

class HitCounter {
  private data: Set<number> = new Set<number>();

  get total(): number {
    return this.data.size;
  }

  public record(timestamp: number): this {
    this.data.add(timestamp);
    return this;
  }

  public range(lower: number, upper: number): number {
    return [...this.data].filter(
      (num: number): boolean => num >= lower && num <= upper
    ).length;
  }
}

const testCounter = (targetEnd: number): void => {
  const targetMinusOne: number = targetEnd - 1;
  const hitCounter: HitCounter = new HitCounter();

  const startTime = now();
  hitCounter.record(startTime);
  log(startTime);

  let middleTime: number,
    counter: number = 1;

  const addARecord = (): void => {
    const rightNow = now();
    hitCounter.record(rightNow);

    if (counter === floor(targetMinusOne / 2)) middleTime = rightNow;

    log(rightNow);
    if (counter === targetMinusOne) {
      log(hitCounter);
      log(hitCounter.total);
      log(hitCounter.range(startTime, middleTime));
      clearInterval(intervalId);
    }
    ++counter;
  };

  const intervalId: NodeJS.Timeout = setInterval(addARecord, 500);
};

// testCounter(10);

//#endregion

//#region SparseArr
// You have a large array with most of the elements as zero.

// Use a more space-efficient data structure, SparseArray, that implements the same interface:

// init(arr, size): initialize with the original large array and size.
// set(i, val): updates index at i with val.
// get(i): gets the value at index i.

class SparseArray {
  private data: { [index: number]: any } = {};
  private limit: number;

  private reject(msg: "method" | "index"): null {
    log(
      msg === "method"
        ? "You must call init before accessing this method"
        : "You cannot access an index higher than the limit set in the init method"
    );
    return null;
  }

  public init(arr: any[], size: number): this | null {
    if (this.limit === undefined) {
      this.limit = size - 1;

      arr.forEach((ele: any, i: number): void => {
        if (ele !== 0 && i <= this.limit) this.data[i] = ele;
      });

      return this;
    } else return null;
  }

  public get(i: number): any {
    if (this.limit !== undefined) {
      if (i <= this.limit) {
        if (this.data[i] === undefined) return 0;
        else return this.data[i];
      } else return this.reject("index");
    } else return this.reject("method");
  }

  public set(i: number, val: any): this | null {
    if (this.limit !== undefined) {
      if (i <= this.limit) {
        this.data[i] = val;
        return this;
      } else return this.reject("index");
    } else return this.reject("method");
  }
}

const sArray = new SparseArray();

const testArr: number[] = [];

for (let i = 1; i <= 500; ++i) {
  if (i % 100 === 0) testArr.push(i);
  else testArr.push(0);
}

sArray.init(testArr, 600);

// log(sArray.set(50, "yes").get(50));
// log(sArray);

//#endregion

//#region largest area

// This question was asked by Google.

// Given an N by M matrix consisting only of 1's and 0's, find the largest rectangle containing only 1's and return its area.

// For example, given the following matrix:

// [[1, 0, 0, 0],
//  [1, 0, 1, 1],
//  [1, 0, 1, 1],
//  [0, 1, 0, 0]]
// Return 4.

const recDirs: Dir[] = [
  { name: "up", rowDir: -1, colDir: 0 },
  { name: "right", rowDir: 0, colDir: 1 },
  { name: "down", rowDir: 1, colDir: 0 },
  { name: "left", rowDir: 0, colDir: -1 },
];

const mapRec = (
  row: number,
  col: number,
  mat: Matrix,
  area: number = 1
): number => {
  if (mat[row][col]) {
    mat[row][col] = 0;

    recDirs.forEach((dir: Dir): void => {
      const { rowDir, colDir } = dir;

      const [newRowDir, newColDir]: number[] = [row + rowDir, col + colDir];

      if (mat[newRowDir]?.[newColDir])
        area = mapRec(newRowDir, newColDir, mat, ++area);
    });
  }
  return area;
};

const largestRec = (mat: Matrix): number => {
  let [largestArea, row, col]: number[] = [0, 0, 0];

  for (let i = 0; i < mat.flat().length; ++i) {
    if (mat[row][col]) largestArea = max(largestArea, mapRec(row, col, mat));

    ++col;
    if (mat[row][col] === undefined) {
      col = 0;
      ++row;
    }
  }

  return largestArea;
};

const recMat: Matrix = [
  [1, 0, 0, 0],
  [1, 0, 1, 1],
  [1, 0, 1, 1],
  [0, 1, 0, 1],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
];

// log(largestRec(recMat));

//#endregion

//#region minimum number of coins

// This problem was asked by Google.

// Find the minimum number of coins required to make n cents.

// You can use standard American denominations, that is, 1¢, 5¢, 10¢, and 25¢.

// For example, given n = 16, return 3 since we can make it with a 10¢, a 5¢, and a 1¢.

const minNumOfCoins = (n: number, coins: number[]): number => {
  if (n > coins.reduce(sum)) return 0;
  else {
    let shortestLength: number;

    const len: number = coins.length;
    const permuations: number = len ** 2;

    for (let i = 1; i < permuations; ++i) {
      const sumArr: number[] = [];

      const bin: string = i.toString(2).padStart(len, "0");

      for (let j = 0; j < len; ++j) if (bin[j] === "1") sumArr.push(coins[j]);

      const summed: number = sumArr.reduce(sum);

      if (summed === n && (!shortestLength || sumArr.length < shortestLength))
        shortestLength = sumArr.length;
    }

    return shortestLength;
  }
};

//above works if each coin is used once at most

// const minNumOfCoins = (n: number, coins: number[]): number => {
//   let shortestLength: number;

//   const len: number = coins.length;
//   const permuations: number = n ** len;
//   for (let i = 1; i < permuations; ++i) {
//     const sumArr: number[] = [];

//     const bin: string = i.toString(2).padStart(len, "0");

//     for (let j = 0; j < len; ++j) if (bin[j] === "1") sumArr.push(coins[j]);

//     const summed: number = sumArr.reduce(sum);

//     if (summed === n && (!shortestLength || sumArr.length < shortestLength))
//       shortestLength = sumArr.length;
//   }
//   return shortestLength;
// };

// log(minNumOfCoins(50, [1, 5, 10, 25]));

//#endregion

//#region two ints appear once

// Given an array of integers in which two elements appear exactly once and all other elements appear exactly twice, find the two elements that appear only once.

// For example, given the array [2, 4, 6, 8, 10, 2, 6, 10], return 4 and 8. The order does not matter.

// Follow-up: Can you do this in linear time and constant space?

const twoAppearOnce = (numArr: number[]): number[] =>
  numArr.filter(
    (num, _, arr): boolean => arr.indexOf(num) === arr.lastIndexOf(num)
  );

// log(twoAppearOnce([2, 4, 6, 8, 10, 2, 6, 10]));

//#endregion

//#region modified balanced brackets problem

// You're given a string consisting solely of (, ), and *. * can represent either a (, ), or an empty string. Determine whether the parentheses are balanced.

// For example, (()* and (*) are balanced. )*( is not balanced.

const wildcardBracketsBalanced = (paran: string): boolean => {
  const permutations: string[] = ["(", ")", ""].map((s) =>
    paran.replace(/\*/g, s)
  );

  //@ts-ignore
  const balanced: boolean[] = permutations.filter((str: string): boolean => {
    const stack: string[] = [];

    for (const s of str) {
      if (s === "(") stack.push(s);
      else if (!stack.length || stack.pop() !== "(") return false;
    }

    return stack.length === 0;
  });

  return !!balanced.length;
};

// log(wildcardBracketsBalanced("(*)") === true);
// log(wildcardBracketsBalanced(")*(") === false);
// log(wildcardBracketsBalanced("(()*") === true);
//#endregion

//#region partition list

// Given a pivot x, and a list lst, partition the list into three parts.

// The first part contains all elements in lst that are less than x
// The second part contains all elements in lst that are equal to x
// The third part contains all elements in lst that are larger than x
// Ordering within a part can be arbitrary.

// For example, given x = 10 and lst = [9, 12, 3, 5, 14, 10, 10], one partition may be [9, 3, 5, 10, 10, 12, 14].

//feel like there may be something missing from the way this is written...

const partition = (x: number, lst: number[]): number[] => {
  const part: Matrix = [[], [], []];

  for (const num of lst) {
    if (num < x) part[0].push(num);
    else if (num === x) part[1].push(num);
    else part[2].push(num);
  }

  return part.flat();
};

// log(partition(10, [9, 12, 3, 5, 14, 10, 10]));

// feels like it shouldn't be this easy11

//#endregion

//#region next biggest number

// Given an array of numbers and an index i, return the index of the nearest larger number of the number at index i, where distance is measured in array indices.

// For example, given [4, 1, 3, 5, 6] and index 0, you should return 3.

// If two distances to larger numbers are the equal, then return any one of them. If the array at i doesn't have a nearest larger integer, then return null.

// Follow-up: If you can preprocess the array, can you do this in constant time?

const findNextNum = (arr: number[], index: number): number | null => {
  let nextLargestNumIndice: number | null = null;

  const targ: number = arr[index];
  for (let i = 0; i < arr.length; ++i)
    if (i > index) {
      const cur: number = arr[i];

      if (
        cur > targ &&
        (nextLargestNumIndice === null || cur < nextLargestNumIndice)
      )
        nextLargestNumIndice = i;
    }

  return nextLargestNumIndice;
};

// log(findNextNum([4, 1, 3, 5, 6], 1));

//#endregion

//#region

// Good morning! Here's your coding interview problem for today.

// Given a list, sort it using this method: reverse(lst, i, j), which reverses lst from i to j.

// const reverseListSegment = (lst: any[], i: number, j: number): any[] => {
//   const sliceEnd: number = j + 1;

//   const first: any[] = lst.slice(0, i);
//   const middle: any[] = lst.slice(i, sliceEnd);
//   const last: any[] = lst.slice(sliceEnd);

//   middle.reverse();

//   return [...first, ...middle, ...last];
// };

const reverseListSegment = (lst: any[], i: number, j: number): any[] => {
  for (; i <= j; ++i, --j)
    if (lst[i] && lst[j]) {
      const tmp = lst[i];

      lst[i] = lst[j];
      lst[j] = tmp;
    }
  return lst;
};

log(reverseListSegment([1, 2], 0, 2));

//#endregion

//#region

//#endregion
