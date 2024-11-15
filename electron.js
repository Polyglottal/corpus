const { app, ipcMain, BrowserWindow} = require('electron');
const path = require('path');
const db = require('./database/index');
const CreateDatabase = require('./models/createDatabase');
const { addNewProject, loadAllProjectTitles } = require('./ipc/projectHandling');

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        title: 'TekneGram',
        webPreferences: {
            preload: path.join(__dirname, 'electronPreload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            devTools: true
        },
    })

    mainWindow.loadURL('http://localhost:3000');
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

const createDatabase = () => {
    CreateDatabase.createProjectTable();
    CreateDatabase.createCorpusTable();
    CreateDatabase.createGroupTable();
    CreateDatabase.createFilesTable();
    CreateDatabase.createWordsTable();
    CreateDatabase.createCollsTable();
    CreateDatabase.createThreeBunsTable();
    CreateDatabase.createFourBunsTable();
}

const newProjectHandling = () => {
    addNewProject();
    loadAllProjectTitles();
}

app.on('ready', () => {
    createDatabase();
    createWindow();
    newProjectHandling();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});