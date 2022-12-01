const {main, getTestInput, getInput} = require('./part1')

describe('day 01', () => {
  describe('part1', () => {
    test('should handle test input', async () => {
      const data = await getTestInput()
      const result = main(data)
      console.log(result, data)
      expect(result).toEqual(24000)
    })

    test('should handle real input', async () => {
      const data = await getInput()
      const result = main(data)
      console.log(result)
      expect(result).toEqual(66719)
    })
  })
})
