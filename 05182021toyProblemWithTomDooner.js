"use strict"

const fs = require("fs")

process.stdin.resume()
process.stdin.setEncoding("utf-8")

let inputString = ""
let currentLine = 0

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin
})

process.stdin.on("end", function () {
  inputString = inputString.split("\n")

  main()
})

function readLine() {
  return inputString[currentLine++]
}

/*
 * Complete the 'goodSegment' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY badNumbers
 *  2. INTEGER lower
 *  3. INTEGER upper
 */

// Hello Josh, Philip and Tavin,

// I recognize that I struggled a bit with this question below. Whether that is attributable to nervousness, not understanding the question or something else is an open question. As I said, I tend to regard programming as more a language skill than a math one, but this experience has opened my eyes to the fact that I need to move past that and devote more time to abstract and number based problems.

// That said, I do not feel that this was the best example of my work as a programmer. I would encourage you to check out my current project at https://github.com/codeforamerica/sb_reentry_app and especially my work at https://github.com/codeforamerica/sb_reentry_app/blob/main/pages/api/singleairtablerecord.ts to see what I feel is a better example of my using step-by-step imperative logic to solve a technical problem.

// Whether I end up moving further in the process or not, I want to to thank you for your time today. Every experience I have, sucessful or otherwise, helps me spot areas where I need to grow and helps me to become a more well-rounded developer.

// naive implementation
// function goodSegment(badNumbers, lower, upper) {

//     const tallyHolder = []
//     let tally = 0

//     for(let i = lower;i <= upper; i++) {
//         if(!badNumbers.includes(i)) tally++
//         else {
//         tallyHolder.push(tally)
//         tally = 0
//         }
//     }

//     tallyHolder.push(tally)

//     return Math.max(...tallyHolder)
// }

function goodSegment(badNumbers, lower, upper) {
  // sort the bad numbers array
  const sortedBadNumbers = badNumbers.sort((a, b) => a - b)

  // any bad numbers lower than lower bound or higher than upper bound, we don't care about them
  const filteredBadNumbers = sortedBadNumbers.filter(
    (num) => num >= lower && num <= upper
  )

  // unshift to the front a bad number that is lower - 1
  // push to the back a bad number that is upper + 1
  filteredBadNumbers.unshift(lower - 1)
  filteredBadNumbers.push(upper + 1)

  let largestSegment = 0
  let currentSegment = 0

  // for each filteredBadNumber:
  for (let i = 0; i < filteredBadNumbers.length; i++) {
    // break if no i+1 bad number
    if (!filteredBadNumbers[i + 1]) break

    // range_start = current bad number + 1
    let rangeStart = filteredBadNumbers[i] + 1
    // range_end = the next bad number - 1
    let rangeEnd = filteredBadNumbers[i + 1] - 1
    // skip if the range_end is less than the range start
    // resultsArr.push(rangeEnd - rangeStart + 1)

    currentSegment = rangeEnd - rangeStart + 1

    if (currentSegment > largestSegment) largestSegment = currentSegment
  }

  return largestSegment

  // find the range with the largest difference (range_end - range_start + 1)
}

/* what we did:
analyzing the problem:
* 1. look for opportunities to sort numbers and iterate over sorted
* 2. analyze the number of iterations your algorithm will do, ask yourself: Can I loop over the fewest things possible?

coming up with algorithm:
1. think through the steps of iterating through the elements
2. write it out in english before code ("add this to the front of the array")
3. run through the example that they give with your algorithm (or a simpler example)

implementing:
1. go through your algo line by line and implement
*/

// lower = 10
// upper = 20
// badnum = [15]

// badnum = [9, 15, 21]
// [10, 14] [16, 20]

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH)

  const badNumbersCount = parseInt(readLine().trim(), 10)

  let badNumbers = []

  for (let i = 0; i < badNumbersCount; i++) {
    const badNumbersItem = parseInt(readLine().trim(), 10)
    badNumbers.push(badNumbersItem)
  }

  const lower = parseInt(readLine().trim(), 10)

  const upper = parseInt(readLine().trim(), 10)

  const result = goodSegment(badNumbers, lower, upper)

  ws.write(result + "\n")

  ws.end()
}
