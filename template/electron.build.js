module.exports = {
    "appId": "app.example.appId",
    "productName": "Example-Product-Name",
    "directories": {
        "output": "dist"
    },
    "copyright": "Copyright ©2023 Example-Product-Name",
    "extraMetadata": {
        "version": "0.0.1",
        "main": "electron.js"
    },
    "files": [
        "!__tests__/{,/**/*}",
        "!file/{,/**/*}",
        "!mock/{,/**/*}",
        "!src/{,/**/*}",
        "!icon/{,/**/*}",
        "!ios/{,/**/*}",
        "!android/{,/**/*}"
    ],
    "mac": {
        "target": "dmg",
        "icon": "icon/macos/icon.icns"
    },
    "win": {
        "target": "nsis",
        "icon": "icon/windows/icon.png"
    },
    "nsis": {
        "oneClick": false,
        "allowToChangeInstallationDirectory": true
    }
};