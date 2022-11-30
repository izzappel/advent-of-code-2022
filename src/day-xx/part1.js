const R = require('ramda');
const {readInput} = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const main = prop => R.add(parseInt(prop, 10), 1)

module.exports = {
  getInput,
  getTestInput,
  main
}
