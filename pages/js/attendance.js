const {ipcRenderer} = require("electron");

ipcRenderer.on("present", function(event, arg) {
    var err = document.getElementById("error")
    
    if(arg == "error") {
        err.innerHTML = "No Body don come work o...";
    } else if (arg.length == 0){
        err.innerHTML = "No Body don come work o...";
    } else {
        // populate the table with the result.
        addRow(arg);
    }

})

function formatDatetoTime(date) {
    if(date == null) return null;
    var time = new Date(date);
    var h = time.getHours();
    var m = time.getMinutes();
    var s = time.getSeconds();
    var period = h < 12 ? " am" : " pm";
    return h + ":" + m + ":" + s + period;
}


function addRow(employees) {
    var tbody = document.getElementById("empTable").getElementsByTagName("tbody");
    var count = 1;
    employees.forEach(function(item) {
        console.log("id: ",item.emp_id, " date_in:", item.date_in, " date_out:", item.date_out);
        var tr = document.createElement("tr");
        tr.classList.add("bg-white");
        var sn = document.createElement("td")
        var name = document.createElement("td")
        var ID = document.createElement("td")
        var d_in = document.createElement("td")
        var d_out = document.createElement("td")
        
        sn.appendChild(document.createTextNode(count));
        name.appendChild(document.createTextNode(item.fname + " " + item.lname));
        ID.appendChild(document.createTextNode(item.emp_id));
        d_in.appendChild(document.createTextNode(formatDatetoTime(item.date_in)));
        d_out.appendChild(document.createTextNode(formatDatetoTime(item.date_out) || "still in"));

        tr.appendChild(sn)
        tr.appendChild(name)
        tr.appendChild(ID)
        tr.appendChild(d_in)
        tr.appendChild(d_out)

        tbody[0].appendChild(tr);
        count++
    })
}

function getPresentEmployees() {
    ipcRenderer.send("present", {date: new Date()});
}

getPresentEmployees();