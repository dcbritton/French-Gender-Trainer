// PageBuilder.js

class PageBuilder {
    
    constructor(getPackInfo, startSession, processAnswer) {

        // loads the home page
        this.startHomePage = async () => {
            // get and display home page
            const response = await fetch('home.html')
            document.getElementById("body").innerHTML = await response.text()
            
            // get info for button packs
            const packInfo = await getPackInfo()
            
            // create and add pack choice buttons
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

        // load quiz session
        this.startSession = async (id) => {
            // switch to session page
            const sessionHTML = await fetch("session.html")
            document.getElementById("body").innerHTML = await sessionHTML.text()

            // get session info via IPC
            const response = await startSession(id)
            
            // update UI accordingly
            await this.#createSessionButtons(response.currentPackInfo.classes)
            document.getElementById("current-word").innerText = response.nextWord
            document.getElementById("current-score").innerText = `${response.numCorrect}/${response.numWordsSeen}`
        }

        // processe a user response
        this.processAnswer = async (answer) => {
            // await updated info from IPC
            const response = await processAnswer(answer)

            // update UI accordingly
            document.getElementById("current-word").innerText = response.nextWord
            document.getElementById("current-score").innerText = `${response.numCorrect}/${response.numWordsSeen}`  
        }
    }

    // responsible for creation of response buttons for sessions
    async #createSessionButtons(classes) {
        // get button HTMLs
        const buttonHTMLs= []
        for (const cl of classes) {
            const response = await fetch(`components/${cl}.html`)
            buttonHTMLs.push(await response.text())
        }

        // create and add session response buttons
        const buttonContainerContainer = document.createElement("div")
        buttonContainerContainer.setAttribute("class", "button-containers-container")
        buttonContainerContainer.setAttribute("id", "button-containers-container")
        for (const buttonHTML of buttonHTMLs) {
            const buttonContainer = document.createElement("div")
            buttonContainer.setAttribute("class", "button-container")
            buttonContainer.innerHTML += buttonHTML
            buttonContainerContainer.appendChild(buttonContainer)
        }
        document.getElementById("main-content-wrapper").appendChild(buttonContainerContainer)
    }
}
