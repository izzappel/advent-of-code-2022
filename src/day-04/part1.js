const R = require('ramda')
const {readInput} = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const getNumbersForAssignment = assingment => {
  const [start, end] = assingment.split('-').map(n => parseInt(n, 10))
  const length = end - start + 1
  return Array.from({length: length}, (_, i) => i + start)
}

const isAssignmentCovered = (a1, a2) => R.all(e => a2.includes(e))(a1)

const main = data => {
  const coveredSections = data
    .map(line => line.split(',').map(getNumbersForAssignment))
    .filter(
      ([assingment1, assingment2]) =>
        isAssignmentCovered(assingment1, assingment2) || isAssignmentCovered(assingment2, assingment1)
    )

  return coveredSections.length
}

module.exports = {
  getInput,
  getTestInput,
  main
}
