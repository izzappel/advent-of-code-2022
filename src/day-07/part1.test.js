const {main, getTestInput, getInput, getFolderSizes} = require('./part1')

describe('day 07', () => {
  describe('part1', () => {
    test('should get folder sizes', () => {
      expect(
        getFolderSizes({
          files: [{size: 1}, {size: 1}],
          a: {
            files: [{size: 1}, {size: 1}],
            b: {
              files: [{size: 1}, {size: 1}]
            }
          }
        })
      ).toEqual([2, 4, 6])

      expect(
        getFolderSizes({
          files: [{size: 1}, {size: 1}],
          a: {
            files: [{size: 1}, {size: 1}],
            b: {
              files: [{size: 1}, {size: 1}]
            },
            c: {
              files: [{size: 1}, {size: 1}]
            }
          }
        })
      ).toEqual([2, 2, 6, 8])

      expect(
        getFolderSizes({
          files: [{size: 1}, {size: 1}],
          a: {
            files: [{size: 1}, {size: 1}],
            b: {
              files: [{size: 1}, {size: 1}]
            },
            c: {
              files: [{size: 1}, {size: 1}],
              d: {
                files: [{size: 1}, {size: 1}]
              },
              e: {
                files: [{size: 1}, {size: 1}],
                f: {
                  files: [{size: 1}, {size: 1}]
                }
              }
            }
          }
        })
      ).toEqual([2, 2, 2, 4, 8, 12, 14])
    })

    test('should handle test input', async () => {
      const data = await getTestInput()
      const result = main(data)
      expect(result).toEqual(95437)
    })

    test('should handle real input', async () => {
      const data = await getInput()
      const result = main(data)
      expect(result).toEqual(1582412)
    })
  })
})
