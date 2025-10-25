const { app, BrowserWindow, ipcMain, globalShortcut, Menu, Tray } = require('electron');
const path = require('path');

let mainWindow;
let splashWindow;
let tray;

// Enable media key support
app.commandLine.appendSwitch('enable-features', 'MediaSessionService');

function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 600,
    height: 400,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  splashWindow.loadFile(path.join(__dirname, 'src', 'splash.html'));
  splashWindow.center();

  // Remove menu bar
  splashWindow.setMenuBarVisibility(false);
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 600,
    show: false,
    backgroundColor: '#0A1A1F',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true
    },
    icon: path.join(__dirname, 'RenosanceLogo.png')
  });

  // Load YouTube Music
  mainWindow.loadURL('https://music.youtube.com');

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    // Close splash window
    if (splashWindow) {
      splashWindow.close();
      splashWindow = null;
    }
    mainWindow.show();
  });

  // Create custom menu
  createMenu();

  // Handle window close - minimize to tray instead
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  // Open dev tools in dev mode
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }
}

function createMenu() {
  const template = [
    {
      label: 'Resonance',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
        { type: 'separator' },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'CommandOrControl+Shift+I',
          click: () => mainWindow.webContents.toggleDevTools()
        }
      ]
    },
    {
      label: 'Playback',
      submenu: [
        {
          label: 'Play/Pause',
          accelerator: 'Space',
          click: () => {
            mainWindow.webContents.executeJavaScript(`
              document.querySelector('.play-pause-button')?.click();
            `);
          }
        },
        {
          label: 'Next Track',
          accelerator: 'CommandOrControl+Right',
          click: () => {
            mainWindow.webContents.executeJavaScript(`
              document.querySelector('.next-button')?.click();
            `);
          }
        },
        {
          label: 'Previous Track',
          accelerator: 'CommandOrControl+Left',
          click: () => {
            mainWindow.webContents.executeJavaScript(`
              document.querySelector('.previous-button')?.click();
            `);
          }
        }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        {
          label: 'Show Resonance',
          click: () => {
            mainWindow.show();
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function createTray() {
  // Create tray icon (you'll need to add a smaller icon file for this)
  tray = new Tray(path.join(__dirname, 'RenosanceLogo.png'));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show Resonance',
      click: () => {
        mainWindow.show();
      }
    },
    {
      label: 'Play/Pause',
      click: () => {
        mainWindow.webContents.executeJavaScript(`
          document.querySelector('.play-pause-button')?.click();
        `);
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('Resonance - YouTube Music');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
}

function registerMediaKeys() {
  // Media key shortcuts
  globalShortcut.register('MediaPlayPause', () => {
    mainWindow.webContents.executeJavaScript(`
      document.querySelector('.play-pause-button')?.click();
    `);
  });

  globalShortcut.register('MediaNextTrack', () => {
    mainWindow.webContents.executeJavaScript(`
      document.querySelector('.next-button')?.click();
    `);
  });

  globalShortcut.register('MediaPreviousTrack', () => {
    mainWindow.webContents.executeJavaScript(`
      document.querySelector('.previous-button')?.click();
    `);
  });
}

// IPC handlers
ipcMain.on('splash-done', () => {
  if (splashWindow) {
    splashWindow.close();
    splashWindow = null;
  }
  if (mainWindow) {
    mainWindow.show();
  }
});

// App lifecycle
app.whenReady().then(() => {
  createSplashWindow();
  createMainWindow();
  createTray();
  registerMediaKeys();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    } else {
      mainWindow.show();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  app.isQuitting = true;
});

app.on('will-quit', () => {
  // Unregister all shortcuts
  globalShortcut.unregisterAll();
});

// Handle external URLs (open in default browser)
app.on('web-contents-created', (event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    // Allow YouTube Music URLs, open others in external browser
    if (url.startsWith('https://music.youtube.com')) {
      return { action: 'allow' };
    }
    require('electron').shell.openExternal(url);
    return { action: 'deny' };
  });
});
