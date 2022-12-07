const {main, getTestInput, getInput, play} = require('./part1')

describe('day 02', () => {
  describe('part1', () => {
    test('should play', async () => {
      expect(play('Y', 'A')).toEqual(6)
      expect(play('X', 'B')).toEqual(0)
      expect(play('Z', 'C')).toEqual(3)
    })

    test('should handle test input', async () => {
      const data = await getTestInput()
      const result = main(data)
      expect(result).toEqual(15)
    })

    test('should handle real input', async () => {
      const data = await getInput()
      const result = main(data)
      console.log(result)
      expect(result).toEqual(15572)
    })
  })
})
