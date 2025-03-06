// preload.js

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('fromMain', {
    startSession: () => ipcRenderer.invoke('start-session'),
    processAnswer: (answer) => ipcRenderer.invoke('process-answer', answer),
    fetchButtons: () => ipcRenderer.invoke('buttons')
})
