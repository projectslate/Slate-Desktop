/*
This file contains all the initalization code.
At the end, run callback to return to application mode
*/

const {BrowserWindow} = require('electron').remote
const currentWindow = require('electron').remote.getCurrentWindow()
const path = require('path')
const url = require('url')

function proceedToMainApplicationWindow()
{
    let applicationWindow = new BrowserWindow({minWidth: 1000, minHeight: 500, frame: false, icon: "icon.png", show: false, backgroundColor: "#062726"})
    applicationWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    applicationWindow.once("ready-to-show", () =>
    {
        currentWindow.hide()
        applicationWindow.show()
    })

    applicationWindow.on('closed', function () {
        currentWindow.close()
    })
}

var desiredSet = 0
var currentSet = 0
var finishedAnimationOffset = 1
var finishedAnimationDisabled = false
var finishInterval
var startInterval = false
function startFinishInterval()
{
    if(!startInterval)
    {
        finishInterval = window.setInterval(() => {
            ctx.fillStyle = "#55EFC4"
            ctx.fillRect(0, 3 - finishedAnimationOffset, window.innerWidth, 3 + finishedAnimationOffset)

            finishedAnimationOffset++;
        }, 30)

        startInterval = true
    }
}
function progressAnimationIntervalInit()
{
    window.setInterval(() => {
        if(desiredSet != currentSet)
        {
            currentSet = currentSet + 2

            setProgressBarProgressRaw(currentSet)

            console.log(currentSet)
        }

        if(currentSet >= window.innerWidth && !finishedAnimationDisabled)
        {
            console.log("finish animation")

            startFinishInterval()

            if(finishedAnimationOffset > 2)
            {
                finishedAnimationDisabled = true

                window.clearInterval(finishInterval)

                console.log("finish animation disabled")

                window.setTimeout(proceedToMainApplicationWindow, 2000)
            }
        }
    }, 1)
}

let progressBar
var ctx
function setProgressBarProgressRaw(width)
{
    ctx.fillStyle = "#55EFC4";
    ctx.fillRect(0, 3, width, 3); 
}
function setProgressBarProgress(percent)
{
    desiredSet = Math.round((window.innerWidth) * (percent / 100))
}
function initalizeProgressBar()
{
    progressAnimationIntervalInit();

    progressBar = document.getElementById("progress")
    progressBar.width = window.innerWidth

    ctx = progressBar.getContext("2d");
    ctx.fillStyle = "#D2DBE0";
    ctx.fillRect(0, 3, window.innerWidth, 3); 
}

window.onload = () =>
{
    initalizeProgressBar()

    window.setTimeout(() => {setProgressBarProgress(10)}, 1000)
    window.setTimeout(() => {setProgressBarProgress(60)}, 1500)
    window.setTimeout(() => {setProgressBarProgress(75)}, 2000)
    window.setTimeout(() => {setProgressBarProgress(100)}, 2500)
}