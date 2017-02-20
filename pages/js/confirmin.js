const {ipcRenderer} = require("electron")
// const {clockin, clockout} = remote.require("./index.js")

var okButton = document.getElementById("okay");

okButton.addEventListener("click", () => {

    var empID = document.getElementById("empid").value
    var err = document.getElementById("err");
    if(empID == "") {
        err.innerHTML = "Please provide your ID";
    } else {
        var err = ipcRenderer.sendSync('clockin', {emp_id: empID})
    }

});

// ipcRenderer.on("message", function(event, args) {
//     console.log("message:", args);
//     var err = document.getElementById("err");
//     if(args == "Welcome to work") {
//         console.log("welcome message:", args);
//         document.getElementById("welcome").innerHTML = args;
//         // set time interval to close the page
//     } else {
//         console.log("err message:", args);
//         err.innerHTML = args;
//     }
// })