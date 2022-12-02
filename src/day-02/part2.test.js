const {main, getTestInput, getInput, getShapeToPlay} = require('./part2')

describe('day 02', () => {
  describe('part2', () => {
    test('should get correct shape to play', () => {
      expect(getShapeToPlay('A', 'Y')).toEqual('A')
      expect(getShapeToPlay('B', 'X')).toEqual('A')
      expect(getShapeToPlay('C', 'Z')).toEqual('A')
    })

    test('should handle test input', async () => {
      const data = await getTestInput()
      const result = main(data)
      expect(result).toEqual(12)
    })

    test('should handle real input', async () => {
      const data = await getInput()
      const result = main(data)
      console.log(result)
      expect(result).toEqual(16098)
    })
  })
})
