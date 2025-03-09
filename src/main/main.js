const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const fs = require('node:fs')

const WordSetFileReader = require('./WordSetFileReader.js')
const SessionState = require('./SessionState.js')

const wordSetFileReader = new WordSetFileReader(path.join(__dirname, '..', '..', 'data', 'fr.jsonl'))
const sessionState = new SessionState(fetchCsvWordSet)
const WORD_SET_SIZE = 20

const createWindow = () => {
    const win = new BrowserWindow({
        width: 480,
        height: 640,
        webPreferences: {
            preload: path.join(__dirname, '..', 'preload', 'preload.js')
        }
    })

    win.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'))

    // win.webContents.openDevTools()
}

app.whenReady().then(() => {

    // handler for starting session
    ipcMain.handle('start-session', async () => {
        await sessionState.init()
        return {
            nextWord: sessionState.getCurrentWord(),
            numCorrect: sessionState.getNumCorrect(),
            numWordsSeen: sessionState.getNumWordsSeen()
        }
    })

    // handler for answer processing
    ipcMain.handle('process-answer', async (_event, answer) => {
        sessionState.updateScore(answer)
        await sessionState.next()
        return {
            nextWord: sessionState.getCurrentWord(),
            numCorrect: sessionState.getNumCorrect(),
            numWordsSeen: sessionState.getNumWordsSeen() 
        }
    })

    // handler for button components request
    ipcMain.handle('buttons', async () => {
        return fetchButtons()
    })

    createWindow()
})

function fetchButtons() {
    // @TODO: determine which buttons to get by language
    const buttonHTMLs = []

    // get masculine button
    try {
        const data = fs.readFileSync(path.join(__dirname, 'components', 'mascButton.html'), 'utf8')
        buttonHTMLs.push(data)
    }
    catch (err) {
        console.error(err)
        return ['<span>Issue acquiring buttons</span>']
    }

    // get feminine button
    try {
        const data = fs.readFileSync(path.join(__dirname, 'components', 'femButton.html'), 'utf8')
        buttonHTMLs.push(data)
    }
    catch (err) {
        console.error(err)
        return ['<span>Issue acquiring buttons</span>']
    }
    
    return buttonHTMLs
}

function fetchMockWordSet() {
    return [
        ["temps", "m"],
        ["peu", "m"],
        ["vie", "f"],
        ["homme", "m"]
    ]
}

function fetchCsvWordSet() {
    return wordSetFileReader.getNextWordSet(WORD_SET_SIZE)  
}
