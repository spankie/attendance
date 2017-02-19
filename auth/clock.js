const mysql = require("mysql");

var connection = mysql.createConnection(config.dbAttendance);
connection.connect();

function clockIN(id, callback) {
    // check if the employee has clocked in or out already.
    var data = {emp_id: id, date_in: "CURRENT_TIMESTAMP"};
    connection.query("INSERT INTO roster SET ?", [data], function(error, results) {
        if(error) {
            console.log("error inserting clockin roster.");
            return;
        }
        callback();

    })
}

function clockOUT(id, callback) {
    // check if the employee has clocked in or out already.
    var data = {date_out: "CURRENT_TIMESTAMP"};
    connection.query("UPDATE roster SET ? WHERE emp_id = ?", [data, id], function(error, results) {
        if(error) {
            console.log("error inserting clockin roster.");
            return;
        }
        callback();

    })
}

module.exports.clockIN = clockIN;
module.exports.clockOUT = clockOUT;