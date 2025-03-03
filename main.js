const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('next-word-set', () => {
    console.log("request for words received")
    return [
      ["temps", "m"],
      ["peu", "m"],
      ["vie", "f"],
      ["homme", "m"]
    ]
  })
  createWindow()
})
