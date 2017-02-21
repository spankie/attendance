var {config} = require("../config/config");
var mysql = require("mysql");
var connection = mysql.createConnection(config.dbAttendance)
connection.connect();

module.exports = function(emp, callback) {

    console.log("Signing up this user: ", JSON.stringify(emp));
    // check the db if that emp_id exists...
    connection.query("INSERT INTO employees SET ?", [emp], function(error, result) {
        if(error) {
            callback("error");
        } else {
            callback("ok");
        }
    });
}