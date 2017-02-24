const {remote, ipcRenderer} = require("electron")
const {fprint} = remote.require("./index.js")

var err = document.getElementById("err");
var okay = document.getElementById("welcome");
var okButton = document.getElementById("okay");
var fpBtn = document.getElementById("fprint");

okButton.addEventListener("click", () => {

    var empID = document.getElementById("empid").value
    var err = document.getElementById("err");
    if(empID == "") {
        err.innerHTML = "Please provide your ID";
    } else {
        ipcRenderer.send('clockout', {emp_id: empID})
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

ipcRenderer.on("clockout", function(event, m) {
    // var err = document.getElementById("err");
    if(m == "Goodbye") {
        document.getElementById("welcome").innerHTML = m + ", You can close the window.";
        // set time interval to close the page
    } else {
        err.innerHTML = m;
    }
})