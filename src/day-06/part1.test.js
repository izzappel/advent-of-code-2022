const {main, getTestInput, getInput} = require('./part1')

describe('day 06', () => {
  describe('part1', () => {
    test('should handle test input', async () => {
      expect(main('bvwbjplbgvbhsrlpgdmjqwftvncz')).toEqual(5)
      expect(main('nppdvjthqldpwncqszvftbrmjlhg')).toEqual(6)
      expect(main('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toEqual(10)
      expect(main('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toEqual(11)
    })

    test('should handle real input', async () => {
      const data = await getInput()
      const result = main(data)
      console.log(result)
      expect(result).toEqual(1655)
    })
  })
})
