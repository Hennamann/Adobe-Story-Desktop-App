const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: __dirname + 'assets/sy_icon.png',
    titleBarStyle: "hiddenInset"
  })
  mainWindow.setMenu(null);

  mainWindow.webContents.on('did-finish-load', function () {
    mainWindow.webContents.insertCSS('.header-button-panel coral-shell-menubar-item:first-child { display: none; }')
    if (process.platform == 'darwin') {
      mainWindow.webContents.insertCSS('#header-shell { -webkit-app-region: drag } .coral-Shell-header-home { margin-left: 70px !important; margin-right: 20px !important;} .coral-TabList { margin-left: 40px !important; }');
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL('https://story.adobe.com', {
    userAgent: 'Safari'
  });

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  mainWindow.on('enter-full-screen', function () {
    if (process.platform == 'darwin') {
      mainWindow.webContents.insertCSS('#header-shell { -webkit-app-region: drag } .coral-Shell-header-home { margin-left: 0px !important; margin-right: 0px !important;} .coral-TabList { margin-left: 0px !important; }');
    }
  })

  mainWindow.on('leave-full-screen', function () {
    if (process.platform == 'darwin') {
      mainWindow.webContents.insertCSS('#header-shell { -webkit-app-region: drag } .coral-Shell-header-home { margin-left: 70px !important; margin-right: 20px !important;} .coral-TabList { margin-left: 40px !important; }');
    }
  })

  mainWindow.webContents.on('new-window', function (event, urlToOpen) {
    event.preventDefault();
    var newWindow = new BrowserWindow({
      width: 800,
      height: 600
    })
    newWindow.loadURL(urlToOpen);
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  require('./mainmenu')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})