const R = require('ramda')
const {readInput} = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`, {keepEmptyLines: true})

const getInput = () => readInput(`${__dirname}/input.txt`, {keepEmptyLines: true})

const sum = R.reduce((acc, cal) => acc + cal, 0)

const main = data => {
  const grouped = data
    .reduce((acc, calories) => (calories ? [...R.dropLast(1, acc), [...R.last(acc), parseInt(calories, 10)]] : [...acc, []]), [[]])
    .filter(calories => calories.length > 0)
  const sorted = R.sortBy(sum)(grouped)
  return sum(R.last(sorted))
}

module.exports = {
  getInput,
  getTestInput,
  main
}
