// preload.js

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('fromMain', {
    fetchNextWordSet: () => ipcRenderer.invoke('next-word-set')
})
