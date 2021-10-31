// @ts-ignore
const { log } = console
const { abs, trunc, max, min, floor, pow, round, ceil, random } = Math

// Given a list of numbers and a number k, return whether any two numbers from the list add up to k.
// For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.
// Bonus: Can you do this in one pass?

const doesAddUp = (nums: number[], target: number): boolean => {
  let addsUp: boolean = false
  const len: number = nums.length

  if (len > 1) {
    const memo: { [num: string]: true } = {
      [nums[0]]: true,
    }

    for (let i = 1; i < len; i++) {
      const currentNum: number = nums[i]

      if (memo[target - currentNum]) {
        addsUp = true
        break
      } else memo[currentNum] = true
    }
  }

  return addsUp
}

// log(doesAddUp([9, 1], 10))

// Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.
// For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].
// Follow-up: what if you can't use division?

const productOtherThanI = (nums: number[]): number[] => {
  const product: number = nums.reduce((a: number, b: number) => a * b, 1)
  return nums.map((num: number) => product / num)
}

// log(productOtherThanI([3, 2, 1]))

// const productOtherThanIwithoutDivision = (nums: number[]): number[] => {
//   const returnArr: number[] = []

//   for (let i = 0; i < nums.length; i++)
//     returnArr.push(
//       nums.reduce((prevVal, nextVal, j) => {
//         const multipler: number = i === j ? 1 : nextVal
//         return prevVal * multipler
//       }, 1)
//     )

//   return returnArr
// }

// log(productOtherThanIwithoutDivision([3, 2, 1]))

//---

// Given an array of integers, find the first missing positive integer in linear time and constant space. In other words, find the lowest positive integer that does not exist in the array. The array can contain duplicates and negative numbers as well.

// For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0] should give 3.

// You can modify the input array in-place.

const firstMissingInt = (inputNums: number[]): number => {
  let missingInt: number

  if (inputNums.length) {
    const posNums: number[] = [...new Set(inputNums)]
      .filter((num: number) => num > 0)
      .sort((a: number, b: number) => a - b)

    const lastNum: number = posNums[posNums.length - 1]

    const checkNums: number[] = []
    for (let i = 1; i <= lastNum; i++) checkNums.push(i)

    for (let i = 0; i < checkNums.length; i++) {
      const [currentNum, checkNum]: number[] = [posNums[i], checkNums[i]]

      if (currentNum !== checkNum) {
        missingInt = checkNum
        break
      }
    }

    if (!missingInt) missingInt = lastNum + 1
  } else missingInt = 1

  return missingInt
}

// const testArr: number[] = []
// for (let i = 1; i <= 1_000_000; i++) testArr.push(i)

// log(firstMissingInt([...testArr, 1_000_002]))

// Given the mapping a = 1, b = 2, ... z = 26, and an encoded message, count the number of ways it can be decoded.

// For example, the message '111' would give 3, since it could be decoded as 'aaa', 'ka', and 'ak'.

const decoder = (msg: number): number => {
  msg = abs(msg)

  const digits: number[] = []
  while (msg > 0) {
    digits.unshift(msg % 10)
    msg = trunc(msg / 10)
  }

  if (digits[0] === 0) return 0

  const count: number[] = [1, 1]

  for (let i = 2; i <= digits.length; i++) {
    let presentCount: number = 0

    const [prevCount, twoCountsBack, prevDigit, twoDigitsBack]: number[] = [
      count[i - 1],
      count[i - 2],
      digits[i - 1],
      digits[i - 2],
    ]

    if (prevDigit > 0) presentCount = prevCount

    if (twoDigitsBack === 1 || (twoDigitsBack === 2 && prevDigit < 7))
      presentCount += twoCountsBack

    count.push(presentCount)
  }

  return count.pop()
}

// log(decoder(-12626))

// this solution is completely copied and i won't even pretend i understand it. will study though
// altered it a bit and i'm getting it better now

// A unival tree (which stands for "universal value") is a tree where all nodes under it have the same value.

// Given the root to a binary tree, count the number of unival subtrees.

// For example, the following tree has 5 unival subtrees:

//    0
//   / \
//  1   0
//     / \
//    1   0
//   / \
//  1   1

interface Tree {
  [id: number]: {
    parentId: number | null
    value: 0 | 1
  }
}

const simpleTreeData: Tree = {
  1: { parentId: null, value: 0 },
  2: { parentId: 1, value: 1 },
  3: { parentId: 1, value: 0 },
  4: { parentId: 2, value: 1 },
  5: { parentId: 2, value: 0 },
  6: { parentId: 3, value: 1 },
  7: { parentId: 3, value: 1 },
}

const findUnivalTrees = (tree: Tree, target: number): number => {
  let univalTrees: number = 0

  while (tree[target]) {
    const { parentId, value } = tree[target]

    if (parentId && value === tree[parentId].value) univalTrees++

    target++
  }

  return univalTrees
}

// log(findUnivalTrees(simpleTreeData, 1))

// The way I understand it, there are NOT 5 unival subtrees, there are 4. Is it wrong or am I?

// Given a list of integers, write a function that returns the largest sum of non-adjacent numbers. Numbers can be 0 or negative.

// For example, [2, 4, 6, 2, 5] should return 13, since we pick 2, 6, and 5. [5, 1, 1, 5] should return 10, since we pick 5 and 5.

// Follow-up: Can you do this in O(N) time and constant space?

const findLargestNonadjacentSum = (list: number[]): number => {
  const [len, ele0]: number[] = [list.length, list[0]]

  if (!len) return len
  else if (len === 1) return ele0
  else {
    let [maxIncludeI, maxExcludeI]: number[] = [ele0, 0]

    for (let i = 1; i < len; i++) {
      // Current max excluding i
      const currentMax: number =
        maxIncludeI > maxExcludeI ? maxIncludeI : maxExcludeI

      // Current max including i
      maxIncludeI = maxExcludeI + list[i]

      if (currentMax > maxExcludeI) maxExcludeI = currentMax
    }

    return maxIncludeI > maxExcludeI ? maxIncludeI : maxExcludeI
  }
}

// log(findLargestNonadjacentSum([15, 4, 6, 15, 2]))

// above, again copied and modified a bit. i'm gonna stare at it until i get it.

// Implement a job scheduler which takes in a function f and an integer n, and calls f after n milliseconds.

const scheduler = (
  func: (...args: any[]) => any,
  delay: number
): ReturnType<typeof setTimeout> => setTimeout(() => func(), delay)

// scheduler(() => log("sticky joe!"), 2000)

// for (let i = 1; i <= 5; i++) {
//   const delay: number = 1000 * i

// Implement an autocomplete system. That is, given a query string s and a set of all possible query strings, return all strings in the set that have s as a prefix.

// For example, given the query string de and the set of strings [dog, deer, deal], return [deer, deal].

// Hint: Try preprocessing the dictionary into a more efficient data structure to speed up queries.

interface StrStore {
  [aToZ: string]: {
    [aToZ: string]: Set<string>
  }
}

const data: StrStore = {}

const [a, z]: number[] = [97, 122]
for (let i = a; i <= z; i++) {
  const tempObj = {}
  for (let j = a; j <= z; j++)
    tempObj[String.fromCharCode(j)] = new Set<string>()

  data[String.fromCharCode(i)] = tempObj
}

const seed = (str: string): void => {
  if (str.length > 1) {
    const [firstChar, secondChar] = [str[0], str[1]]

    data[firstChar][secondChar].add(str)
  }
}

;["dog", "deer", "deal", "albert", "snacks", "snocks", "sacks"].forEach(seed)

const query = (q: string): string[] => {
  const len: number = q.length

  if (len) {
    const char1: string = q[0]
    let returnList: string[] = []

    if (len === 1)
      Object.values(data[char1]).forEach((set) => {
        if (set.size) returnList = [...returnList, ...set]
      })
    else {
      const char2: string = q[1]
      let tempList = [...data[char1][char2]]

      if (len > 2)
        tempList = tempList.filter((str: string) => str.startsWith(q))

      returnList = tempList
    }

    return returnList.sort()
  } else return []
}

// log(query("de"))

// #endregion

// There exists a staircase with N steps, and you can climb up either 1 or 2 steps at a time. Given N, write a function that returns the number of unique ways you can climb the staircase. The order of the steps matters.

// For example, if N is 4, then there are 5 unique ways:

// 1, 1, 1, 1
// 2, 1, 1
// 1, 2, 1
// 1, 1, 2
// 2, 2

// What if, instead of being able to climb 1 or 2 steps at a time, you could climb any number from a set of positive integers X? For example, if X = {1, 3, 5}, you could climb 1, 3, or 5 steps at a time.

// this solvable with a variation on the fibonacci sequence and trib/quad/etc-nacci variants
// the result of this question with 1 or 2 steps will be the numOfStairs + 1 fib number
// we know that the first two fib numbers are 0 and 1, so we can use those to calculate whatever fib number we need inexpensively
// if there is a different number of max steps, we

const waysToCountStairs = (numOfStairs: number, maxSteps: number): number => {
  const solvedCases: number[] = [0, 1]

  if (maxSteps > 2)
    for (let i = 2; i < maxSteps; i++)
      solvedCases.push(solvedCases[i - 1] + solvedCases[i - 2])

  for (let i = solvedCases.length; i <= numOfStairs + 1; i++) {
    const lastNCases = solvedCases.slice(solvedCases.length - maxSteps)
    const sliceTotal = lastNCases.reduce((total, current) => total + current)

    solvedCases.push(sliceTotal)
  }

  return solvedCases.pop()
}

// log(waysToCountStairs(3, 4))

//#region
//waysToCountStairs(4, 4) => {
// 1) 1 1 1 1
// 2) 2 1 1
// 3) 1 2 1
// 4) 1 1 2
// 5) 2 2
// 6) 3 1
// 7) 1 3
// 8) 4
//}

const dynamicFib = (num: number): number => {
  if (num <= 1) return num

  const memo: number[] = [0, 1]

  for (let i = 2; i <= num; i++) memo.push(memo[i - 1] + memo[i - 2])

  return memo.pop()
}

// const stepCounter = (
//   maxSteps: number[],
// ): string[] => {
//   let allWays = 0

//   numberOfAllowedSteps.forEach((stepsNum: number): void => {
//     const totalWays: number[] = [1]
//     let counter = 0

//     for (let i = 1; i <= numOfStairs; i++) {
//       const [step, prev] = [i - stepsNum - 1, i - 1]

//       if (step >= 0) counter -= totalWays[step]

//       counter += totalWays[prev]
//       totalWays.push(counter)
//     }

//     log(`This many Ways: ${totalWays.toString()}`)
//     allWays.push(totalWays.toString())
//   })

//   return allWays
// }

// log(stepCounter([1,2]))

//Understand dynamic programming with the FAST solution

// Find the first solution

const fib = (num: number): number => {
  // log(num)
  if (num === 0 || num === 1) return num
  else return fib(num - 1) + fib(num - 2)
}

// the above will work with DP
// trying to cut down on work by passing on another variable with the computed result of one recurrance, i.e. tail recursion WILL NOT work with DP
// Some implementations of some languages will automaticcaly change tail recursion to an iterative solution under the hood. for example node for js does this.
// below will not work for DP but may be better in some cases anyway

const fibTail = (num: number, result?: number): number => {
  result += num
  if (num === 0 || num === 1) return num
  else return fibTail(num - 1, result) + fibTail(num - 2, result)
}

// log(fibTail(10))

const bruteKnapsack = (
  items: { weight: number; value: number }[],
  maxWeight: number,
  i: number
): number => {
  //base!
  if ((i = items.length)) return 0
  else {
    const { weight, value } = items[i]

    const [maxMinusWeight, next] = [maxWeight - weight, i + 1]

    if (maxMinusWeight < 0) return bruteKnapsack(items, maxWeight, next)
    else {
      const weightIncludingCurrent: number =
        bruteKnapsack(items, maxMinusWeight, next) + value

      const weightNotIncludingCrrent = bruteKnapsack(items, weight, next)

      return max(weightIncludingCurrent, weightNotIncludingCrrent)
    }
  }
}

// because we are trying to solve sub problems And we have overlapping problems, our fibTail function is a good candidate for DP
const memo: { [key: string]: number } = {}

const topDownFib = (num: number): number => {
  if (num === 0 || num === 1) return num
  else {
    if (memo[num]) return memo[num]
    else {
      memo[num] = fib(num - 1) + fib(num - 2)
      return memo[num]
    }
  }
}

// topDownFib(10)

// const dpFib = (num: number): number => {
//   if (num === 0) return num

//   const memo: number[] = [0, 1]

//   for (let i = 2; i <= num; i++) memo.push(memo[i - 1] + memo[i - 2])

//   return memo.pop()
// }

// log(dpFib(4))

//#endregion

// Given an integer k and a string s, find the length of the longest substring that contains at most k distinct characters.

// For example, given s = "abcba" and k = 2, the longest substring with k distinct characters is "bcb".

//#region
const longestKUniqueCharString = (k: number, s: string): string => {
  const len: number = s.length

  let [longStr, curStr]: string[] = ["", ""]
  const charCount: Set<string> = new Set<string>()

  for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
      const char: string = s[j]
      charCount.add(char)

      if (charCount.size > k) break
      else curStr += char
    }
    if (curStr.length > longStr.length) longStr = curStr

    curStr = ""
    charCount.clear()
  }

  return longStr
}
//#endregion

// log(
//   longestKUniqueCharString(2, "babbbbbbbbbbbbbbiiiiiiiiiiiiiiiiiiiiiiiiiiiiish")
// )

// You run an e-commerce website and want to record the last N order ids in a log. Implement a data structure to accomplish this, with the following API:

// record(order_id): adds the order_id to the log
// get_last(i): gets the ith last element from the log. i is guaranteed to be smaller than or equal to N.
// You should be as efficient with time and space as possible.

class RecordKeeper {
  private records: number[] = []

  public addRecord(record: number): void {
    this.records.push(record)
  }

  public getLast(num?: number): number {
    if (!num) return this.records[this.records.length - 1]
    else return this.records[this.records.length - num]
  }
}

const addRecords = async (
  rec: RecordKeeper,
  max: number
): Promise<RecordKeeper> => {
  for (let i = 1; i <= max; i++)
    await new Promise<void>((resolve) =>
      setTimeout(() => resolve(rec.addRecord(Date.now())), 500)
    )

  return rec
}

// addRecords(new RecordKeeper(), 5).then((rec) => log(rec))

// okay! staying humble. js keeping me humble.
// quick reintroduction to promises and async code in a way i usually do not do it. but this seems sound

// good to remember and easy to forget
// Asynchronous code is always executed after the main thread. ALWAYS

//#region

// callback1 must be called only one time, after 2 seconds.
// callback2 must be called three times with an interval of 1 second.

// const job = (callback1, callback2) => {
//   setTimeout(() => callback1(), 2000)

//   let counter = 0

//   const timer = setInterval(() => {
//     callback2()
//     counter++

//     if (counter > 2) clearInterval(timer)
//   }, 1000)
// }

// job(
//   () => log("first"),
//   () => log("second")
// )
let counter = 0

const promiseCounter = new Promise<number>((resolve, reject) =>
  setTimeout(() => {
    if (counter < 3) resolve(1)
    else reject(0)
  }, 500)
)

// have i fallen off this much with async code?

// The function job must return a promise object (you are in a NodeJS environment, you can use new Promise)
// The promise must resolve itself 2 seconds after the call to job and must provide hello world in the data

const job = (num: number) =>
  new Promise<string>((resolve) =>
    setTimeout(() => resolve("hello world"), num * 1000)
  )

// job(0.5)
//   .then((data) => {
//     log(data)
//     return job(1)
//   })
//   .then((data) => {
//     log(data)
//     return job(1.5)
//   })
//   .then((data) => {
//     log(data)
//     return Promise.resolve("howdy!")
//   })
//   .then((data) => {
//     log(data)
//   })

// Your function must always return a promise
// If data is not a number, return a promise rejected instantly and give the data "error" (in a string)
// If data is an odd number, return a promise resolved 1 second later and give the data "odd" (in a string)
// If data is an even number, return a promise rejected 2 seconds later and give the data "even" (in a string)

const jobs = (data: any): Promise<string> => {
  if (typeof data !== "number")
    return new Promise<string>((_, reject) => reject("error"))
  else {
    if (data % 2 === 0)
      return new Promise<string>((_, reject) =>
        setTimeout(() => reject("even"), 2000)
      )
    else
      return new Promise<string>((resolve) =>
        setTimeout(() => resolve("odd"), 1000)
      )
  }
}

// jobs("test").then((data) => log(data))

// const job = (data) => {
//   if (typeof data !== "number")
//     return new Promise((_, reject) => reject("error"))
//   else {
//     if (data % 2 === 0)
//       return new Promise((_, reject) => setTimeout(() => reject("even"), 2000))
//     else return new Promise((resolve) => setTimeout(() => resolve("odd"), 1000))
//   }
// }

// const proms: Promise<void>[] = []

// for (let i = 1; i <= 6; i++) {
//   const newPromise = new Promise<void>((resolve) => {
//     setTimeout(() => resolve(log(i)), i * 500)
//   })
// }
// proms.push(newPromise)

// Promise.all(proms)

// let central = require("./central"),
//   db1 = require("./db1"),
//   db2 = require("./db2"),
//   db3 = require("./db3"),
//   vault = require("./vault"),
//   mark = require("./mark")

// function database(id: number) {
//   const dbs = { db1, db2, db3 }

//   const centralProm = new Promise((resolve) => resolve(central(id)))
//     .catch(() => Promise.reject("Error central"))
//     .then((db) => dbs[db](id).catch(() => Promise.reject(`Error ${db}`)))

//   const valutProm = new Promise((resolve) => resolve(vault(id))).catch(() =>
//     Promise.reject("Error vault")
//   )

//   return new Promise((resolve, reject) => {
//     Promise.all([centralProm, valutProm])
//       .then(([{ username, country }, { firstname, lastname, email }]) => {
//         mark(id).catch(() => {})

//         resolve({
//           id,
//           username,
//           country,
//           firstname,
//           lastname,
//           email,
//         })
//       })
//       .catch((error) => reject(error))
//   })
// }

//#endregion

// Suppose we represent our file system by a string in the following manner:

// The string "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext" represents:

// dir
//     subdir1
//     subdir2
//         file.ext
// The directory dir contains an empty sub-directory subdir1 and a sub-directory subdir2 containing a file file.ext.

// The string "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext" represents:

// dir
//     subdir1
//         file1.ext
//         subsubdir1
//     subdir2
//         subsubdir2
//             file2.ext
// The directory dir contains two sub-directories subdir1 and subdir2. subdir1 contains a file file1.ext and an empty second-level sub-directory subsubdir1. subdir2 contains a second-level sub-directory subsubdir2 containing a file file2.ext.

// We are interested in finding the longest (number of characters) absolute path to a file within our file system. For example, in the second example above, the longest absolute path is "dir/subdir2/subsubdir2/file2.ext", and its length is 32 (not including the double quotes).

// Given a string representing the file system in the above format, return the length of the longest absolute path to a file in the abstracted file system. If there is no file in the system, return 0.

// Note:

// The name of a file contains at least a period and an extension.

// The name of a directory or sub-directory will not contain a period.

// greedy algorithm?
const longestFilePath = (str: string): number => {
  let longestStringWithExt: string = ""
  const [
    newlineThenTab,
    startsWithTabs,
    allTabs,
    endsWithOneExtension,
    allCharsAfterSlash,
  ]: RegExp[] = [/\n\t/, /^\t+.*$/, /\t/g, /^[^\.]*\.[^/]*$/, /\/.*$/]

  const splitArr: string[] = str.split(newlineThenTab)

  for (let i = 1; i < splitArr.length; i++) {
    const [prevStr, curStr]: string[] = [splitArr[i - 1], splitArr[i]]

    if (!startsWithTabs.test(prevStr) && startsWithTabs.test(curStr)) {
      let newCatString: string

      if (
        endsWithOneExtension.test(prevStr) &&
        !endsWithOneExtension.test(curStr)
      ) {
        newCatString = `${prevStr.replace(
          allCharsAfterSlash,
          ""
        )}/${curStr}`.replace(allTabs, "")
      } else newCatString = `${prevStr}/${curStr}`.replace(allTabs, "")

      splitArr[i] = newCatString

      if (
        newCatString.length > longestStringWithExt.length &&
        endsWithOneExtension.test(newCatString)
      )
        longestStringWithExt = newCatString
    }
  }

  const computedString: string = `${splitArr.shift()}/${longestStringWithExt}`

  log(splitArr, computedString)
  return longestStringWithExt ? computedString.length : 0
}

// log(
//   longestFilePath(
//     "dir\n\tsubdir1\n\t\tfile3.ext\n\t\tsubsubdir1\n\t\tfile1.ext\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tsubsubdir3\n\t\t\tfile2.tiff\n\tsubdir3"
//   )
// )

//how could we make this work for a file not held in a subdirectory?

// Given an array of integers and a number k, where 1 <= k <= length of the array, compute the maximum values of each CONTIGUOUS subarray of length k.

// For example, given array = [10, 5, 2, 7, 8, 7] and k = 3, we should get: [10, 7, 8, 8], since:

// 10 = max(10, 5, 2)
// 7 = max(5, 2, 7)
// 8 = max(2, 7, 8)
// 8 = max(7, 8, 7)

const subArrMax = (nums: number[], target: number): number[] => {
  const results: number[] = []

  for (let i = 0; i < nums.length - target + 1; i++)
    results.push(max(...nums.slice(i, i + target)))

  return results
}

const subArrSum = (nums: number[], target: number): number[] => {
  const results: number[] = []

  for (let i = 0; i < nums.length - target + 1; i++)
    results.push(
      nums.slice(i, i + target).reduce((a: number, b: number) => a + b)
    )

  return results
}

const largestSubArrSum = (nums: number[], target: number): number => {
  let result: number = 0

  for (let i = 0; i < nums.length - target + 1; i++) {
    const sum: number = nums
      .slice(i, i + target)
      .reduce((a: number, b: number) => a + b)

    if (sum > result) result = sum
  }

  return result
}

// log(largestSubArrSum([10, 5, 2, 7, 8, 7, 10], 3))

// Given a dictionary of words and a string made up of those words (no spaces), return the original sentence in a list. If there is more than one possible reconstruction, return any of them. If there is no possible reconstruction, then return null.

// For example, given the set of words 'quick', 'brown', 'the', 'fox', and the string "thequickbrownfox", you should return ['the', 'quick', 'brown', 'fox'].

// Given the set of words 'bed', 'bath', 'bedbath', 'and', 'beyond', and the string "bedbathandbeyond", return either ['bed', 'bath', 'and', 'beyond] or ['bedbath', 'and', 'beyond'].

interface SentenceObj {
  [word: string]: string
}

const sentence: string = "thequickbrownfox"

const sentObj: SentenceObj = {
  the: "the",
  fox: "fox",
  brown: "brown",
  quick: "quick",
}

//#region
const returnSentence = (sen: string, senObj: SentenceObj): string[] => {
  const returnArr: string[] = []

  let wordLen: number = 1
  while (sen) {
    const word = sen.slice(0, wordLen)
    if (senObj[word]) {
      returnArr.push(word)
      sen = sen.slice(wordLen)
      wordLen = 1
    } else wordLen++
  }

  return returnArr
}
//#endregion

const senArr: string[] = [
  "you",
  "and",
  "are",
  "different",
  "it",
  "took",
  "you",
  "leaving",
  "home",
  "for",
  "me",
  "realize",
  "that",
]

const returnSentenceArr = (sen: string, senArr: string[]): string[] => {
  const returnArr: string[] = []

  let wordLen: number = 1
  while (sen) {
    const word = sen.slice(0, wordLen)
    if (senArr.includes(word)) {
      senArr.splice(senArr.indexOf(word), 1)
      returnArr.push(word)
      sen = sen.slice(wordLen)
      wordLen = 1
    } else wordLen++
  }

  return returnArr
}

// log(
//   returnSentenceArr(
//     senArr.reduce((a, b) => (a += b)),
//     senArr
//   )
// )
// log(senArr.toString().replace(",", ""))
//#region
// const returnSentence = (sen: string, senOb: SentenceObj): string[] | null => {
//   const returnArr: string[] = []
//   const lengths: number[] = Object.values(senOb).map(
//     (str: string) => str.length
//   )

//   for (let i = 0; i < sen.length; i++) {
//     const word = sen.slice(0, i + 1)

//     if (senOb[word]) {
//       lengths.splice(lengths.indexOf(i + 1), 1)
//       returnArr.push(word)

//       sen = sen.replace(word, "")
//     }
//   }

//   return returnArr.length ? returnArr : null
// }
//#endregion

// log(returnSentence(sentence, sentObj))

// because i know how to party, let's tackle some dynamic programming!!
// this is different from a greedy algorithm, it has to be run through many times. therefore we must make a table!

const showWork = (table: number[][], padLength: number): void => {
  table.forEach((nums) =>
    log(nums.map((num) => String(num).padStart(padLength, "0")).toString())
  )
  log("\n")
}

const knapSack = (
  maxSackWeight: number,
  weightValues: number[],
  valuesOfItems: number[]
) => {
  const padLength: number = valuesOfItems
    .reduce((nums, cur) => nums + cur)
    .toString().length

  let filler: string = ""
  for (let i = 1; i <= padLength; i++) filler += "_"

  const numberOfValues: number = valuesOfItems.length
  const valuesAsRowsWeightsAsColumns: number[][] = new Array(
    numberOfValues + 1
  ).fill(new Array(maxSackWeight + 1).fill(filler))

  for (let curVal = 0; curVal <= numberOfValues; curVal++) {
    valuesAsRowsWeightsAsColumns[curVal] = new Array(maxSackWeight + 1)

    for (let curWght = 0; curWght <= maxSackWeight; curWght++) {
      if (curVal === 0 || curWght === 0)
        valuesAsRowsWeightsAsColumns[curVal][curWght] = 0
      else {
        const prevVal: number = curVal - 1

        if (weightValues[prevVal] <= curWght) {
          valuesAsRowsWeightsAsColumns[curVal][curWght] = max(
            valuesOfItems[prevVal] +
              valuesAsRowsWeightsAsColumns[prevVal][
                curWght - weightValues[prevVal]
              ],
            valuesAsRowsWeightsAsColumns[prevVal][curWght]
          )
        } else {
          valuesAsRowsWeightsAsColumns[curVal][curWght] =
            valuesAsRowsWeightsAsColumns[prevVal][curWght]
        }
      }
    }
    showWork(valuesAsRowsWeightsAsColumns, padLength)
  }

  return valuesAsRowsWeightsAsColumns[numberOfValues][maxSackWeight]
}

// log(knapSack(4, [1, 2, 3], [6, 10, 12]))

// You are given an M by N matrix consisting of booleans that represents a board. Each True boolean represents a wall. Each False boolean represents a tile you can walk on.

// Given this matrix, a start coordinate, and an end coordinate, return the minimum number of steps required to reach the end coordinate from the start. If there is no possible path, then return null. You can move up, left, down, and right. You cannot move through walls. You cannot wrap around the edges of the board.

// For example, given the following board:

// [[f, f, f, f],
// [t, t, f, t],
// [f, f, f, f],
// [f, f, f, f]]
// and start = (3, 0) (bottom left) and end = (0, 0) (top left), the minimum number of steps required to reach the end is 7, since we would need to go through (1, 2) because there is a wall everywhere else on the second row.

class Queue<T> {
  private data: T[] = []

  get size(): number {
    return this.data.length
  }

  public report(): void {
    if (this.data.length) {
      this.data.forEach((val: T) => console.log(val))
      console.log("\n")
    }
  }

  public enqueue(item: T): this {
    if (item) this.data.push(item)
    return this
  }

  public dequeue(): T {
    if (this.data.length) return this.data.shift()
  }

  constructor(item?: T) {
    item && this.enqueue(item)
  }
}

interface Coord {
  x: number
  y: number
}

interface VisitNode {
  pt: Coord
  steps: number
}

type Maze = Array<Array<0 | 1>>

const grid: Maze = [
  [0, 0, 0, 0],
  [1, 1, 0, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]

const start: Coord = { x: 3, y: 0 }
const end: Coord = { x: 0, y: 0 }

const leastStepsInMaze = (mz: Maze, st: Coord, end: Coord): number => {
  let finalSteps: number = -1
  if (mz[st.x][st.y] || mz[end.x][end.y]) return finalSteps

  const visited: Maze = mz.map((arr) => arr.map(() => 0))
  visited[st.x][st.y] = 1

  const visitAndDistanceQueue = new Queue<VisitNode>({ pt: st, steps: 0 })

  const rowNum: number[] = [-1, 0, 0, 1]
  const colNum: number[] = [0, -1, 1, 0]

  while (visitAndDistanceQueue.size) {
    const { pt, steps }: VisitNode = visitAndDistanceQueue.dequeue()

    if (pt.x === end.x && pt.y === end.y) {
      finalSteps = steps
      break
    } else {
      for (let i = 0; i < 4; i++) {
        const [row, col]: number[] = [pt.x + rowNum[i], pt.y + colNum[i]]

        if (
          row >= 0 &&
          row < mz.length &&
          col >= 0 &&
          col < mz[0].length &&
          !mz[row][col] &&
          !visited[row][col]
        ) {
          visited[row][col] = 1
          const nextVisitNode: VisitNode = {
            pt: { x: row, y: col },
            steps: steps + 1,
          }

          visitAndDistanceQueue.enqueue(nextVisitNode)
        }
      }
    }
    visitAndDistanceQueue.report()
  }

  return finalSteps
}

// log(leastStepsInMaze(grid, start, end))

// Given a singly linked list and an integer k, remove the kth last element from the list. k is guaranteed to be smaller than the length of the list.

// The list is very long, so making more than one pass is prohibitively expensive.

// Do this in constant space and in one pass.
type NodeInit<T> = ListNode<T> | null

class ListNode<T> {
  public value!: T
  public next!: NodeInit<T>

  constructor(value: T) {
    this.value = value
    this.next = null
  }
}

class List<T> {
  private head: NodeInit<T> = null
  private tail: NodeInit<T> = null
  private size: number = 0

  get length(): number {
    return this.size
  }

  private assignFirstNode(node: ListNode<T>): void {
    this.head = this.tail = node
    this.head.next = node
  }

  public push(value: T): ListNode<T> {
    const node: ListNode<T> = new ListNode(value)

    if (!this.tail) this.assignFirstNode(node)
    else {
      this.tail.next = node
      this.tail = node
    }
    this.size++
    return node
  }

  remove(index: number): ListNode<T> | (() => ListNode<T>) {
    if (index < 0) return null

    let [previous, current]: ListNode<T>[] = [null, this.head]
    let currentIndex: number = 0

    while (current && currentIndex !== index) {
      previous = current
      current = current.next
      log(currentIndex)
      currentIndex++
    }

    previous!.next = current!.next

    current!.next = null
    this.size--

    return current
  }
}

// const listyList: List<string> = new List<string>()

// ;["I", "am", "full", "of", "salt", "and", "wisdom"].forEach((str) =>
//   listyList.push(str)
// )
// log(listyList.remove(3))

// Given a string of round, curly, and square open and closing brackets, return whether the brackets are balanced (well-formed).

// For example, given the string "([])[]({})", you should return true.

// Given the string "([)]" or "((()", you should return false.

const areBracketsBalanced = (brackets: string): boolean => {
  if (brackets.length % 2 !== 0) return false
  else {
    const stack: string[] = []

    const matchingBrackets: { [bracket: string]: string } = {
      ")": "(",
      "]": "[",
      "}": "{",
    }
    const bracketVals = new Set<string>(Object.values(matchingBrackets))

    for (const bracket of brackets) {
      if (bracketVals.has(bracket)) stack.push(bracket)
      else if (!stack.length || matchingBrackets[bracket] !== stack.pop())
        return false
    }

    return stack.length === 0
  }
}

// log(areBracketsBalanced("([])[]({})"))

// Write an algorithm to justify text. Given a sequence of words and an integer line length k, return a list of strings which represents each line, fully justified.

// More specifically, you should have as many words as possible in each line. There should be at least one space between each word. Pad extra spaces when necessary so that each line has exactly length k. Spaces should be distributed as equally as possible, with the extra spaces, if any, distributed starting from the left.

// If you can only fit one word on a line, then you should pad the right-hand side with spaces.

// Each word is guaranteed not to be longer than k.

// For example, given the list of words ["the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"] and k = 16, you should return the following:

// ["the  quick brown", # 1 extra space on the left
// "fox  jumps  over", # 2 extra spaces distributed evenly
// "the   lazy   dog"] # 4 extra spaces distributed evenly

//#region
// const justify = (words: string[], target: number) => {
//   const subArrs: string[][] = []

//   const len: number = words.length
//   let [totalLength, minSpaces]: number[] = [0, 0]
//   let currArr: string[] = []

//   for (let i = 0; i < len; i++) {
//     const [curWord, nextWord]: string[] = [words[i], words[i + 1]]
//     const { length } = curWord

//     if (nextWord && totalLength + minSpaces + nextWord.length > target) {
//       subArrs.push(currArr)
//       totalLength = 0
//       minSpaces = 0
//       currArr = []
//     }

//     if (length + totalLength <= target) {
//       currArr.push(curWord)
//       totalLength += length
//       if (currArr.length) minSpaces++
//     } else {
//       subArrs.push(currArr)
//       totalLength = 0
//       minSpaces = 0
//       currArr = []
//     }

//     if (i === len - 1) subArrs.push(currArr)
//   }

//   return subArrs
// }

// const justify = (words: string[], target: number) => {
//   const subArrs: string[][] = []
//   const idx = target - 1

//   let joined: string = words.join(" ")
//   let i = idx

//   while (joined) {
//     if (joined[i] === " " || !joined[i]) {
//       subArrs.push(joined.slice(0, i).split(" "))
//       joined = joined.slice(i)
//       i = idx
//     } else i--
//     log(joined)
//   }

//   const spaceCounts: number[] = subArrs.map(
//     (words: string[]) => words.length - 1
//   )
//   const spacesNeeded: number[] = subArrs.map(
//     (words: string[]) => target - words.join(" ").length
//   )

//   return [subArrs, spaceCounts, spacesNeeded]
// }
//#endregion

const justify = (words: string[], target: number) => {
  const arrsLessThanTarget = []

  let i: number = 1
  while (words.length) {
    const slice: string[] = words.slice(0, i)
    const len: number = slice.join(" ").length

    if (len === target) {
      arrsLessThanTarget.push(slice)
      words = words.slice(i)
      i = 1
    } else if (len > target) {
      const sliceMinusOne: string[] = words.slice(0, i - 1)

      arrsLessThanTarget.push(sliceMinusOne)
      words = words.slice(sliceMinusOne.length)
    } else {
      if (i >= words.length) {
        arrsLessThanTarget.push(words)
        words = []
      } else i++
    }
  }

  const counts: { spacesCurrentlyInArr: number; spacesNeededInArr: number }[] =
    arrsLessThanTarget.map((words: string[]) => ({
      spacesCurrentlyInArr: words.length - 1,
      spacesNeededInArr: target - words.join(" ").length,
    }))

  for (let i = 0; i < arrsLessThanTarget.length; i++) {
    let { spacesCurrentlyInArr, spacesNeededInArr } = counts[i]

    if (spacesNeededInArr % 2 !== 0) {
      arrsLessThanTarget[i][0] = `${arrsLessThanTarget[i][0]} `
      spacesNeededInArr--
    }

    if (arrsLessThanTarget[i].length === 1)
      arrsLessThanTarget[i][0] = `${arrsLessThanTarget[i][0]}${" ".repeat(
        spacesNeededInArr
      )}`

    for (let j = 1; j < arrsLessThanTarget[i].length; j++)
      arrsLessThanTarget[i][j] = `${" ".repeat(
        spacesNeededInArr / spacesCurrentlyInArr
      )}${arrsLessThanTarget[i][j]}`

    arrsLessThanTarget[i] = arrsLessThanTarget[i].join(" ")
  }

  return arrsLessThanTarget
}

// log(
//   justify(
//     [
//       "Zazeleplass,",
//       "the",
//       "quick",
//       "brown",
//       "fox,",
//       "jumped",
//       "over",
//       "the",
//       "lazy",
//       "dawg",
//       "booii",
//       "ooooi!",
//     ],
//     16
//   )
// )

// Run-length encoding is a fast and simple method of encoding strings. The basic idea is to represent repeated successive characters as a single count and character. For example, the string "AAAABBBCCDAA" would be encoded as "4A3B2C1D2A".

// Implement run-length encoding and decoding. You can assume the string to be encoded have no digits and consists solely of alphabetic characters. You can assume the string to be decoded is valid.

const runLenEncode = (str: string): string => {
  let [finalStr, i]: [string, number] = ["", 0]

  while (str) {
    const [curChar, nxtChar]: string[] = [str[i], str[i + 1]]

    if (curChar !== nxtChar) {
      const len: number = i + 1

      finalStr += `${len}${curChar}`
      str = str.slice(len)
      i = 0
    } else i++
  }

  return finalStr
}

const runLenDecode = (str: string) => {
  let [finalStr, curStr]: string[] = ["", ""]
  let i: number = 0

  const onlyNumbers: RegExp = /^[0-9]+$/

  while (str) {
    const [curChar, nxtChar]: string[] = [str[i], str[i + 1]]

    curStr += curChar
    if (onlyNumbers.test(curStr) && !onlyNumbers.test(nxtChar)) {
      finalStr += nxtChar.repeat(+curStr)
      str = str.slice(i + 2)
      i = 0
      curStr = ""
    } else i++
  }

  return finalStr
}

// const strToEncode: string = "AAAAAAAAAAAAAAAAAAAABBBCCDAAQ"
// const decodedString: string = runLenDecode(runLenEncode(strToEncode))

// log(strToEncode === decodedString)

// You are given an array of non-negative integers that represents a two-dimensional elevation map where each element is unit-width wall and the integer is the height. Suppose it will rain and all spots between two walls get filled up.

// Compute how many units of water remain trapped on the map in O(N) time and O(1) space.

// For example, given the input [2, 1, 2], we can hold 1 unit of water in the middle.

// Given the input [3, 0, 1, 3, 0, 5], we can hold 3 units in the first index, 2 in the second, and 3 in the fourth index (we cannot hold 5 since it would run off to the left), so we can trap 8 units of water.

const maxWater = (n: number[]): number => {
  let result: number = 0

  let [lIdx, rIdx]: number[] = [0, n.length - 1]
  let [lMax, rMax]: number[] = [0, 0]

  for (const _ of n) {
    if (rMax <= lMax) {
      const rVal: number = n[rIdx]

      result += max(0, rMax - rVal)
      rMax = max(rMax, rVal)

      rIdx -= 1
    } else {
      const lVal: number = n[lIdx]

      result += max(0, lMax - lVal)
      lMax = max(lMax, lVal)

      lIdx += 1
    }
  }
  return result
}

// log(maxWater([3, 0, 1, 3, 7, 0, 7, 4, 11, 11]))

// The edit distance between two strings refers to the minimum number of character insertions, deletions, and substitutions required to change one string to the other. For example, the edit distance between “kitten” and “sitting” is three: substitute the “k” for “s”, substitute the “e” for “i”, and append a “g”.

// Given two strings, compute the edit distance between them.

const editDistance = (str1: string, str2: string): number => {
  let distance: number = 0

  const maxNum: number = max(str1.length, str2.length)
  const minNum: number = min(str1.length, str2.length)

  for (let i = 0; i < minNum; i++) if (str1[i] !== str2[i]) distance++
  if (maxNum !== minNum) distance += maxNum - minNum

  return distance
}

// log(editDistance("kitten", "sitting"))

// above will work assuming the string start out as the same. but why assume that?
// my studies of dynamic programming should help me understand the levenshtien distance better too

// Compute the running median of a sequence of numbers. That is, given a stream of numbers, print out the median of the list so far on each new element.

// Recall that the median of an even-numbered list is the average of the two middle numbers.

// For example, given the sequence [2, 1, 5, 7, 2, 0, 5], your algorithm should print out:

// 2
// 1.5
// 2
// 3.5
// 2
// 2
// 2

const numIsEven = (num: number): boolean => num % 2 === 0

const runningMedian = (nums: number[]): void => {
  for (let i = 1; i <= nums.length; i++) {
    const curNums: number[] = nums.slice(0, i).sort((a, b) => a - b)

    const { length } = curNums
    const mid: number = length / 2

    if (numIsEven(length)) log((curNums[mid - 1] + curNums[mid]) / 2)
    else log(curNums[floor(mid)])
  }
}

// runningMedian([2, 1, 5, 7, 2, 0, 5])

// Given two numbers as strings. The numbers may be very large (may not fit in long long int), the task is to find sum of these two numbers without turning them into numbers.

const from = (num: number): string => String.fromCharCode(num)
const code = (str: string): number => str.charCodeAt(0)
const rev = (str: string): string => str.split("").reverse().join("")

const findSum = (str1: string, str2: string): string => {
  // Make an empty string for storing result
  let str: string = ""

  // Make sure length of str2 is larger.
  if (str1.length > str2.length) {
    const temp: string = str1
    str1 = str2
    str2 = temp
  }

  // Find length of both strings
  const len1: number = str1.length,
    len2: number = str2.length

  const _48 = code("0")

  // Reverse both strings
  str1 = rev(str1)
  str2 = rev(str2)

  let carry: number = 0
  for (let i = 0; i < len1; i++) {
    // Do school mathematics, compute sum of
    // current digits and carry
    const sum: number = code(str1[i]) - _48 + (code(str2[i]) - _48) + carry
    str += from((sum % 10) + _48)

    // Calculate carry for next step
    carry = floor(sum / 10)
  }

  // Add remaining digits of larger number
  for (let i = len1; i < len2; i++) {
    const sum: number = code(str2[i]) - _48 + carry

    str += from((sum % 10) + _48)
    carry = floor(sum / 10)
  }

  // Add remaining carry
  if (carry > 0) str += from(carry + _48)

  return rev(str)
}

let str1 = "12"
let str2 = "198111"

// log(findSum(str1, str2))

// 198123

// This problem was asked by Google.

// The power set of a set is the set of all its subsets. Write a function that, given a set, generates its power set.

// For example, given the set {1, 2, 3}, it should return {{}, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}}.
// probably will do this as an array though

const powerSet = (arr: number[]): number[][] => {
  const powers: number[][] = []

  // cache the length of the input array
  const aLen: number = arr.length

  // the total number of sets that the power set will contain
  const total: number = pow(2, aLen)

  // loop through each value from 0 to 2^n
  for (let i = 0; i < total; i++) {
    const tempSet: number[] = []

    // convert the integer to binary padded to the length of the arr with zeros
    const binNumStr: string = i.toString(2).padStart(aLen, "0")

    log(binNumStr)

    // build the set that matches the 1's in the binary number
    for (let j = 0; j < binNumStr.length; j++)
      if (binNumStr[j] === "1") tempSet.push(arr[j])

    // add this set to the final power set
    powers.push(tempSet)
  }
  return powers
}

// log(powerSet([1, 2, 3]))

// Given an array of integers where every integer occurs three times except for one integer, which only occurs once, find and return the non-duplicated integer.

// For example, given [6, 1, 3, 3, 3, 6, 6], return 1. Given [13, 19, 13, 13], return 19.

// Do this in O(N) time and O(1) space.
// and the above is the tough part

// const intAppearsOnce = (nums: number[]): number => {
//   for (let i = 0; i < nums.length; i++)
//     if (i === nums.lastIndexOf(nums[i])) return nums[i]
//   return -1
// }

// const intAppearsOnce = (nums: number[]): number => {
//   const counter: { [int: string]: number } = {}

//   for (const num of nums) counter[num] = ++counter[num] || 1
//   for (const [key, value] of Object.entries(counter))
//     if (value === 1) return +key
// }

// the pace efficency isn't quite as good in this one, but it is a bit more durable. specifically, this will return the FIRST integer that appears only once
// const intAppearsOnce = (nums: number[]): number => {
//   const counter: { [int: string]: number } = nums.reduce((count, num) => {
//     count[num] = ++count[num] || 1
//     return count
//   }, {})

//   for (const [key, value] of Object.entries(counter))
//     if (value === 1) return +key
// }

const intAppearsOnce = (nums: number[]): number => {
  if (nums.length > 1) {
    nums.sort((a, b) => a - b)

    const len: number = nums.length - 1
    for (let i = 1; i < len; i++) {
      const [prv, cur, nxt]: number[] = [nums[i - 1], nums[i], nums[i + 1]]

      if (i === 1) {
        if (prv !== cur && cur === nxt) return prv
      } else if (i === len - 1) {
        if (prv === cur && cur !== nxt) return nxt
      } else if (prv !== cur && cur !== nxt) return cur
    }
  } else return nums.length ? nums[0] : -1
}

// log(intAppearsOnce([0, 1, 0, 1, 0, 1, 99]))

// Given a list of integers S and a target number k, write a function that returns a subset of S that adds up to k. If such a subset cannot be made, then return null.

// Integers can appear more than once in the list. You may assume all numbers in the list are positive.

// For example, given S = [12, 1, 61, 5, 9, 2] and k = 24, return [12, 9, 2, 1] since it sums up to 24.

const subsetAddsTo = (arr: number[], target: number): number[] | null => {
  const smallNums: number[] = arr.filter((num) => num <= target)
  const len: number = smallNums.length
  const possibleCombos: number = pow(2, len)

  for (let i = 0; i < possibleCombos; i++) {
    const subSetArr: number[] = []
    const binNumStr: string = i.toString(2).padStart(len, "0")

    for (let j = 0; j < len; j++)
      if (binNumStr[j] === "1") subSetArr.push(smallNums[j])

    const sum: number = subSetArr.reduce((sum, num) => sum + num, 0)

    if (sum === target) return subSetArr
  }
  return null
}

// log(subsetAddsTo([16, 12, 1, 61, 5, 9, 2], 17))

class NumStack {
  private data: number[] | null = null
  private maxVal: number | null = null

  get max(): number | null {
    return this.maxVal
  }

  public push(num: number): this {
    if (!this.data) this.data = []

    this.data.push(num)

    if (this.maxVal === null || num > this.maxVal) this.maxVal = num

    return this
  }

  public pop(): number | null {
    if (this.data === null) return null
    else {
      const returnVal: number = this.data.pop()

      if (!this.data.length) {
        this.data = null
        this.maxVal = null
      } else if (returnVal === this.maxVal) this.maxVal = max(...this.data)

      return returnVal
    }
  }
}

// const numsStack = new NumStack()

// ;[1, 2, 6, 3, 5, 7].forEach((num) => numsStack.push(num))

// log(numsStack.max)
// log(numsStack.pop())
// log(numsStack.max)

const largestSubset = (arr: number[], target: number): number[] | null => {
  const matchingSubsets: number[][] = []
  const smallNums: number[] = arr.filter((num) => num <= target)
  const len: number = smallNums.length
  const possibleCombos: number = pow(2, len)

  for (let i = 0; i < possibleCombos; i++) {
    const subSetArr: number[] = []
    const binNumStr: string = i.toString(2).padStart(len, "0")

    for (let j = 0; j < len; j++)
      if (binNumStr[j] === "1") subSetArr.push(smallNums[j])

    const sum: number = subSetArr.reduce((sum, num) => sum + num, 0)

    if (sum === target) matchingSubsets.push(subSetArr)
  }
  return matchingSubsets.length
    ? matchingSubsets.sort((a, b) => a.length - b.length).pop()
    : null
}

//#region
// log(largestSubset([16, 12, 1, 61, 4, 17, 9, 2, 1, 3], 17))

// We can determine how "out of order" an array A is by counting the number of inversions it has.
// Two elements A[i] and A[j] form an inversion if A[i] > A[j] but i < j. That is, a smaller element appears after a larger element.

// Given an array, count the number of inversions it has. Do this faster than O(N^2) time.

// You may assume each element in the array is distinct.

// For example, a sorted list has zero inversions. The array [2, 4, 1, 3, 5] has three inversions: (2, 1), (4, 1), and (4, 3). The array [5, 4, 3, 2, 1] has ten inversions: every distinct pair forms an inversion.

// let iter: number = 0

// ;[5, 4, 3, 2, 1].sort((a, b) => {
//   iter++
//   return a - b
// })

// log(iter)
//#endregion

// Using a function rand5() that returns an integer from 1 to 5 (inclusive) with uniform probability
// implement a function rand7() that returns an integer from 1 to 7 (inclusive).

const rand5 = (): number => ceil(random() * 5)

const rand7 = (): number => {
  const first5: number = rand5()

  if (first5 < 5) return first5
  else {
    const next2: number = round(random() * 2)
    return first5 + next2
  }
}

// log(rand7())

// Given a string, find the longest palindromic contiguous substring. If there are more than one with the maximum length, return any one.
// For example, the longest palindromic substring of "aabcdcb" is "bcdcb". The longest palindromic substring of "bananas" is "anana".

const isPal = (str: string): boolean => {
  const len: number = str.length
  for (let i: number = 0; i < Math.floor(len / 2); i++)
    if (str[i] !== str[len - 1 - i]) return false
  return true
}

const longestPalindromeSubstr = (str: string): string => {
  let palStr: string = ""

  const sLen: number = str.length
  for (let i = 0; i < sLen; i++)
    for (let j = i; j < sLen; j++) {
      const cur: string = str.slice(i, j + 1)
      const cLen: number = cur.length
      if (cLen > 1 && cLen > palStr.length && isPal(cur)) palStr = cur
    }
  return palStr
}

// log(isPal("howdydwoh"))

// log(longestPalindromeSubstr("bananas"))

// Given a array of numbers representing the stock prices of a company in chronological order, write a function that calculates the maximum profit you could have made from buying and selling that stock once. You must buy before you can sell it.

// For example, given [9, 11, 8, 5, 7, 10], you should return 5, since you could buy the stock at 5 dollars and sell it at 10 dollars.

// const maxProfit = (nums: number[]): number => {
//   let [max, lowBuy, highSell]: number[] = [0, nums[0], 0]

//   const len: number = nums.length
//   if (len > 1)
//     for (let i = 1; i < len; i++) {
//       const curPrice: number = nums[i]

//       if (curPrice < lowBuy) lowBuy = curPrice
//       else if (curPrice > highSell) highSell = curPrice

//       max = highSell - lowBuy
//     }

//   return max
// }

const maxProfit = (nums: number[]): number => {
  let [max, lowBuy]: number[] = [0, nums[0]]

  const len: number = nums.length
  if (len > 1)
    for (let i = 1; i < len; i++) {
      const curPrice: number = nums[i]
      if (curPrice < lowBuy) lowBuy = curPrice

      const curSell: number = curPrice - lowBuy
      if (curSell > max) max = curSell
    }

  return max
}

// log(maxProfit([]))

const maxSubArraySum = (nums: number[]): number => {
  let [subArrMax, curMax]: number[] = [nums[0], nums[0]]

  for (let i = 1; i < nums.length; i++) {
    curMax = max(nums[i], curMax + nums[i])
    subArrMax = max(subArrMax, curMax)
  }
  return subArrMax
}

// log(maxSubArraySum([34, -50, 42, 5]))

// # Complete a function that returns a list containing all the mismatched words (case sensitive) between two given input strings
// #  For example: # - string 1 : "Firstly this is the first string" #
// #  - string 2 : "Next is the second string" # #
// #  - output : ['Firstly', 'this', 'first', 'Next', 'second']

interface CounterObj {
  [key: string]: number
}

const notPresentInBothStr = (str1: string, str2: string): string[] => {
  const set1: Set<string> = new Set<string>(str1.split(" "))
  const set2: Set<string> = new Set<string>(str2.split(" "))

  const catStringArr: string[] = [...set1, ...set2]
  const counter: CounterObj = catStringArr.reduce(
    (counter: CounterObj, str: string) => {
      counter[str] = ++counter[str] || 1
      return counter
    },
    {}
  )

  const finalList: string[] = Object.entries(counter).reduce(
    (arr: string[], [key, val]: [string, number]) => {
      if (val === 1) arr.push(key)
      return arr
    },
    []
  )

  return finalList
}

// log(
//   notPresentInBothStr(
//     "Firstly this is the first string",
//     "Next is the second string"
//   )
// )

const notPresentInAllStr = (...strings: string[]): string[] => {
  const stringsSet: Set<string>[] = strings.map(
    (str: string) => new Set<string>(str.split(" "))
  )

  const catStringArr: string[] = stringsSet.reduce(
    (arr: string[], set: Set<string>) => [...arr, ...set],
    []
  )

  const counter: CounterObj = catStringArr.reduce(
    (counter: CounterObj, str: string) => {
      counter[str] = ++counter[str] || 1
      return counter
    },
    {}
  )

  const finalList: string[] = Object.entries(counter).reduce(
    (arr: string[], [key, val]: [string, number]) => {
      if (val === 1) arr.push(key)
      return arr
    },
    []
  )

  return finalList
}

// log(
//   notPresentInAllStr(
//     "Firstly this is the first string",
//     "Next is the second string",
//     "this is rad too"
//   )
// )

// const removeCharAt = (str: string, index: number) => {
//   const tmp: string[] = str.split("")
//   tmp.splice(index, 1)
//   return tmp.join("")
// }

// const removeCharAt = (str: string, i: number): string => {
//   let final: string

//   const len: number = str.length
//   const last: number = len - 1
//   if (len <= 1) final = ""
//   else {
//     if (i < 0 || i >= len) final = str
//     if (i === 0) final = str.slice(1)
//     else if (i === last) final = str.slice(0, last)
//     else final = `${str.slice(0, i)}${str.slice(i + 1)}`
//   }

//   return final
// }

//@ts-ignore
String.prototype.removeCharAt = function (i: number): String {
  if (!this.length || i < 0 || i >= this.length) return this
  else if (i === 0) return this.slice(1)
  else if (i === this.length - 1) return this.slice(0, this.length - 1)
  else return this.slice(0, i) + this.slice(i + 1)
}

let blah = new String("shmeh")

//@ts-ignore
// log(blah.removeCharAt(2))

// const amazonStringEncode = (numOfRows: number, encodedStr: string): string => {
//   let translated: string = ""

//   const len: number = encodedStr.length
//   const rowLen: number = len / numOfRows + 1

//   for (let i: number = 0; i < rowLen; i++)
//     for (let j: number = i; j < len; j += rowLen) translated += encodedStr[j]

//   const final: string = translated.replace(/_/g, " ").trim()

//   return final
// }

// log(amazonStringEncode(3, "mnes__ya_____mi") === "my name is")
// log(amazonStringEncode(2, "hlowrd_el_ol") === "hello world")

// mnes_
// _ya__
// ___mi

// hlowrd
// _el_ol

const amazonStringEncodeOptimized = (
  numOfRows: number,
  encodedStr: string
): string | null => {
  if (!numOfRows || !encodedStr) return null

  const len: number = encodedStr.length
  const rowLen: number = len / numOfRows

  let translated: string = ""
  let [i, j]: number[] = [0, 0]
  while (encodedStr[i]) {
    translated += encodedStr[i]
    i += rowLen + 1

    if (i > len) i = ++j
  }

  const final: string = translated.replace(/_/g, " ").trim()
  return final
}

log(amazonStringEncodeOptimized(3, "mnes__ya_____mi"))
log(amazonStringEncodeOptimized(2, "sel_at__mlyfrz"))
log(amazonStringEncodeOptimized(2, "hlowrd_el_ol"))
log(amazonStringEncodeOptimized(5, "hdete____oorrr____w_ea_____dt_n_____yhsg"))
