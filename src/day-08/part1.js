const R = require('ramda')
const {readInput} = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const isVisibleFrom = R.curry((grid, tree, getPath, indexes) =>
  R.pipe(
    R.map(idx => parseInt(R.pathOr(-1, getPath(idx), grid), 10)),
    R.all(t => t < tree)
  )(indexes)
)

const getIndexes = (length, base) => Array.from({length}, (_, i) => base - 1 - i)

const isVisisble = (grid, coordinates) => {
  const [row, col] = coordinates
  const tree = parseInt(grid[row][col], 10)

  const maxRow = grid.length
  const maxCol = R.head(grid).length
  const isVisibleFromTree = isVisibleFrom(grid, tree)

  const visibleFromTop = isVisibleFromTree(idx => [idx, col], getIndexes(row, row))
  const visibleFromBottom = isVisibleFromTree(idx => [idx, col], getIndexes(maxRow - row - 1, maxRow))
  const visibleFromLeft = isVisibleFromTree(idx => [row, idx], getIndexes(col, col))
  const visibleFromRight = isVisibleFromTree(idx => [row, idx], getIndexes(maxCol - col - 1, maxCol))

  return R.any(R.identity, [visibleFromTop, visibleFromBottom, visibleFromLeft, visibleFromRight])
}

const main = data =>
  R.addIndex(R.reduce)(
    (sum, line, rowIndex) =>
      R.pipe(
        R.split(''),
        R.addIndex(R.map)((_, colIndex) => isVisisble(data, [rowIndex, colIndex])),
        R.filter(R.identity),
        R.length,
        R.add(sum)
      )(line),
    0,
    data
  )

module.exports = {
  getInput,
  getTestInput,
  main
}
