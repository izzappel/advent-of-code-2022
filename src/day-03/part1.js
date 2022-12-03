const R = require('ramda')
const {readInput} = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const getPriority = a => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(a) + 1

const main = data => {
  return data
    .map(rucksack => {
      const half = rucksack.length / 2
      const compartment1 = rucksack.substring(0, half)
      const compartment2 = rucksack.substring(half)
      const misplacedItem = [...compartment2].find(char => compartment1.includes(char))
      return getPriority(misplacedItem)
    })
    .reduce((acc, prio) => acc + prio, 0)
}

module.exports = {
  getInput,
  getTestInput,
  main
}
