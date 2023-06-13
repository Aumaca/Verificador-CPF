const { app, BrowserWindow, Menu, shell } = require("electron");
const path = require("path");

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 450,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contentSecurityPolicy: "default-src 'self'; script-src 'self';"
        },
        resizable: false,
    })
    win.loadFile("index.html");
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

const menu = Menu.buildFromTemplate([
    {
        label: "About",
        submenu: [
            {
                label: "My GitHub",
                click: async() => {
                    await shell.openExternal('https://github.com/Aumaca')
                }
            }
        ]
    }
])

Menu.setApplicationMenu(menu);