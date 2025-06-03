// electron.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');

let expoProcess;

function waitForServerReady(url, maxAttempts = 20, delay = 500) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const check = () => {
      http.get(url, (res) => {
        if (res.statusCode === 200) {
          resolve();
        } else {
          retry();
        }
      }).on('error', retry);
    };

    const retry = () => {
      if (++attempts >= maxAttempts) {
        reject(new Error('Expo web server did not start in time.'));
      } else {
        setTimeout(check, delay);
      }
    };

    check();
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  win.loadURL('http://localhost:8081');
}

app.whenReady().then(async () => {
  console.log('Starting Expo web server...');

  expoProcess = spawn('npx', ['expo', 'start', '--web'], {
    cwd: process.cwd(),
    shell: true,
    detached: false,
    stdio: 'inherit',
  });

  try {
    await waitForServerReady('http://localhost:8081');
    console.log('Expo web server is ready. Launching Electron window...');
    createWindow();
  } catch (error) {
    console.error(error);
    app.quit();
  }
});

app.on('window-all-closed', () => {
  if (expoProcess) {
    expoProcess.kill();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
