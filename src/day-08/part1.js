const R = require('ramda')
const {readInput} = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const isVisibleFrom = (tree, getPath, indexes, grid) =>
  R.pipe(
    R.map(idx => parseInt(R.pathOr(-1, getPath(idx), grid), 10)),
    R.all(t => t < tree)
  )(indexes)

const getIndexes = (length, base) => Array.from({length}, (_, i) => base - 1 - i)

const isVisisble = (grid, coordinates) => {
  const [row, col] = coordinates
  const tree = parseInt(grid[row][col], 10)

  const maxRow = grid.length
  const maxCol = R.head(grid).length

  const visibleFromTop = isVisibleFrom(tree, idx => [idx, col], getIndexes(row, row), grid)
  const visibleFromBottom = isVisibleFrom(tree, idx => [idx, col], getIndexes(maxRow - row - 1, maxRow), grid)
  const visibleFromLeft = isVisibleFrom(tree, idx => [row, idx], getIndexes(col, col), grid)
  const visibleFromRight = isVisibleFrom(tree, idx => [row, idx], getIndexes(maxCol - col - 1, maxCol), grid)

  return R.any(R.identity, [visibleFromTop, visibleFromBottom, visibleFromLeft, visibleFromRight])
}

const main = data => {
  const r = R.reduce(
    ({sum, rowIndex}, line) => {
      const trees = line.split('')

      const treeVisibility = R.pipe(
        R.addIndex(R.map)((_, colIndex) => isVisisble(data, [rowIndex, colIndex])),
        R.filter(R.identity)
      )(trees)

      return {
        sum: sum + treeVisibility.length,
        rowIndex: rowIndex + 1
      }
    },
    {sum: 0, rowIndex: 0},
    data
  )
  return r.sum
}

module.exports = {
  getInput,
  getTestInput,
  main
}
