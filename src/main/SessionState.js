// SessionState.js

// declare constants for WordState
const WORD_INDEX = 0
const GENDER_INDEX = 1
const CURRENT_WORD_INDEX = 0

// tracks the state of current and following words. responsible for getting next set of words
module.exports = class SessionState {

    #numWordsSeen = 0
    #numCorrect = 0
    #missedWords = []
    #wordBuffer = []
    #refillBuffer = async () => {}

    constructor(getNextWordSet) {
        // this.#refillBuffer() must be async since the injected dependency, getNextWordSet, may be async
        this.#refillBuffer = async () => {
            this.#wordBuffer = await getNextWordSet()
        }
    }

    // must be async since this.#refillBuffer() is async
    async init() {
        await this.#refillBuffer()
    }

    getNumWordsSeen() {
        return this.#numWordsSeen
    }

    getNumCorrect() {
        return this.#numCorrect
    }

    getCurrentWord() {
        return this.#wordBuffer[CURRENT_WORD_INDEX][WORD_INDEX]
    }

    getCurrentGender() {
        return this.#wordBuffer[CURRENT_WORD_INDEX][GENDER_INDEX]
    }

    // must be async since this.#refillBuffer() is async
    async next() {
        this.#wordBuffer.shift()
        // refill this.#wordBuffer when empty
        if (this.#wordBuffer.length == 0) {
            await this.#refillBuffer()
        }
    }

    // 
    updateScore(response) {
        // correct if response matches currentGender, if gender entry is '' then correct by default
        if (response == this.getCurrentGender() || this.getCurrentGender() == "") {
            this.#numCorrect += 1
        }
        // incorrect
        else {
            this.#missedWords.push([this.getCurrentWord(), this.getCurrentGender()])
        }
        this.#numWordsSeen += 1
    }
}
