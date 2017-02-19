// const {BrowserWindow, ipcMain} = require("electron")
const {config} = require("../config/config.js")
const path = require('path')
// const fs = require('fs');

var mysql = require("mysql");
var connection = mysql.createConnection(config.dbAttendance)
connection.connect();

exports.login = function (username, password, callback) {

    if(username == "" || password == "") return;

    console.log("username and password not empty");
    console.log(username + " ::: " + password);

    var loginQuery = "SELECT * FROM admin WHERE username = '" + username + "' AND password = '" + password + "'";
    console.log(loginQuery);

    connection.query(loginQuery, function(error, results, fields) {
        if(error) {
            // event.returnValue = "Username or Password is incorrect";
            callback("Username or Password is incorrect", username, password)
            console.log(error);
            return;
        }
        if (results && (results.length > 0)) {
            console.log("User Result:", results);
            // createWindow();
            callback("ok", username, password);
            return;
        } else {
            // event.returnValue = "Username or Password is incorrect";
            callback("Username or Password is incorrect", username, password)
            console.log("no user");
        }
        // console.log("no user...");
    });
}