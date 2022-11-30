const fs = require('fs')

const readInput = (path, options = {}) => {
  const { keepEmptyLines = false } = options
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err)
        return
      }

      const lines = data
        .toString()
        .split('\n')
        .filter((d) => (keepEmptyLines ? true : d))
      resolve(lines)
    })
  })
}

module.exports = { readInput }
