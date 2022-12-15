const {main, getTestInput, getInput} = require('./part1')

describe('day 11', () => {
  describe('part1', () => {
    test('should handle test input', async () => {
      const data = await getTestInput()
      const result = main(data)
      expect(result).toEqual(10605)
    })

    test('should handle real input', async () => {
      const data = await getInput()
      const result = main(data)
      expect(result).toEqual(55944)
    })
  })
})
