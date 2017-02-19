const {remote, ipcRenderer} = require("electron")


var loginButton = document.getElementById("login");

loginButton.addEventListener("click", () => {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    var err = ipcRenderer.sendSync('login', {username: username, password: password})
    console.log("error: ", err);
    if (err) {
        document.getElementById("error").value = err;
    }
})
