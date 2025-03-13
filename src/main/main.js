const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const fs = require('node:fs')

const WordSetFileReader = require('./WordSetFileReader.js')
const SessionState = require('./SessionState.js')

const wordSetFileReader = new WordSetFileReader()
const WORD_SET_SIZE = 10
const sessionState = new SessionState(async () => { return await wordSetFileReader.getNextWordSet(WORD_SET_SIZE) })

const createWindow = () => {
    const win = new BrowserWindow({
        width: 480,
        height: 640,
        webPreferences: {
            preload: path.join(__dirname, '..', 'preload', 'preload.js')
        }
    })

    win.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'))
    win.webContents.openDevTools()
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

    // handler for pack request when loading home page
    ipcMain.handle('get-packs', async () => {
        return getPackInfo()
    })

    // for pack selection
    ipcMain.handle('select-pack', async (_event, id) => {
        await wordSetFileReader.registerNewFilepath(path.join(__dirname, '..', '..', 'packs', id, `${id}.jsonl`))
        console.log(`pack selected: ${id}`)
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

    // get neuter button
    try {
        const data = fs.readFileSync(path.join(__dirname, 'components', 'neuterButton.html'), 'utf8')
        buttonHTMLs.push(data)
    }
    catch (err) {
        console.error(err)
        return ['<span>Issue acquiring buttons</span>']
    }
    
    return buttonHTMLs
}

function getPackInfo() {
    const packDirectory = path.join(__dirname, '..', '..', 'packs')
    const directoryEntryNames = fs.readdirSync(packDirectory)
    // console.log(packFolderNames)
    const data = []
    for (const entryName of directoryEntryNames) {
        try {
            // is it a directory
            if (fs.statSync(path.join(packDirectory, entryName)).isDirectory()) {
                const metadataFileName = path.join(packDirectory, entryName, `${entryName}`)
                // check that the json file is there
                if (fs.existsSync(`${metadataFileName}.json`)) {
                    // read file, parse to JSON, append to data array
                    data.push(JSON.parse(fs.readFileSync(`${metadataFileName}.json`)))
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return data
}