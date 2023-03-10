const { app, BrowserWindow } = require("electron");
const path = require("path");

const server = require(path.join(__dirname, "api/server"));

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 1200,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadURL((`file://${__dirname}/ui/index.html`));
    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("resize", function (e, x, y) {
    mainWindow.setSize(x, y);
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});