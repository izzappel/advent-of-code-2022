const {main, getTestInput, getInput} = require('./part2')

describe('day 07', () => {
  describe('part2', () => {
    test('should handle test input', async () => {
      const data = await getTestInput()
      const result = main(data)
      expect(result).toEqual(24933642)
    })

    test('should handle real input', async () => {
      const data = await getInput()
      const result = main(data)
      console.log(result)
      expect(result).toEqual(3696336)
    })
  })
})
