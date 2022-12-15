const R = require('ramda')
const {readInput} = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const groupByMonkey = data => Array.from({length: data.length / 6}, () => data.splice(0, 6))

const parse = data => {
  const groups = groupByMonkey(data)
  const monkeys = groups.map((group, index) => {
    const [name, items, operation, test, ifTrue, ifFalse] = group.map(d => d.trim())
    return {
      index,
      name,
      items: items
        .split(': ')[1]
        .split(', ')
        .map(d => parseInt(d, 10)),
      operation: operation.split(': ')[1].replace('new', 'n'),
      divisor: parseInt(test.split(': divisible by ')[1], 10),
      monkeyTrue: parseInt(ifTrue.slice(-1), 10),
      monkeyFalse: parseInt(ifFalse.slice(-1), 10)
    }
  })
  return monkeys
}

const executeOperation = (level, operation) => {
  let n
  let old = level
  eval(operation)
  return n
}

const manageWorryLevel = (level, divisor) => level % divisor
const calcWorryLevel = (monkey, item, divisor) => manageWorryLevel(executeOperation(item, monkey.operation), divisor)

const removeItem = (items, index) => items.map((data, i) => (i === index ? data.slice(1) : data))
const addItem = (items, index, item) => items.map((data, i) => (i === index ? [...data, item] : data))
const increment = (numbers, index, n) => numbers.map((data, i) => (i === index ? data + n : data))
const throwItem = (items, item, from, to) => addItem(removeItem(items, from), to, item)

const inspectAndThrow = (monkey, items, divisor) => {
  const updatedItems = items[monkey.index].reduce((acc, i) => {
    const newItem = calcWorryLevel(monkey, i, divisor)

    const test = newItem % monkey.divisor === 0
    const targetMonkey = test ? monkey.monkeyTrue : monkey.monkeyFalse

    return throwItem(acc, newItem, monkey.index, targetMonkey)
  }, items)
  return updatedItems
}

const getMonkeyDivisor = monkeys => monkeys.map(d => d.divisor).reduce((acc, d) => acc * d, 1)

const main = data => {
  const monkeys = parse(data)
  const monkeyDivisor = getMonkeyDivisor(monkeys)
  const [items, numberOfInspects] = [...new Array(10000).keys()].reduce(
    ([items, numberOfInspects], round) => {
      return monkeys.reduce(
        ([accItems, accNumberOfInspects], m) => {
          return [inspectAndThrow(m, accItems, monkeyDivisor), increment(accNumberOfInspects, m.index, accItems[m.index].length)]
        },
        [items, numberOfInspects]
      )
    },
    [monkeys.map(m => m.items), monkeys.map(() => 0)]
  )
  const sorted = numberOfInspects.sort((a, b) => b - a)
  console.log(sorted)
  return sorted[0] * sorted[1]
}

module.exports = {
  getInput,
  getTestInput,
  main
}
