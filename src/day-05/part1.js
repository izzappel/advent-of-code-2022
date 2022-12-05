const R = require('ramda')
const {readInput} = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`, {keepEmptyLines: true})

const getInput = () => readInput(`${__dirname}/input.txt`, {keepEmptyLines: true})

const extractCrates = line => line.match(/(\[[A-Z]\]|\s{4})/gm).map(c => c.replace(/[\[\]\s]/gm, ''))
const extractMove = line => line.match(/\d{1,}/gm).map(c => parseInt(c, 10))

const move = (from, to, many, crates) => {
  // [ [ 'Z', 'N' ], [ 'M', 'C', 'D' ], [ 'P' ] ]
  const fromIndex = from - 1
  const toIndex = to - 1
  const moveableCrates = R.reverse(R.takeLast(many, crates[fromIndex]))

  const remove = crates => R.adjust(fromIndex, R.dropLast(many), crates)
  const add = R.curry((c, crates) => R.adjust(toIndex, R.concat(R.__, c), crates))

  return R.pipe(add(moveableCrates), remove)(crates)
}

const main = data => {
  const {moves, crates} = data.reduce(
    (acc, line) => {
      if (line.includes('[')) {
        // [ [ '', 'D', '' ], [ 'N', 'C', '' ], [ 'Z', 'M', 'P' ] ]
        const c = extractCrates(line)

        // [ 'N', 'C', '' ] => ['N']['C', 'D'][]
        const crates = c.map((s, i) => [s, ...(acc.crates[i] || [])].filter(R.identity))

        // [ [ 'Z', 'N' ], [ 'M', 'C', 'D' ], [ 'P' ] ]
        return {...acc, crates}
      }

      if (line.includes('move')) {
        return {...acc, moves: [...acc.moves, extractMove(line)]}
      }
      return acc
    },
    {crates: [], moves: []}
  )

  const movedCrates = moves.reduce((crates, [many, from, to]) => move(from, to, many, crates), crates)
  return movedCrates.map(R.last).join('')
}

module.exports = {
  getInput,
  getTestInput,
  main,
  extractCrates,
  extractMove
}
