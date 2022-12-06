const R = require('ramda')
const {readInput} = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = async () => R.head(await readInput(`${__dirname}/input.txt`))

const main = data => {
  const start = [...R.take(4, data)]
  const {index} = R.reduceWhile(
    ({marker}) => R.any(c => marker.filter(m => m === c).length !== 1)(marker),
    (acc, char) => ({
      marker: R.pipe(R.takeLast(3), R.append(char))(acc.marker),
      index: acc.index + 1
    }),
    {marker: start, index: 3},
    [...R.drop(4, data)]
  )
  return index + 1
}

module.exports = {
  getInput,
  getTestInput,
  main
}
