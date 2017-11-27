const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const MainMenu = require('./menu')

const path = require('path')
const url = require('url')
const fs = require('fs')

// Load the config file from the appdir. (Not perfect, but it works!)
try {
  var config = require(__dirname + "/config.json");
} catch (e) {
  console.log("Config file not found! \n" + e.stack);
  process.exit();
}

let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: __dirname + 'assets/sy_icon.png',
    titleBarStyle: "hiddenInset"
  })

  const main_menu = Menu.buildFromTemplate(MainMenu.default_menu)
  mainWindow.setMenu(main_menu);
  // Maximize window on once it's opened. 
  mainWindow.maximize();

  mainWindow.webContents.on('dom-ready', function () {
    // Remove "looking for classic?"" link and try classic link on login page.
    mainWindow.webContents.insertCSS('.header-button-panel coral-shell-menubar-item:first-child { display: none; } .story_classic_msg { display: none; }')
    // Add custom Darkmode CSS (Is injected into the html document directly using javascript, to ensure proper style overrides. It might be messy but it works!)
    if(config.darkmodeEnabled == 'true') {
      fs.readFile(__dirname+ '/assets/darkStyle.css', "utf-8", function(error, data) {
      if(!error){
      var formattedData = data.replace(/\s{2,10}/g, ' ').trim()
      mainWindow.webContents.executeJavaScript('var head = document.head, style = document.createElement(\'style\'); style.type = \'text/css\'; style.id = \'customStyle\'; if (style.styleSheet){ style.styleSheet.cssText = "' + formattedData.replace(/\n/g, "") + '";} else { style.appendChild(document.createTextNode("' + formattedData.replace(/\n/g, "") + '")); } head.appendChild(style);')
      }
    })
    }
    if (process.platform == 'darwin') {
      // Move Story logo and menu to make space for "traffic lights" on OSX, it also makes the top menu dragable for moving the window around.
      mainWindow.webContents.insertCSS('#header-shell { -webkit-app-region: drag } .coral-Shell-header-home { margin-left: 70px !important; margin-right: 20px !important;} .coral-TabList { margin-left: 40px !important; }');
    }
  });

  // Loading the Adobe Story website, because of a weird bug with Story, the site will crash if run with Chrome as the user agent in Electron, so we fake it to use Safari instead.
  mainWindow.loadURL('https://story.adobe.com', {
    userAgent: 'Safari'
  });

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  mainWindow.on('enter-full-screen', function () {
    if (process.platform == 'darwin') {
      // When going to fullscreen we want the Story logo and menu to return to their original location.
      mainWindow.webContents.insertCSS('#header-shell { -webkit-app-region: drag } .coral-Shell-header-home { margin-left: 0px !important; margin-right: 0px !important;} .coral-TabList { margin-left: 0px !important; }');
    }
  })

  mainWindow.on('leave-full-screen', function () {
    if (process.platform == 'darwin') {
      // When fullscreen is left the Story logo should be moved back to make space for the OSX "traffic light" buttons.
      mainWindow.webContents.insertCSS('#header-shell { -webkit-app-region: drag } .coral-Shell-header-home { margin-left: 70px !important; margin-right: 20px !important;} .coral-TabList { margin-left: 40px !important; }');
    }
  })

  // Used for the help window to ensure it loads with the default mac titlebar.
  mainWindow.webContents.on('new-window', function (event, urlToOpen) {
    event.preventDefault();
    var newWindow = new BrowserWindow({
      width: 800,
      height: 600
    })
    newWindow.loadURL(urlToOpen);
  });

  // Change the menu depending on whether or not the script editor is open.
  mainWindow.webContents.on('did-navigate-in-page', function (event, url) {
    const edit_menu = Menu.buildFromTemplate(MainMenu.edit_menu)
    if (url.includes('adobe_gm_scripts')) {
      mainWindow.setMenu(null);
      Menu.setApplicationMenu(edit_menu)
    } else {
      mainWindow.setMenu(null);
      Menu.setApplicationMenu(main_menu)
    }
  })

  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // Weird issues occur when following OSX standards of closing apps, so it just quits it completely instead. 
    app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})