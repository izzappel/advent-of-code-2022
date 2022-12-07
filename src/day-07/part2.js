const R = require('ramda')
const {readInput} = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const getFolderNames = R.pipe(
  Object.keys,
  R.reject(k => ['files'].includes(k))
)

const getFolderSizes = folder => {
  const fileSize = R.pipe(
    R.map(f => f.size),
    R.sum
  )(folder.files || [])

  const subfolderSizes = R.pipe(
    getFolderNames,
    R.map(el => getFolderSizes(folder[el]))
  )(folder)

  const subfolderTotalSize = R.pipe(
    R.reduce((acc, f) => R.append(R.last(f), acc), []),
    R.sum
  )(subfolderSizes)

  return R.append(fileSize + subfolderTotalSize, R.flatten(subfolderSizes))
}

const main = data => {
  const structure = R.pipe(
    R.reduce(
      (acc, elem) =>
        elem.startsWith('$') ? [...acc, [elem.slice(2)]] : [...R.dropLast(1, acc), [...R.last(acc), elem]],
      []
    ),
    R.map(elem => [R.head(elem), R.tail(elem)]),
    R.reduce(
      (acc, [command, output]) => {
        if (command.startsWith('cd')) {
          const [_, folder] = command.split(' ')
          if (folder === '..') {
            return {
              ...acc,
              path: R.dropLast(1, acc.path)
            }
          }

          return {
            path: R.append(folder, acc.path),
            structure: R.modifyPath(acc.path, p => ({...p, [folder]: {}}), acc.structure)
          }
        }

        const files = R.pipe(
          R.filter(f => !f.startsWith('dir')),
          R.map(R.split(' ')),
          R.map(([size, name]) => ({size: parseInt(size, 10), name}))
        )(output)

        return {
          ...acc,
          structure: R.modifyPath(acc.path, p => ({...p, files}), acc.structure)
        }
      },
      {structure: {'/': {}}, path: []}
    ),
    R.path(['structure', '/'])
  )(data)

  const total = R.pipe(getFolderSizes, R.sort(R.subtract))(structure)

  const biggest = R.last(total)
  const space = 70000000 - biggest

  return R.pipe(
    R.filter(t => t > 30000000 - space),
    R.head
  )(total)
}

module.exports = {
  getInput,
  getTestInput,
  main
}
