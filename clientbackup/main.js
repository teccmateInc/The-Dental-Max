const {app, BrowserWindow, Menu, MenuItem, electron} = require('electron')
const path = require('path')
const url = require('url')

let win
let one

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600,icon:'file://' +  __dirname + 'dist/web/favicon.ico'})

  // load the dist folder from Angular
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/web/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  const template = [
    {
      label: 'Quick Order',
      click () {secondWndow();}
    },
    {
      role: 'help',
   
    }
  ]

  const menu = Menu.buildFromTemplate(template);
  //Menu.setApplicationMenu(menu);
  win.setMenu(menu);

  var newWindow = null;

 function openAboutWindow() {
  if (newWindow) {
   newWindow.focus()
   return;
 }

 newWindow = new BrowserWindow({
  height: 185,
  resizable: false,
  width: 270,
  title: "",
  minimizable: false,
  fullscreenable: false,
 });

 newWindow.setMenu(null);

 newWindow.loadURL('file://' + __dirname + '/src/dist/fine/index.html/favicon.ico');

  newWindow.on('closed', function () {
  newWindow = null;
 });
}

  // Open the DevTools optionally:
  //win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}



function secondWndow() {
  one = new BrowserWindow({width: 800, height: 600,icon:'file://' +  __dirname + 'dist/web/favicon.ico'})
  one.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/web/index.html'),
    protocol: 'file:',
    slashes: true,
    hash: '/customer/new-customer/0'
  }));
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('uncaughtException', function (err) {
  console.log("***WHOOPS TIME****"+err);
});


