function helpers() {

    setInterval(() => {
        if (global.mainWindow && !global.mainWindow.isDestroyed()) {
            global.mainWindow.webContents.send('response-data', 'datuak...');
        } else {
            console.error("Cannot send message, mainWindow is either destroyed or does not exist.");
        }
    }, 2000)


}

module.exports = helpers;