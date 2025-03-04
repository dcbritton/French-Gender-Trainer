// lineReader.js

const fs = require('node:fs')
const readline = require('node:readline')

module.exports = class LineReader {
    #stream
    #rl
    #lineIterator

    // constructor
    constructor(filePath) {
        this.#stream = fs.createReadStream(filePath)
        this.#rl = readline.createInterface({ input: this.#stream })
        this.#lineIterator = this.#rl[Symbol.asyncIterator]()
    }   

    async getNextWordSet(size) {
        let lines = []
        while (lines.length < size) {
            const { value: line, done } = await this.#lineIterator.next()
            if (done) {
                this.rl.close()
                break
            }

            // transform csv row into an array, push array onto lines
            lines.push(line.split(","))
        }

        // console.log(lines)
        return lines
    }
}
