const R = require('ramda')
const {readInput} = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const getNumbersForAssignment = assingment => {
  const [start, end] = assingment.split('-').map(n => parseInt(n, 10))
  const length = end - start + 1
  return Array.from({length: length}, (_, i) => i + start)
}

const isAssignmentOverlapping = (a1, a2) => R.any(e => a2.includes(e))(a1)

const main = data => {
  const overlappingSections = data
    .map(line => line.split(',').map(getNumbersForAssignment))
    .filter(
      ([assingment1, assingment2]) =>
        isAssignmentOverlapping(assingment1, assingment2) || isAssignmentOverlapping(assingment2, assingment1)
    )

  return overlappingSections.length
}

module.exports = {
  getInput,
  getTestInput,
  main
}
