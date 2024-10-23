const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron');
const path = require('path');

const helpers = require('./src/helpers.js')

global.global.mainWindow = null;

// Disable hardware acceleration
app.disableHardwareAcceleration();

async function createWindow() {

  global.mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Adjust based on your security needs
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
      // Disable features like Autofill
      disableBlinkFeatures: 'Autofill'
    }
  });

  // Load the correct HTML file based on the environment
  if (app.isPackaged) {

    global.mainWindow.webContents.on('devtools-opened', () => {
      global.mainWindow.webContents.closeDevTools();
    });

    // Ensure this path points to your built index.html
    global.mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));

  } else {
    global.mainWindow.loadURL('http://localhost:5173'); // Development URL
  }

  // Open Developer Tools (for development)
  global.mainWindow.webContents.openDevTools();



}

app.whenReady().then({
  createWindow
  // Set a cookie with the given cookie data;
  // may overwrite equivalent cookies if they exist.
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});


ipcMain.on("from-main", async (event, data) => {
  helpers();
});