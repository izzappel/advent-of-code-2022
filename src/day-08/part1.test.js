const {main, getTestInput, getInput} = require('./part1')

describe('day 08', () => {
  describe('part1', () => {
    test('should handle test input', async () => {
      const data = await getTestInput()
      const result = main(data)
      expect(result).toEqual(21)
    })

    test('should handle real input', async () => {
      const data = await getInput()
      const result = main(data)
      expect(result).toEqual(1796)
    })
  })
})
