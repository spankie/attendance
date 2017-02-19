const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs');

var auth = require("./auth/login.js");
var clock = require("./auth/clock")

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let userDataConfig = path.join(app.getPath("userData"), "store.json");

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // authenticate user before deciding the page to load.

  // and load the index.html of the app.
  var obj = parseDataFile(userDataConfig, {});
  if (obj.username && obj.password) {
    console.log("Username and password found");
    auth.login(obj.username, obj.password, checkLogin);
  } else {
    console.log("username and password not found\nCall loginWindow()...")
    loginWindow();
  }

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// exports.auth = require("./auth/login.js");

function parseDataFile(filePath, defaults) {
  console.log("parsing data file from ", userDataConfig);
  // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
  // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    // if there was some kind of error, return the passed in defaults instead.
    return defaults;
  }
}

function storeDataFile(data) {
  console.log("storing data file to ", userDataConfig);
  fs.writeFileSync(userDataConfig, JSON.stringify(data));
}

function clockWindow() {
  console.log("loading clock window");
    win.loadURL(url.format({
      pathname: path.join(__dirname + "/pages/", 'clock.html'), // load the clock in/out page
      protocol: 'file:',
      slashes: true
    }));
}

function loginWindow() {
  console.log("loading login window");
    win.loadURL(url.format({
      pathname: path.join(__dirname + "/pages/", 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
}

function confirmWindow(clock) {
  console.log("loading confirm window");
  var win = new BrowserWindow({width: 450, height: 300});
  if(clock == "in") {
      win.loadURL(url.format({
        pathname: path.join(__dirname + "/pages/", 'confirmin.html'),
        protocol: 'file:',
        slashes: true
      }))
  } else if (clock == "out") {
      win.loadURL(url.format({
        pathname: path.join(__dirname + "/pages/", 'confirmout.html'),
        protocol: 'file:',
        slashes: true
      }))
  }

}

function checkLogin(msg, uname, pass) {
  console.log("checking if login was successful...");
  if(msg == "ok") {
    var obj = parseDataFile(userDataConfig, {});
    obj.username = uname;
    obj.password = pass;
    storeDataFile(obj);
    clockWindow();
    return;      
  } else {
    loginWindow();
  }
}

function clockin(id) {
  console.log("clockin()")
  clock.clockIN(id, function(message) {
        ipcMain.on('message', (event, arg) => {
            console.log("send :", message, ": to confirmin.html");
            event.sender.send("message", message);
        });
  });
}

function clockout(id) {
  console.log("clockout()");
  clock.clockOUT(id, function(message) {
        ipcMain.on('message', (event, arg) => {
            console.log("send :", message, ": to confirmout.html");
            event.sender.send("message", message);
        });
  });
}

// exports.recreateWindow = clockWindow;

ipcMain.on('login', (event, arg) => {
    console.log("username:", arg.username);
    console.log("password:", arg.password);
    auth.login(arg.username, arg.password, checkLogin);
    // event.returnValue = "logged in";
});

ipcMain.on('clockin', (event, arg) => {
    console.log("request to clock in");
    clockin(arg.emp_id)
    // event.returnValue = "clocked in";
});

ipcMain.on('clockout', (event, arg) => {
    console.log("request to clock out");
    clockout(arg.emp_id)
    // event.returnValue = "clocked Out";
});

module.exports.confirmWindow = confirmWindow;
module.exports.clockin = clockin;
module.exports.clockout = clockout;