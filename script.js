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

// masculine button onclick
function handleMascButtonClick() {
    scoreState.check("m")
    wordState.next()
}

// feminine button onclick
function handleFemButtonClick() {
    scoreState.check("f")
    wordState.next()
}
