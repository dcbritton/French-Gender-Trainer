// this file contains scripts for the front-end

function getTestWords() {
    return [
        ["temps", "m"],
        ["peu", "m"],
        ["vie", "f"],
        ["homme", "m"]
    ]
}

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
        this.currentWord = this.wordBuffer[0][0]
        this.currentGender = this.wordBuffer[0][1]
        document.getElementById("current-word").innerText = this.currentWord
    }

    getNextWord() {
        this.wordBuffer.shift()
        this.currentWord = this.wordBuffer[0][0]
        this.currentGender = this.wordBuffer[0][1]
        document.getElementById("current-word").innerText = this.currentWord
    }
}

var wordState = new WordState(getTestWords)

var incorrects = []
var numCorrect = 0
var total = 0

// masculine button onclick
function handleMascButtonClick() {
    checkResponse("m")
    wordState.getNextWord()
}

// feminine button onclick
function handleFemButtonClick() {
    checkResponse("f")
    wordState.getNextWord()
}

//
function checkResponse(response) {
    // incorrect
    console.log(wordState.currentGender)
    if (response != wordState.currentGender) {
        incorrects.push(wordState.currentWord)
    }
    // correct
    else {
        numCorrect += 1
    }

    total += 1

    document.getElementById("current-score").innerText = `${numCorrect}/${total}`
}
