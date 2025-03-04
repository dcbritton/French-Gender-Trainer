// ScoreState.js
// contains a class to keep track of the current session's score, incorrect words, etc.

class ScoreState {

    #total = 0
    #numCorrect = 0
    #missedWords = []

    // constructor
    constructor() {}

    //
    init() {
        document.getElementById("current-score").innerText = `${this.#numCorrect}/${this.#total}`
    }

    // 
    check(response) {
        // empty gender entry, correct by default
        if (wordState.getCurrentGender() == "") {
            this.#numCorrect += 1
        }
        // correct
        else if (response == wordState.getCurrentGender()) {
            this.#numCorrect += 1
        }
        // incorrect
        else {
            this.#missedWords.push([wordState.getCurrentWord(), wordState.getCurrentGender()])
        }

        this.#total += 1
        document.getElementById("current-score").innerText = `${this.#numCorrect}/${this.#total}`
    }
}
