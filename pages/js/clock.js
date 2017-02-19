const remote = require("electron").remote
const {confirmWindow} = remote.require("./index.js")

var inButton = document.getElementById("in");
var outButton = document.getElementById("out");


inButton.addEventListener("click", () => {
    confirmWindow("in");
});

outButton.addEventListener("click", () => {
    confirmWindow("out");
});