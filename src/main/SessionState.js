// SessionState.js

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
        return this.#wordBuffer[CURRENT_WORD_INDEX].word
    }

    getCurrentClassSet() {
        return this.#wordBuffer[CURRENT_WORD_INDEX].classes
    }

    getMissedWords() {
        return this.#missedWords
    }

    // when next() fails to refill the buffer
    atEnd() {
        return this.#wordBuffer.length == 0
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
        // correct if response is within the current class set
        if (this.getCurrentClassSet().includes(response)) {
            this.#numCorrect += 1
        }
        // incorrect
        else {
            this.#missedWords.push([this.getCurrentWord(), this.getCurrentClassSet()])
        }
        this.#numWordsSeen += 1
    }

    clear() {
        this.#numWordsSeen = 0
        this.#numCorrect = 0
        this.#missedWords = []
        this.#wordBuffer = []  
    }
}
