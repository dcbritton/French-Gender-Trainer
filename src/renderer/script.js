// script.js
// this file contains scripts for the front-end

async function startSession() {
    const response = await window.fromMain.startSession()
    return response
}

async function processAnswer(answer) {
    const response = await window.fromMain.processAnswer(answer)
    return response
}

async function fetchButtons() {
    const response = await window.fromMain.fetchButtons()
    return response
}

const pageBuilder = new PageBuilder(fetchButtons, startSession, processAnswer)

async function setup() {
    await pageBuilder.init()
}

// response button onclick
function handleResponseButtonClick(answer) {
    // pageBuilder asks main process for score data and next word
    pageBuilder.processAnswer(answer)
    //
}
