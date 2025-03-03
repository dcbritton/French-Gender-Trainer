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

const wordState = new WordState(getTestWords)
const scoreState = new ScoreState()

function setup() {
    wordState.init()
    scoreState.init()
}

// response button onclick
function handleResponseButtonClick(response) {
    scoreState.check(response)
    wordState.next()
}
