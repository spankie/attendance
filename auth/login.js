const {BrowserWindow} = require("electron")
const mysql = require("mysql")
const {config} = require("../config/config.js")
const path = require('path')
const url = require('url')

exports.login = (username, password) => {
    
    if(username == "" || password == "") return;

    var connection = mysql.createConnection(config.dbAttendance);
    
    connection.connect();
    
    console.log(username + " ::: " + password);

    var loginQuery = "SELECT * FROM admin WHERE username = '" + username + "' AND password = '" + password + "'";

    connection.query(loginQuery, function (error, results, fields) {
        if (error) console.log("error: ", error); //throw error
        else if (results && results.length > 0) {
            console.log('User: ', results[0].fname);
            createWindow()
        }
        
    });

    connection.end();
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