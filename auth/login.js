const {BrowserWindow} = require("electron")
const {config} = require("../config/config.js")
const path = require('path')
const url = require('url')

var mysql = require("mysql");
var connection = mysql.createConnection(config.dbAttendance)
connection.connect();

exports.login = function (username, password) {
    
    if(username == "" || password == "") return;

    console.log("username and password not empty");
    console.log(username + " ::: " + password);

    var loginQuery = "SELECT * FROM admin WHERE username = '" + username + "' AND password = '" + password + "'";
    console.log(loginQuery);

    connection.query(loginQuery, function(error, results, fields) {
        if(error) {
            console.log(error);
            return;
        }
        if (results && (results.length > 0)) {
            console.log("results", results);
            createWindow();
        } else {
            console.log("no user");
        }
        console.log("no user...");
    });
    
}

function createWindow(){
    let win = new BrowserWindow({width: 400, height: 200})
    win.loadURL(url.format({
                pathname: path.join(__dirname + "/pages/", 'index.html'),
                protocol: 'file:',
                slashes: true
            }))

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}