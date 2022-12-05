const {main, getTestInput, getInput, extractCrates, extractMove} = require('./part1')

describe('day 05', () => {
  describe('part1', () => {
    test('should extract crates', async () => {
      expect(extractCrates('    [D]    ')).toEqual(['', 'D', ''])
      expect(extractCrates('[N] [C]    ')).toEqual(['N', 'C', ''])
      expect(extractCrates('[Z] [M] [P]')).toEqual(['Z', 'M', 'P'])
      expect(extractCrates('[Z]     [P]')).toEqual(['Z', '', 'P'])
      expect(extractCrates('[Z]        ')).toEqual(['Z', '', ''])
      expect(extractCrates('            [M] [S] [S]            ')).toEqual(['', '', '', 'M', 'S', 'S', '', '', ''])
    })

    test('should extract moves', async () => {
      expect(extractMove('move 1 from 2 to 1')).toEqual([1, 2, 1])
      expect(extractMove('move 3 from 1 to 3')).toEqual([3, 1, 3])
      expect(extractMove('move 2 from 2 to 1')).toEqual([2, 2, 1])
      expect(extractMove('move 1 from 1 to 2')).toEqual([1, 1, 2])
    })

    test('should handle test input', async () => {
      const data = await getTestInput()
      const result = main(data)
      expect(result).toEqual('CMZ')
    })

    test('should handle real input', async () => {
      const data = await getInput()
      const result = main(data)
      console.log(result)
      expect(result).toEqual('TLNGFGMFN')
    })
  })
})
