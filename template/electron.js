process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "1";

const { app, screen, BrowserWindow } = require("electron");

/**
 * 自動生成ファイルの読み込み
 * Loading of auto-generated files
 */
const config = require("./electron.index.json");

app.commandLine.appendSwitch("disable-http-cache");

const createWindow = () =>
{
    const primaryDisplay    = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    const browserWindow = new BrowserWindow({
        "width": width,
        "height": height,
        "webPreferences": {
            "nodeIntegration": false
        }
    });

    /**
     * Chrome Developer Tools
     */
    // browserWindow.webContents.openDevTools();

    browserWindow.loadFile(config.path);
};

app
    .whenReady()
    .then(createWindow);

app
    .on("window-all-closed", () =>
    {
        /**
         * windowsならアプリを終了、macならdockに滞在
         * Exit apps if windows, stay in dock if mac
         */
        if (process.platform !== "darwin") {
            app.quit();
        }
    });

app
    .on("activate", () =>
    {
        /**
         * アプリで起動している画面がなければアプリを起動
         * If there is no screen running on the application, start the application.
         */
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });