// script.js
// this file contains scripts for the front-end

const pageBuilder = new PageBuilder(
    async () => { return await window.fromMain.getPackInfo() },
    async (id) => { return await window.fromMain.startSession(id) },
    async (answer) => { return await window.fromMain.processAnswer(answer) }
)

// called upon load of body tag in index.html
async function setup() {
    pageBuilder.startHomePage()
}

// called upon user's selection of a pack
async function select(id) {
    await pageBuilder.startSession(id)
}

// called upon user's click of a response button
async function handleResponseButtonClick(answer) {
    pageBuilder.processAnswer(answer)
}
