const R = require('ramda')
const {readInput} = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const getCycles = (cycleStart, cycleEnd) => {
  return [...Array(cycleEnd - cycleStart + 1).keys()].map(i => i + cycleStart)
}

const main = data => {
  const result = data.reduce(
    ({cycle, ctr, x}, line) => {
      const isNoop = line === 'noop'
      const duration = isNoop ? 1 : 2

      const cycles = getCycles(cycle, cycle + duration - 1)
      const newPixels = cycles.map(c => {
        const drawIndex = (c - 1) % 40
        const pixel = drawIndex >= x - 1 && drawIndex <= x + 1 ? '#' : '.'
        return pixel
      })

      const add = isNoop ? 0 : parseInt(line.split(' ')[1], 10)
      return {
        x: x + add,
        cycle: cycle + duration,
        ctr: [...ctr, ...newPixels]
      }
    },
    {x: 1, cycle: 1, ctr: []}
  )

  result.ctr.forEach((pixel, index) => {
    process.stdout.write(pixel)
    if ((index + 1) % 40 === 0) {
      process.stdout.write('\n')
    }
  })
}

module.exports = {
  getInput,
  getTestInput,
  main
}
