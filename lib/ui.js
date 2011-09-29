
const widget = require("widget");
const timer = require("timer");
const tabs = require("tabs");

exports.everyMinute = function(callback) {
    timer.setInterval(callback, 60*1000);
};

var myWidget;
var clickHandler;

function clicked() {
    console.log("clickclick: "+clickHandler);
    if (clickHandler)
        clickHandler();
}

exports.setStatus = function(string) {
    if (!myWidget) {
        // first time: must create the widget
        myWidget = widget.Widget(
            {
                id: "jetpack-trunk",
                label: "Current Jetpack Trunk",
                content: "Jetpack Trunk: ...",
                width: 200,
                onClick: clicked,
                allow: {script: false}
            });
    }
    var safe = string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    myWidget.content = safe;
};

exports.onClick = function(handler) {
    clickHandler = handler;
}

exports.openPage = function(url) {
    tabs.open(url);
}
