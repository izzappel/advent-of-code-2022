const {main, getTestInput, getInput} = require('./part2')

describe('day 05', () => {
  describe('part2', () => {
    test('should handle test input', async () => {
      const data = await getTestInput()
      const result = main(data)
      expect(result).toEqual('MCD')
    })

    test('should handle real input', async () => {
      const data = await getInput()
      const result = main(data)
      console.log(result)
      expect(result).toEqual('FGLQJCMBD')
    })
  })
})
