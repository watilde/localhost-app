const electron = require("electron");
const { ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const http = require("http");
const handler = require("serve-handler");

let server;
let mainWindow;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 680,
    height: 420,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on("closed", () => (mainWindow = null));
}

ipcMain.on("synchronous-message", (event, arg) => {
  if (arg.event === "start") {
    server = http.createServer((request, response) => {
      return handler(request, response, { public: arg.directory });
    });
    server.listen(arg.port, () => {
      console.log(`Running at http://localhost:${arg.port}`);
    });
  } else if (arg.event === "stop") {
    server.close();
  }
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
