const spawn = require('child_process').spawn;
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

function fprint(emp) {
    var child = spawn("java", ["-cp", "/home/spankie/fprint/:/home/spankie/fprint/dpuareu.jar:/home/spankie/fprint/mysql-connector-java-5.1.40-bin.jar", "UareUSampleJava", emp]);
    
    child.on('close', function (exitCode) {
        if (exitCode !== 0) {
            console.error('Something went wrong!');
        }
    });

    child.on("data", function(data){
        process.stdout.write(data);
    });
}

module.exports.getPresentEmployees = getPresentEmployees;
module.exports.fprint = fprint;