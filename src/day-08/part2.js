const R = require('ramda')
const {readInput} = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const numberOfVisibleTrees = R.curry((grid, tree, getPath, indexes) => {
  if (indexes.length === 0) {
    return 0
  }

  const trees = R.map(idx => parseInt(R.pathOr(0, getPath(idx), grid), 10), indexes)
  const indexOfTallTree = R.findIndex(t => t >= tree, trees)

  const visibleTress = indexOfTallTree >= 0 ? R.take(indexOfTallTree + 1, trees) : trees
  return R.length(visibleTress)
})

const getIndexes = (length, base, fn) => Array.from({length}, (_, i) => fn(base, i + 1))

const getScienicScore = (grid, coordinates) => {
  const [row, col] = coordinates
  const tree = parseInt(grid[row][col], 10)

  const maxRow = grid.length
  const maxCol = R.head(grid).length
  const numberOfVisibleTreesFromTree = numberOfVisibleTrees(grid, tree)

  const visibleFromTop = numberOfVisibleTreesFromTree(idx => [idx, col], getIndexes(row, row, R.subtract))
  const visibleFromBottom = numberOfVisibleTreesFromTree(idx => [idx, col], getIndexes(maxRow - row - 1, row, R.add))
  const visibleFromLeft = numberOfVisibleTreesFromTree(idx => [row, idx], getIndexes(col, col, R.subtract))
  const visibleFromRight = numberOfVisibleTreesFromTree(idx => [row, idx], getIndexes(maxCol - col - 1, col, R.add))

  const score = R.reduce(R.multiply, 1, [visibleFromTop, visibleFromBottom, visibleFromLeft, visibleFromRight])
  return score
}

const main = data =>
  R.addIndex(R.reduce)(
    (sum, line, rowIndex) =>
      R.pipe(
        R.split(''),
        R.addIndex(R.map)((_, colIndex) => getScienicScore(data, [rowIndex, colIndex])),
        R.sort(R.flip(R.subtract)),
        R.head,
        R.max(sum)
      )(line),
    0,
    data
  )

module.exports = {
  getInput,
  getTestInput,
  main
}
