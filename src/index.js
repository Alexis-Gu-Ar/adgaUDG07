// with app you can handdle events
// with BrowserWindows you can define how a window look
// with menu you can edit the navigation bar at the top of your app
const { app, BrowserWindow, Menu, ipcMain} = require('electron');
const url = require('url');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
    // for debuggin purposes, __dirname is the directory name of the current module
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron'),
        hardResetMethod: 'exit'

    });
};

let mainWindow;
let newProductWindow;

app.on('ready', () =>{
    mainWindow = new BrowserWindow(({}));
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }));

    // instanciates a menu
    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('closed', () => {
        app.quit();
    });
});

ipcMain.on('product:new', (event, newProduct) => {
    mainWindow.webContents.send('product:new', newProduct);
    newProductWindow.close();
});

const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New product',
                accelerator: 'Ctrl+N',
                // in the click event execute this code
                click() {
                    createProductWindow();
                }
            },
            {
                label: 'Remove All Products',
                click() {
                    mainWindow.webContents.send('product:deleteAll');
                }
            },
            {
                label: 'Exit',
                accelerator: process.platform === 'darwin' ? 'command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ],
    },
];

// if the platform is MAC
if (process.platform === 'darwin') {
    templateMenu.unshift({
        label: app.getName()
    });
}
if (process.env.NODE_ENV !== 'production'){
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide Dev Tools',
                accelerator: 'Ctrl+D',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}

function createProductWindow() {
    newProductWindow = new BrowserWindow({
        width:400,
        height: 330,
        title: 'Add a new product'
    });
    //newProductWindow.setMenu(null);
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new-product.html'),
        protocol: 'file',
        slashes: true
    }));
    newProductWindow.on('closed', () => {
        newProductWindow = null;
    });
}
