const main = async (day, part) => {
  const code = require(`${__dirname}/day-${day}/part${part}.js`)
  const data = await code.getInput()
  const result = code.main(data)

  console.log(`day-${day} - part ${part}:`)
  console.log(result)
}

const args = process.argv.slice(-2);
main(args[0], args[1])
