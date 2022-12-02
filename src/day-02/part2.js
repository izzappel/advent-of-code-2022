const R = require('ramda')
const {readInput} = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const rock = 'A'
const paper = 'B'
const scissor = 'C'

const isRock = a => rock === a
const isPaper = a => paper === a
const isScissor = a => scissor === a

const isLose = a => ['X'].includes(a)
const isDraw = a => ['Y'].includes(a)
const isWin = a => ['Z'].includes(a)

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

const getShapeToPlay = (a, end) => {
  if (isDraw(end)) {
    return a
  }

  if (isRock(a)) {
    return isLose(end) ? scissor : paper
  }
  if (isPaper(a)) {
    return isLose(end) ? rock : scissor
  }
  return isLose(end) ? paper : rock
}

const main = data => {
  return data.reduce((sum, round) => {
    const [elf, end] = round.split(' ')
    const me = getShapeToPlay(elf, end)
    return sum + getShapePoints(me) + play(me, elf)
  }, 0)
}

module.exports = {
  getInput,
  getTestInput,
  main,
  play,
  getShapeToPlay
}
