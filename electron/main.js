import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { startGraphQL } from "./index.js";
import logger from "./logger.js";
const __dirname = import.meta.dirname;

let mainWindow;

const isDev = !app.isPackaged;
const preloadPath = isDev
  ? path.join(__dirname, "preload.js")
  : path.join(__dirname, "..", "electron", "preload.js")

app.whenReady().then(async () => {
  logger.info('App is ready - starting backend');
  await startGraphQL();
  logger.info('GraphQL started');

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      preload: preloadPath,
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
    logger.info('Loading dev server at http://localhost:5173');
    await mainWindow.loadURL("http://localhost:5173");
  } else {
    const indexHtml = path.join(
      process.resourcesPath,
      "app.asar",
      "dist",
      "index.html",
    );

    logger.info({ path: indexHtml }, 'Loading packaged index.html');
    await mainWindow.loadFile(indexHtml);
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
