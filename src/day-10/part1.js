const R = require('ramda')
const {readInput} = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const isInterestingCycle = cycle => (cycle - 20) % 40 === 0
const getInterestingCycle = (cycleStart, cycleEnd) => {
  return [...Array(cycleEnd - cycleStart + 1).keys()].map(i => i + cycleStart).find(isInterestingCycle)
}

const main = data => {
  const result = data.reduce(
    ({cycle, singalStrengths, x}, line) => {
      const isNoop = line === 'noop'
      const duration = isNoop ? 1 : 2
      const interestingCycle = getInterestingCycle(cycle, cycle + duration - 1)

      const add = isNoop ? 0 : parseInt(line.split(' ')[1], 10)
      return {
        x: x + add,
        cycle: cycle + duration,
        singalStrengths: interestingCycle ? [...singalStrengths, interestingCycle * x] : singalStrengths
      }
    },
    {x: 1, cycle: 1, singalStrengths: []}
  )
  const sum = result.singalStrengths.reduce((acc, s) => acc + s, 0)
  return sum
}

module.exports = {
  getInput,
  getTestInput,
  main
}
