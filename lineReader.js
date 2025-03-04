const fs = require('node:fs')
const readline = require('node:readline')
const path = require('node:path')

module.exports = class LineReader {

  constructor(filePath, batchSize) {
    this.filePath = filePath
    this.batchSize = batchSize
    this.lineNumber = 0
    this.linesRead = 0
    this.stream = fs.createReadStream(this.filePath)
    this.rl = readline.createInterface({ input: this.stream })
    this.lineIterator = this.rl[Symbol.asyncIterator]() // Async iterator for readline
  }

  async getNextBatch() {
    let lines = []
    while (lines.length < this.batchSize) {
      const { value: line, done } = await this.lineIterator.next()
      if (done) {
        this.rl.close()
        break
      }
      let lineArray = line.split(",")

      lines.push(lineArray)
      this.lineNumber++
    }
    console.log(lines)

    return lines
  }
}
