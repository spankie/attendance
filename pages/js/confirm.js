const remote = require("electron").remote
const {clockin, clockout} = remote.require("./index.js")

var okButton = document.getElementById("okay");

okButton.addEventListener("click", () => {

    var empID = document.getElementById("empid").value
    var err = document.getElementById("err");
    if(empID == "") {
        err.innerHTML = "Please provide your ID";
    } else {

    }

});