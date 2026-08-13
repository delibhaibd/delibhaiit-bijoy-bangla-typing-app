import { contextBridge } from 'electron';

// Expose safe APIs to renderer
contextBridge.exposeInMainWorld('electron', {
  // Add any specific API you want to expose here
});
