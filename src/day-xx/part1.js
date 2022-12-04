const R = require('ramda')
const {readInput} = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const main = data => {
  console.log(data)
}

module.exports = {
  getInput,
  getTestInput,
  main
}
