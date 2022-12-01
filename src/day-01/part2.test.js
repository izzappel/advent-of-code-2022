const {main, getTestInput, getInput} = require('./part2')

describe('day 02', () => {
  describe('part2', () => {
    test('should handle test input', async () => {
      const data = await getTestInput()
      const result = main(data)
      expect(result).toEqual(45000)
    })

    test('should handle real input', async () => {
      const data = await getInput()
      const result = main(data)
      console.log(result)
      expect(result).toEqual(198551)
    })
  })
})
