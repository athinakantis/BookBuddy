import { app, BrowserWindow } from "electron";
import path from "path";
import { startGraphQL } from "./index.js";

let mainWindow;

const isDev = !app.isPackaged;

app.whenReady().then(async () => {
  await startGraphQL();

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    backgroundColor: "oklch(21% 0.034 264.665)",
    webPreferences: {
      sandbox: false,
    },
  });

  if (isDev) {
    // Development: use Vite dev server
    await mainWindow.loadURL("http://localhost:5173");
  } else {
    const indexHtml = path.join(app.getAppPath(), "../../../../", "dist", "index.html");
    
    console.log("Loading frontend from:", indexHtml);

    await mainWindow.loadFile(indexHtml);
  }
});
