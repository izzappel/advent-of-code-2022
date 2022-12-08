const {main, getTestInput, getInput} = require('./part2')

describe('day 08', () => {
  describe('part2', () => {
    test('should handle test input', async () => {
      const data = await getTestInput()
      const result = main(data)
      expect(result).toEqual(8)
    })

    test('should handle real input', async () => {
      const data = await getInput()
      const result = main(data)
      expect(result).toEqual(288120)
    })
  })
})
