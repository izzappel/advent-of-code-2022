const R = require('ramda')
const {readInput} = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const isRock = a => ['A', 'X'].includes(a)
const isPaper = a => ['B', 'Y'].includes(a)
const isScissor = a => ['C', 'Z'].includes(a)

// Paper > Rock > Scissor > Paper > Rock
const play = (a, b) => {
  const isDraw = (isRock(a) && isRock(b)) || (isPaper(a) && isPaper(b)) || (isScissor(a) && isScissor(b))
  if (isDraw) {
    return 3
  }

  const hasWon = (isRock(a) && isScissor(b)) || (isPaper(a) && isRock(b)) || (isScissor(a) && isPaper(b))
  if (hasWon) {
    return 6
  }
  return 0
}

const getShapePoints = a => {
  if (isRock(a)) {
    return 1
  }
  if (isPaper(a)) {
    return 2
  }

  return 3
}

const main = data => {
  return data.reduce((sum, round) => {
    const [elf, me] = round.split(' ')
    return sum + getShapePoints(me) + play(me, elf)
  }, 0)
}

module.exports = {
  getInput,
  getTestInput,
  main,
  play
}
