const R = require('ramda')
const {readInput} = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const moveUp = ([x, y]) => [x, y + 1]
const moveDown = ([x, y]) => [x, y - 1]
const moveLeft = ([x, y]) => [x - 1, y]
const moveRight = ([x, y]) => [x + 1, y]

const MoveFnMap = {
  U: moveUp,
  D: moveDown,
  L: moveLeft,
  R: moveRight,
  RU: R.pipe(moveRight, moveUp),
  RD: R.pipe(moveRight, moveDown),
  LU: R.pipe(moveLeft, moveUp),
  LD: R.pipe(moveLeft, moveDown)
}

const isTouching = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1

const getTailMoveFn = (h, t) => {
  const [x1, y1] = h
  const [x2, y2] = t

  if (isTouching(h, t)) {
    return R.identity
  }

  let dir = ''

  if (x1 > x2) {
    dir = R.concat(dir, 'R')
  }
  if (x1 < x2) {
    dir = R.concat(dir, 'L')
  }

  if (y1 > y2) {
    dir = R.concat(dir, 'U')
  }
  if (y1 < y2) {
    dir = R.concat(dir, 'D')
  }

  return MoveFnMap[dir]
}

const main = data => {
  const r = data.reduce(
    ({hPos, tPos, t}, motion) => {
      const [dir, steps] = motion.split(' ')
      const moveFn = MoveFnMap[dir]

      const updated = [...Array(parseInt(steps, 10)).keys()].reduce(
        ({hPos, tPos, t}) => {
          const newHPost = moveFn(hPos)
          const newTPos = getTailMoveFn(newHPost, tPos)(tPos)
          return {
            hPos: newHPost,
            tPos: newTPos,
            t: [...t, newTPos]
          }
        },
        {hPos, tPos, t}
      )

      return updated
    },
    {
      hPos: [0, 0],
      tPos: [0, 0],
      t: [[0, 0]]
    },
    data
  )
  const {t} = r
  const s = new Set(t.map(r => r.join(',')))
  return s.size
}

module.exports = {
  getInput,
  getTestInput,
  main,
  MoveFnMap,
  isTouching,
  getTailMoveFn
}
