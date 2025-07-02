// WordSetFileReader.js

const fs = require('node:fs')
const readline = require('node:readline')

module.exports = class WordSetFileReader {
    #filepath = null
    #stream = null
    #rl = null
    #lineIterator = null

    // constructor
    constructor() {}

    // register a new filepath
    async registerNewFilepath(filepath) {
        // clean up current file
        if (this.#filepath != null) {
            this.#rl.close()
            this.#stream.destroy()
            this.#lineIterator = null
        }

        this.#filepath = filepath
        this.#stream = fs.createReadStream(filepath)
        this.#rl = readline.createInterface({ input: this.#stream })
        this.#lineIterator = this.#rl[Symbol.asyncIterator]()
    }

    async unregisterCurrentFile() {
        this.#filepath = null
        this.#rl.close()
        this.#stream.destroy()
        this.#lineIterator = null
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
