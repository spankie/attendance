const {ipcRenderer} = require("electron");

var saveBtn = document.getElementById("save");

var err = document.getElementById("err");
var okay = document.getElementById("okay");

saveBtn.addEventListener("click", () => {
    var empid = document.getElementById("empid").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var d = document.getElementById("department");
    var dept = d.options[d.selectedIndex].value
    var s = document.getElementById("sex");
    var sex = s.options[s.selectedIndex].value

    if (empid == "" || fname == "" || lname == "" || dept == "" || sex == "") {
        err.innerHTML = "Fill out all fields";
        okay.innerHTML = "";
        return
    } else {
        err.innerHTML = "";
        okay.innerHTML = "";
        ipcRenderer.send("signup", {emp_id: empid, fname: fname, lname: lname, dept: dept, sex: sex});
    }
    
})

ipcRenderer.on("signup", function(event, res) {
    if(res == "error") {
        err.innerHTML = "Could not sign you up.";
        okay.innerHTML = "";
    } else {
        err.innerHTML = "";
        okay.innerHTML = "Signup Successful.";
    }

})