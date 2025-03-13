// preload.js

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('fromMain', {
    getPackInfo: () => ipcRenderer.invoke('get-packs'),
    selectPack: (id) => ipcRenderer.invoke('select-pack', id),
    startSession: () => ipcRenderer.invoke('start-session'),
    fetchButtons: () => ipcRenderer.invoke('buttons'),
    processAnswer: (answer) => ipcRenderer.invoke('process-answer', answer)
})
