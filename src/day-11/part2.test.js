const {main, getTestInput, getInput} = require('./part2')

describe('day 11', () => {
  describe('part2', () => {
    test('should handle test input', async () => {
      const data = await getTestInput()
      const result = main(data)
      expect(result).toEqual(2713310158)
    })

    test('should handle real input', async () => {
      const data = await getInput()
      const result = main(data)
      console.log(result)
      expect(result).toEqual(15117269860)
    })
  })
})
