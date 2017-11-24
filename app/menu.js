const {
  Menu
} = require('electron')
const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const app = electron.app

const template = [{
  label: 'Edit',
  submenu: [{
      role: 'undo'
    },
    {
      role: 'redo'
    },
    {
      type: 'separator'
    },
    {
      role: 'cut'
    },
    {
      role: 'copy'
    },
    {
      role: 'paste'
    },
    {
      role: 'pasteandmatchstyle'
    },
    {
      role: 'delete'
    },
    {
      role: 'selectall'
    }
  ]
},
{
  label: 'View',
  submenu: [{
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click(item, focusedWindow) {
        if (focusedWindow) focusedWindow.reload()
      }
    },
    {
      type: 'separator'
    },
    {
      role: 'resetzoom'
    },
    {
      role: 'zoomin'
    },
    {
      role: 'zoomout'
    },
    {
      type: 'separator'
    },
    {
      role: 'togglefullscreen'
    }
  ]
},
{
  role: 'window',
  submenu: [{
      role: 'minimize'
    },
    {
      role: 'close'
    }
  ]
},
{
  role: 'help',
  submenu: [{
    label: 'Story Help',
    click() {
      openHelpWindow()
    }
  }]
}
]

if (process.platform === 'darwin') {
const name = app.getName()
template.unshift({
  label: name,
  submenu: [{
      role: 'about'
    },
    {
      type: 'separator'
    },
    {
      role: 'services',
      submenu: []
    },
    {
      type: 'separator'
    },
    {
      role: 'hide'
    },
    {
      role: 'hideothers'
    },
    {
      role: 'unhide'
    },
    {
      type: 'separator'
    },
    {
      role: 'quit'
    }
  ]
})
// Edit menu.
template[1].submenu.push({
  type: 'separator'
}, {
  label: 'Speech',
  submenu: [{
      role: 'startspeaking'
    },
    {
      role: 'stopspeaking'
    }
  ]
})
// Window menu.
template[3].submenu = [{
    label: 'Close',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  },
  {
    label: 'Minimize',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  },
  {
    label: 'Zoom',
    role: 'zoom'
  },
  {
    type: 'separator'
  },
  {
    label: 'Bring All to Front',
    role: 'front'
  }
]
}

const edit_template = [{
  label: 'Edit',
  submenu: [{
      role: 'undo'
    },
    {
      role: 'redo'
    },
    {
      type: 'separator'
    },
    {
      role: 'cut'
    },
    {
      role: 'copy'
    },
    {
      role: 'paste'
    },
    {
      role: 'pasteandmatchstyle'
    },
    {
      role: 'delete'
    },
    {
      role: 'selectall'
    },
  ]
},
{
  label: "Format",
  submenu: [{
      label: "Bold",
      accelerator: "CmdOrCtrl+B"
    },
    {
      label: "Italic",
      accelerator: "CmdOrCtrl+I"
    },
    {
      label: "Underline",
      accelerator: "CmdOrCtrl+U"
    }]
},
{
  label: 'View',
  submenu: [{
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click(item, focusedWindow) {
        if (focusedWindow) focusedWindow.reload()
      }
    },
    {
      type: 'separator'
    },
    {
      role: 'resetzoom'
    },
    {
      role: 'zoomin'
    },
    {
      role: 'zoomout'
    },
    {
      type: 'separator'
    },
    {
      role: 'togglefullscreen'
    }
  ]
},
{
  role: 'window',
  submenu: [{
      role: 'minimize'
    },
    {
      role: 'close'
    }
  ]
},
{
  role: 'help',
  submenu: [{
    label: 'Story Help',
    click() {
      openHelpWindow()
    }
  }]
}
]

if (process.platform === 'darwin') {
const name = app.getName()
edit_template.unshift({
  label: name,
  submenu: [{
      role: 'about'
    },
    {
      type: 'separator'
    },
    {
      role: 'services',
      submenu: []
    },
    {
      type: 'separator'
    },
    {
      role: 'hide'
    },
    {
      role: 'hideothers'
    },
    {
      role: 'unhide'
    },
    {
      type: 'separator'
    },
    {
      role: 'quit'
    }
  ]
})
// Edit menu.
edit_template[1].submenu.push({
  type: 'separator'
}, {
  label: 'Speech',
  submenu: [{
      role: 'startspeaking'
    },
    {
      role: 'stopspeaking'
    }
  ]
})
// Window menu.
edit_template[3].submenu = [{
    label: 'Close',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  },
  {
    label: 'Minimize',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  },
  {
    label: 'Zoom',
    role: 'zoom'
  },
  {
    type: 'separator'
  },
  {
    label: 'Bring All to Front',
    role: 'front'
  }
]
}

function openHelpWindow() {
  var helpWindow = new BrowserWindow({
    width: 800,
    height: 600
  })
  helpWindow.loadURL('https://helpx.adobe.com/story/topics.html');
}

module.exports = { default_menu: template, edit_menu: edit_template }