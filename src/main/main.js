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
    ipcMain.handle('start-session', async (_event, id) => {
        const packDirectory = path.join(__dirname, '..', '..', 'packs', id)
        await wordSetFileReader.registerNewFilepath(path.join(packDirectory, `data.jsonl`))
        const currentPackInfo = JSON.parse(fs.readFileSync(path.join(packDirectory, `metadata.json`)))
        await sessionState.init()
        return {
            currentPackInfo: currentPackInfo,
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

    // handler for pack request when loading home page
    ipcMain.handle('get-packs', async () => {
        return getPackInfo()
    })

    // handler for quitting a session
    ipcMain.handle('quit-session', async(_event) => {
        // release wordSetFileReader's resources
        wordSetFileReader.unregisterCurrentFile()
        return {
            success: true
        }
    })

    createWindow()
})

function getPackInfo() {
    const packsDirectory = path.join(__dirname, '..', '..', 'packs')
    const directoryEntryNames = fs.readdirSync(packsDirectory)
    // console.log(packFolderNames)
    const packsData = []
    for (const entryName of directoryEntryNames) {
        // is it a directory and is the json file is there
        const entryDirectory = path.join(packsDirectory, entryName)
        if (fs.statSync(entryDirectory).isDirectory() && fs.existsSync(path.join(entryDirectory,`metadata.json`))) {

            // read file, parse to JSON
            const packInfo = JSON.parse(fs.readFileSync(path.join(entryDirectory,`metadata.json`)))

            // check if image exists
            // if(fs.existsSync()) {
            //     return
            // }
            
            const imageData = fs.readFileSync(path.join(entryDirectory, packInfo.imagePath)).toString("base64")
            packInfo["image"] = imageData
            packsData.push(packInfo)
        }
    }

    return packsData
}
