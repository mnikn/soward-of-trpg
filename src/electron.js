const {
    app,
    BrowserWindow
} = require('electron');

let win = null;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            webSecurity: false
        }
    });
    win.loadURL('http://localhost:4200/');
    win.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (window === null) {
        createWindow();
    }
});
