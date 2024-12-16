const { app, BrowserWindow } = require("electron");
const path = require("path");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Make sure React can interact with Electron
    },
  });

  win.loadURL("http://localhost:3000"); // If running in dev mode (React)
  // win.loadFile(path.join(__dirname, 'build', 'index.html')); // If running in production (React built files)
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
