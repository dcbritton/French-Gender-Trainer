// declare constants for WordState
const WORD_INDEX = 0
const GENDER_INDEX = 1
const CURRENT_WORD_INDEX = 0

// tracks the state of current and following words. responsible for getting next set of words
class WordState {
    constructor(getNextWordSet) {
        this.wordBuffer = []
        this.refillBuffer = () => {
            this.wordBuffer = getNextWordSet()
        }
        this.currentWord = ""
        this.currentGender = ""
    }

    init() {
        this.refillBuffer()
        this.currentWord = this.wordBuffer[CURRENT_WORD_INDEX][WORD_INDEX]
        this.currentGender = this.wordBuffer[CURRENT_WORD_INDEX][GENDER_INDEX]
        document.getElementById("current-word").innerText = this.currentWord
    }

    getNextWord() {
        this.wordBuffer.shift()
        this.currentWord = this.wordBuffer[CURRENT_WORD_INDEX][WORD_INDEX]
        this.currentGender = this.wordBuffer[CURRENT_WORD_INDEX][GENDER_INDEX]
        document.getElementById("current-word").innerText = this.currentWord
    }
}
