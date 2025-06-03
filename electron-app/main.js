// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200, // Adjust as needed
    height: 800, // Adjust as needed
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // For secure context bridge
      nodeIntegration: false, // It's safer to keep this false
      contextIsolation: true, // Recommended for security
      webSecurity: false, // Allow loading local files (important for file:// protocol)
    },
  });

  // Load the index.html of the app.
  // We will point this to the built Expo web app's index.html
  const startUrl = url.format({
    pathname: path.join(__dirname, '..', 'dist', 'index.html'), // Path to your Expo web build
    protocol: 'file:',
    slashes: true,
  });

  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});