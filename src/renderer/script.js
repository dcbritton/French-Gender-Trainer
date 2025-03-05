// script.js
// this file contains scripts for the front-end

async function fetchNextWordSet() {
    const response = await window.fromMain.fetchNextWordSet()
    return response
}

async function fetchButtons() {
    const response = await window.fromMain.fetchButtons()
    return response
}

function fetchMockWordSet() {
    return [
        ["temps", "m"],
        ["peu", "m"],
        ["vie", "f"],
        ["homme", "m"]
    ]
}

const pageBuilder = new PageBuilder(fetchButtons)
const wordState = new WordState(fetchNextWordSet)
const scoreState = new ScoreState()

async function setup() {
    pageBuilder.init()
    await wordState.init()
    scoreState.init()
}

// response button onclick
function handleResponseButtonClick(response) {
    scoreState.check(response)
    wordState.next()
}
