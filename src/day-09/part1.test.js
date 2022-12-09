const R = require('ramda')
const {main, getTestInput, getInput, isTouching, getTailMoveFn, MoveFnMap} = require('./part1')

describe('day 09', () => {
  describe('part1', () => {

    test('should find touching', () => {
      expect(isTouching([0,0], [0,0])).toBeTrue
      expect(isTouching([0,1], [0,0])).toBeTrue
      expect(isTouching([1,0], [0,0])).toBeTrue
      expect(isTouching([1,1], [0,0])).toBeTrue
      expect(isTouching([0,0], [1,1])).toBeTrue
      expect(isTouching([2,0], [0,0])).toBeFalse
      expect(isTouching([0,2], [0,0])).toBeFalse
      expect(isTouching([2,2], [0,0])).toBeFalse
    })

    test('should get correct moving function', () => {
      expect(getTailMoveFn([0,0], [0,0])).toEqual(R.identity)
      expect(getTailMoveFn([2,0], [0,0])).toEqual(MoveFnMap.R)
      expect(getTailMoveFn([2,1], [0,0])).toEqual(MoveFnMap.RU)
      expect(getTailMoveFn([0,1], [2,0])).toEqual(MoveFnMap.LU)
      expect(getTailMoveFn([0,0], [2,0])).toEqual(MoveFnMap.L)
      expect(getTailMoveFn([0,0], [2,2])).toEqual(MoveFnMap.LD)
      expect(getTailMoveFn([2,0], [0,2])).toEqual(MoveFnMap.RD)
      expect(getTailMoveFn([2,0], [2,2])).toEqual(MoveFnMap.D)
      expect(getTailMoveFn([1,2], [1,0])).toEqual(MoveFnMap.U)
    })


    test('should handle test input', async () => {
      const data = await getTestInput()
      const result = main(data)
      expect(result).toEqual(13)
    })

    test('should handle real input', async () => {
      const data = await getInput()
      const result = main(data)
      expect(result).toEqual(6522)
    })
  })
})
