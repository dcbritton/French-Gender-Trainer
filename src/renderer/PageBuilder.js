// PageBuilder.js

class PageBuilder {

    #buttonHTMLs = []
    #fillButtonHTMLs = async () => {}
    
    constructor(getButtons) {
        this.#fillButtonHTMLs = async () => {
            this.#buttonHTMLs = await getButtons()
        }
    }

    async init() {
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

        document.getElementById("quiz-content-wrapper").appendChild(buttonContainerContainer)
        return buttonContainer
    }
}
