// ScoreState.js
// contains a class to keep track of the current session's score, incorrect words, etc.

class ScoreState {
    // constructor
    constructor() {
        this.total = 0
        this.numCorrect = 0
        this.missedWords = []
    }

    //
    init() {
        document.getElementById("current-score").innerText = `${this.numCorrect}/${this.total}`
    }

    // 
    check(response) {
        // incorrect response
        if (response != wordState.getCurrentGender()) {
            this.missedWords.push([wordState.getCurrentWord(), wordState.getCurrentGender()])
        }
        else {
            this.numCorrect += 1
        }

        this.total += 1
        document.getElementById("current-score").innerText = `${this.numCorrect}/${this.total}`
    }
}
