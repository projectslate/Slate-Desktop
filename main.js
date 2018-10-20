const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let launcherWindow

function createWindow () {
  launcherWindow = new BrowserWindow({width:280, height: 350, frame: false, icon: "icon.png", resizable: false, show: false})

  launcherWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'launcher.html'),
    protocol: 'file:',
    slashes: true
  }))

  launcherWindow.once("ready-to-show", () => 
  {
    launcherWindow.show();
  });

  launcherWindow.on('closed', function () {
    launcherWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (launcherWindow === null) {
    createWindow()
  }
})