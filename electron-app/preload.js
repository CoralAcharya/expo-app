// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Expose a safe, limited API to the renderer process (your React Native app)
contextBridge.exposeInMainWorld('electronAPI', {
  // Example: A function to send a message to the main process
  sendMessage: (message) => ipcRenderer.send('message-from-renderer', message),

  // Example: A function to receive messages from the main process
  // The callback will be invoked when the main process sends a 'message-to-renderer' event
  onMessage: (callback) => ipcRenderer.on('message-to-renderer', (event, message) => callback(message)),

  // You can expose other Electron/Node.js APIs here as needed,
  // but only expose what is absolutely necessary for security reasons.
  // For example, to trigger a native dialog:
  // openDialog: (options) => ipcRenderer.invoke('open-dialog', options)
});