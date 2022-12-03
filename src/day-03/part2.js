const R = require('ramda')
const {readInput} = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const getPriority = a => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(a) + 1

const findBadgeItem = ([rucksack1, rucksack2, rucksack3]) =>
  [...rucksack1].find(c => rucksack2.includes(c) && rucksack3.includes(c))

const main = data => {
  return data
    .reduce(
      (acc, rucksack) =>
        R.last(acc).length === 3 ? [...acc, [rucksack]] : [...R.dropLast(1, acc), [...R.last(acc), rucksack]],
      [[]]
    )
    .map(group => getPriority(findBadgeItem(group)))
    .reduce((acc, prio) => acc + prio, 0)
}

module.exports = {
  getInput,
  getTestInput,
  main
}
