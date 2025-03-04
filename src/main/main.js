const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const WordSetFileReader = require('./WordSetFileReader.js')

const wordSetFileReader = new WordSetFileReader(path.join(__dirname, '..', '..', 'data', 'output.csv'))
const WORD_SET_SIZE = 50

const createWindow = () => {
  const win = new BrowserWindow({
    width: 480,
    height: 640,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preload', 'preload.js')
    }
  })

  win.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'))
}

app.whenReady().then(() => {
  ipcMain.handle('next-word-set', () => {
    console.log("request for words received")
    return fetchCsvWordSet()
  })
  createWindow()
})

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
