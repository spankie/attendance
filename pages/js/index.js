const remote = require("electron").remote
const {auth, recreateWindow} = remote.require("./index.js")

var loginButton = document.getElementById("login")

loginButton.addEventListener("click", () => {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    if(auth.login(username, password) == "logged in" ) {
        recreateWindow();
    }
})