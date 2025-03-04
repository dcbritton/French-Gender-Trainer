// declare constants for WordState
const WORD_INDEX = 0
const GENDER_INDEX = 1
const CURRENT_WORD_INDEX = 0

// tracks the state of current and following words. responsible for getting next set of words
class WordState {

    #wordBuffer = []
    #refillBuffer = () => {}

    constructor(getNextWordSet) {
        // this.#refillBuffer() must be async since the injected dependency, getNextWordSet, may be async
        this.#refillBuffer = async () => {
            this.#wordBuffer = await getNextWordSet()
        }
    }

    // must be async since this.#refillBuffer() is async
    async init() {
        await this.#refillBuffer()
        document.getElementById("current-word").innerText = this.getCurrentWord()
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

        document.getElementById("current-word").innerText = this.getCurrentWord()
    }
}
