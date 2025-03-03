// declare constants for WordState
const WORD_INDEX = 0
const GENDER_INDEX = 1
const CURRENT_WORD_INDEX = 0

// tracks the state of current and following words. responsible for getting next set of words
class WordState {

    #wordBuffer = []

    constructor(getNextWordSet) {
        this.refillBuffer = () => {
            this.#wordBuffer = getNextWordSet()
        }
    }

    init() {
        this.refillBuffer()
        document.getElementById("current-word").innerText = this.getCurrentWord()
    }

    getCurrentWord() {
        return this.#wordBuffer[CURRENT_WORD_INDEX][WORD_INDEX]
    }

    getCurrentGender() {
        return this.#wordBuffer[CURRENT_WORD_INDEX][GENDER_INDEX]
    }

    next() {
        this.#wordBuffer.shift()
        document.getElementById("current-word").innerText = this.getCurrentWord()
    }
}
