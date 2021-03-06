const mysql = require("mysql");
const {config} = require("../config/config.js")


var connection = mysql.createConnection(config.dbAttendance);
connection.connect();

function checkIn(id, callback) {
    console.log("inside checkIn()");
    connection.query("SELECT * FROM roster WHERE DATE(date_in) = DATE(NOW()) AND emp_id = ?", [id], function(error, results) {
        if(error) {
            console.log("error checking the roster. (IN)");
            callback("Error Clocking In")
            return;
        }
        if(results.length > 0) {
            // the employee has clocked in...
            console.log("the employee has clocked in already...");
            callback("You are clocked in already")
        } else {
            // the employee has not clocked in...
            console.log("the employee has not clocked in...");
            clockIN(id, callback);
            return;
        }

    })
}

function checkOut(id, callback) {
    console.log("inside checkOut()");
    connection.query("SELECT * FROM roster WHERE DATE(date_in) = DATE(NOW()) AND DATE(date_out) = DATE(NOW()) AND emp_id = ?", [id], function(error, results) {
        if(error) {
            console.log("error checking the roster. (OUT)");
            callback("Error Clocking Out")
            return;
        }
        // callback();
        if(results.length > 0) {
            // the employee has clocked out...
            console.log("the employee has clocked out...", JSON.stringify(results));
            callback("You are already Clocked Out");
        } else {
            // the employee has not clocked out...
            console.log("the employee has not clocked out...");
            clockOUT(id, callback)
            return;
        }

    })
}

function clockIN(id, callback) {
    console.log("clockIn(id, callback)");
    // var data = {emp_id: id, date_in: NOW()};
    connection.query("INSERT INTO roster SET emp_id = ?, date_in = CURRENT_TIMESTAMP", [id], function(error, results) {
        if(error) {
            console.log("error inserting clockin roster.");
            callback("Error Clocking In");
            return;
        }
        console.log("welcome to work...")
        callback("Welcome to work");
        return;
    })
}

function clockOUT(id, callback) {
    console.log("clockOut(id, callback)");
    // var data = {date_out: "NOW()"};
    connection.query("UPDATE roster SET date_out = CURRENT_TIMESTAMP WHERE emp_id = ? AND DATE(date_in) = DATE(NOW())", [id], function(error, results) {
        if(error) {
            console.log("error inserting clockin roster.");
            callback("Sorry, could not clock you out.")
            return;
        }
        console.log("Goodbye...")
        callback("Goodbye");
        return;
    })
}

module.exports.clockIN = checkIn;
// function (id, callback) {
//     console.log("checkIn()");
//     checkIn(id, callback);
// }
module.exports.clockOUT = checkOut;
// function (id, callback) {
//     console.log("checkOut()");
//     checkOut(id, callback);
// }