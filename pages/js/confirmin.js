const {ipcRenderer, remote} = require("electron")
const {fprint} = remote.require("./index.js");
// const {clockin, clockout} = remote.require("./index.js")

var err = document.getElementById("err");
var okay = document.getElementById("welcome");
var okButton = document.getElementById("okay");
var fpBtn = document.getElementById("fprint");

okButton.addEventListener("click", () => {

    var empID = document.getElementById("empid").value
    if(empID == "") {
        err.innerHTML = "Please provide your ID";
    } else {
        ipcRenderer.send('clockin', {emp_id: empID})
    }

});


fpBtn.addEventListener("click", () => {
    var empid = document.getElementById("empid").value;
    if(empid != "") {
        fprint(empid);
    } else {
        err.innerHTML = "Input the employee id.";
        okay.innerHTML = "";
    }
    
})

ipcRenderer.on("clockin", function(event, m) {
    console.log("message:", m);
    
    if(m == "Welcome to work") {
        console.log("welcome message:", m);
        document.getElementById("welcome").innerHTML = m;
        // set time interval to close the page
    } else {
        console.log("err message:", m);
        err.innerHTML = m;
    }
})