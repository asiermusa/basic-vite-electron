const {
    ipcRenderer
} = require('electron');

window.electronAPI = {
    send: (channel, data) => ipcRenderer.send(channel, data),
    receive: (channel, callback) => ipcRenderer.on(channel, (event, ...args) => callback(...args))
};