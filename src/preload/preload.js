// preload.js

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('fromMain', {
    getPackInfo: () => ipcRenderer.invoke('get-packs'),
    startSession: (id) => ipcRenderer.invoke('start-session', id),
    processAnswer: (answer) => ipcRenderer.invoke('process-answer', answer)
})
