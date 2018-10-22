// :)
const  {remote} = require("electron")

function windowEventHandlers()
{
    document.getElementById("minimize").addEventListener("click", () => {
        remote.BrowserWindow.getFocusedWindow().minimize()
    })

    document.getElementById("maximize").addEventListener("click", () => {
        remote.BrowserWindow.getFocusedWindow().maximize()
    })

    document.getElementById("close").addEventListener("click", () => {
        window.close()
    })
}

window.onload = () => {
    windowEventHandlers()
}