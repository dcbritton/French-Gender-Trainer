// WordSetFileReader.js

const fs = require('node:fs')
const readline = require('node:readline')

module.exports = class WordSetFileReader {
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

            // turn row string into json object
            lines.push(JSON.parse(line))
        }

        return lines
    }
}
