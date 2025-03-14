// PageBuilder.js

class PageBuilder {
    
    constructor(startSession, processAnswer) {
        this.startSession = async (id) => {
            const response = await startSession(id)
            document.getElementById("current-word").innerText = response.nextWord
            document.getElementById("current-score").innerText = `${response.numCorrect}/${response.numWordsSeen}`
            this.#createButtons(response.currentPackInfo.classes)
        }
        this.processAnswer = async (answer) => {
            const response = await processAnswer(answer)
            document.getElementById("current-word").innerText = response.nextWord
            document.getElementById("current-score").innerText = `${response.numCorrect}/${response.numWordsSeen}`
            
        }
    }

    async #createButtons(classes) {
        console.log("create buttons called")
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
