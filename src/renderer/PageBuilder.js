// PageBuilder.js

class PageBuilder {

    #buttonHTMLs = []
    #fillButtonHTMLs = async () => {}
    
    constructor(getButtons, startSession, processAnswer) {
        this.#fillButtonHTMLs = async () => {
            this.#buttonHTMLs = await getButtons()
        }

        this.processAnswer = async (answer) => {
            const response = await processAnswer(answer)
            document.getElementById("current-word").innerText = response.nextWord
            document.getElementById("current-score").innerText = `${response.numCorrect}/${response.numWordsSeen}`
            
        }

        this.startSession = async () => {
            const response = await startSession()
            document.getElementById("current-word").innerText = response.nextWord
            document.getElementById("current-score").innerText = `${response.numCorrect}/${response.numWordsSeen}`
        }
    }

    async init() {
        await this.startSession()
        await this.#fillButtonHTMLs()
        this.#createButtons()
    }

    #createButtons() {

        const buttonContainerContainer = document.createElement("div")
        buttonContainerContainer.setAttribute("class", "button-containers-container")
        buttonContainerContainer.setAttribute("id", "button-containers-container")

        for (const buttonHTML of this.#buttonHTMLs) {
            const buttonContainer = document.createElement("div")
            buttonContainer.setAttribute("class", "button-container")
            buttonContainer.innerHTML += buttonHTML
            buttonContainerContainer.appendChild(buttonContainer)
        }

        document.getElementById("main-content-wrapper").appendChild(buttonContainerContainer)
    }
}
