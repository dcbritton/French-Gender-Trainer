// this file contains scripts for the front-end

//
function getTestWords() {
    return [
        ["temps", "m"],
        ["peu", "m"],
        ["vie", "f"],
        ["homme", "m"]
    ]
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
    // incorret
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
