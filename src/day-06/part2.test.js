const {main, getTestInput, getInput} = require('./part2')

describe('day 6', () => {
  describe('part2', () => {
    test('should handle test input', async () => {
      expect(main('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toEqual(19)
      expect(main('bvwbjplbgvbhsrlpgdmjqwftvncz')).toEqual(23)
      expect(main('nppdvjthqldpwncqszvftbrmjlhg')).toEqual(23)
      expect(main('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toEqual(29)
      expect(main('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toEqual(26)
    })

    test('should handle real input', async () => {
      const data = await getInput()
      const result = main(data)
      console.log(result)
      expect(result).toEqual(2665)
    })
  })
})
