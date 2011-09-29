
const ui = require("ui");
const timers = require("timers");

exports.test_ui = function(test) {
    ui.setStatus("status yay!");
    timers.setTimeout(function(){test.pass(); test.done();}, 3*1000);
    test.waitUntilDone();
}
