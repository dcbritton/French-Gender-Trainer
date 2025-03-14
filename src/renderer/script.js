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
    console.log("setup called")

    // get and display the home page
    const response = await fetch('home.html')
    document.getElementById("body").innerHTML = await response.text()
    
    // get info for button packs
    const packInfo = await getPackInfo()
    
    // creaate and add the pack choice buttons
    const buttonContainerContainer = document.createElement("div")
    buttonContainerContainer.setAttribute("class", "button-containers-container")
    buttonContainerContainer.setAttribute("id", "button-containers-container")

    for (const pack of packInfo) {
        const buttonContainer = document.createElement("div")
        buttonContainer.setAttribute("class", "button-container")
        buttonContainer.innerHTML += `<button class="pack-button" onclick="select('${pack.id}')">${pack.title}</button>`
        buttonContainerContainer.appendChild(buttonContainer)
    }

    document.getElementById("main-content-wrapper").appendChild(buttonContainerContainer)
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
