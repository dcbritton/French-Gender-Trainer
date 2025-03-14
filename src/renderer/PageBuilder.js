// PageBuilder.js

class PageBuilder {
    
    constructor(startSession, processAnswer) {
        this.startSession = async (id) => {
            // switch to session page
            const sessionHTML = await fetch("session.html")
            document.getElementById("body").innerHTML = await sessionHTML.text()

            // get session info via IPC
            const response = await startSession(id)
            
            // update UI accordingly
            this.#createButtons(response.currentPackInfo.classes)
            document.getElementById("current-word").innerText = response.nextWord
            document.getElementById("current-score").innerText = `${response.numCorrect}/${response.numWordsSeen}`
        }
        this.processAnswer = async (answer) => {
            const response = await processAnswer(answer)
            document.getElementById("current-word").innerText = response.nextWord
            document.getElementById("current-score").innerText = `${response.numCorrect}/${response.numWordsSeen}`
            
        }
    }

    async #createButtons(classes) {
        // get button HTMLs
        const buttonHTMLs= []
        for (const cl of classes) {
            const response = await fetch(`components/${cl}.html`)
            buttonHTMLs.push(await response.text())
        }

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
