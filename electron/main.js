import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { startGraphQL } from "./index.js";

let mainWindow;

const isDev = !app.isPackaged;

app.whenReady().then(async () => {
  await startGraphQL();

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      preload: path.join(app.getAppPath(), "electron", "preload.js"),
      sandbox: false,
      contextIsolation: true,
    },
  });

  ipcMain.on("closeApp", () => {
    const currentWindow = BrowserWindow.getFocusedWindow();
    if (currentWindow) {
      currentWindow.close();
    }
  });

  ipcMain.on("minimizeApp", () => {
    const currentWindow = BrowserWindow.getFocusedWindow();
    if (currentWindow) {
      currentWindow.minimize();
    }
  });

  if (isDev) {
    // Development: use Vite dev server
    await mainWindow.loadURL("http://localhost:5173");
  } else {
    const indexHtml = path.join(
      process.resourcesPath,
      "app.asar",
      "dist",
      "index.html",
    );

    await mainWindow.loadFile(indexHtml);
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
