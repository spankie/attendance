var {config} = require("../config/config");
var mysql = require("mysql");
var connection = mysql.createConnection(config.dbAttendance)
connection.connect();

function getPresentEmployees(callback) {
    console.log("employees coming right up");
    connection.query("SELECT roster.*, emp.fname, emp.lname FROM `roster`, employees emp WHERE DATE(date_in) = DATE(NOW()) AND roster.emp_id = emp.emp_id ORDER BY roster.date_in ASC", function(error, employees) {
        if(error) {
            console.log("error getting employees");
            callback("error");
        } else {
            console.log("employees gotten: ", employees, "\nlength:", employees.length);
            callback(employees);
        }
    })
}

module.exports.getPresentEmployees = getPresentEmployees;