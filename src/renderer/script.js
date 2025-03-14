// script.js
// this file contains scripts for the front-end

async function getPackInfo() {
    const response = await window.fromMain.getPackInfo()
    return response
}

const pageBuilder = new PageBuilder(
    async (id) => {
        const response = await window.fromMain.startSession(id)
        return response
    },
    async (answer) => {
        const response = await window.fromMain.processAnswer(answer)
        return response 
    }
)

// called on load of body tag in index.html
// replaces innerHTML of the body with the home page
async function setup() {
    pageBuilder.startHomePage()
}

// select a pack
async function select(id) {
    await pageBuilder.startSession(id)
}

// response button onclick
function handleResponseButtonClick(answer) {
    // pageBuilder asks main process for score data and next word
    pageBuilder.processAnswer(answer)
}
