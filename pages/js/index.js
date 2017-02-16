const remote = require("electron").remote
const {auth} = remote.require("./index.js")

var loginButton = document.getElementById("login")

loginButton.addEventListener("click", () => {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    auth.login(username, password)
})