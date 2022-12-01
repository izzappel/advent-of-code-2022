const realInputType = ['r', 'R', 'real']

const main = async (day, part, inputType = 'real') => {
  const code = require(`${__dirname}/day-${day}/part${part}.js`)
  const data = realInputType.includes(inputType) ? await code.getInput() : await code.getTestInput()
  const result = code.main(data)

  console.log(`day-${day} - part ${part}:`)
  console.log(result)
}

const args = process.argv.slice(-3);
main(args[0], args[1], args[2])
