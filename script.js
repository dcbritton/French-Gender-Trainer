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
var scoreState = new ScoreState()

function setup() {
    wordState.init()
    scoreState.init()
}

// response button onclick
function handleResponseButtonClick(response) {
    scoreState.check(response)
    wordState.next()
}
