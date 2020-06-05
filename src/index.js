'use strict'

import {
  app,
  protocol,
  BrowserWindow,
  Menu,
  Tray
} from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const path = require('path')
const isDevelopment = process.env.NODE_ENV !== 'production'

let win

protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])


function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    // resizable: false,
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: true,
      webSecurity: false,
    }
  })

  

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL(`file://${__dirname}/index.html`)
  }


  win.on('closed', () => {
    win = null
  })
}

function setApplicationMenu() {
  //去掉默认菜单栏
  Menu.setApplicationMenu(null);
}

function setAppTray() {
  //创建任务栏图标、菜单
  let appIconPath = path.join(__dirname, "./logo.png");
  if (process.env.NODE_ENV === "development") {
    appIconPath = path.join(
      __dirname,
      "../src/assets/logo.png"
    );
  }
  const tray = new Tray(appIconPath);
  const trayContextMenu = Menu.buildFromTemplate([
    {
      label: '打开',
      click: () => {
        win.show();
      }
    }, {
      label: '退出',
      click: () => {
        app.quit();
      }
    }
  ]);
  
  tray.setToolTip('单机版');
  tray.on('click', () => {
    win.show();
  });
  tray.on('right-click', () => {
    tray.popUpContextMenu(trayContextMenu);
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', async () => {
  createWindow()
  setApplicationMenu()
  setAppTray()

  if (process.env.NODE_ENV === "development") {
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}