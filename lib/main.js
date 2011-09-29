const github = require("./github");
const ui = require("./ui");

var latest;

function doUpdate() {
    console.log("doing update");
    function gotResponse(data) {
        latest = data;
        var msg = "Latest Jetpack: "+data.author.name;
        ui.setStatus(msg);
    }
    github.getBranchData("mozilla", "addon-sdk", "master", gotResponse);
}

function openCommitPage() {
    // assume 'latest' is filled in
    var viewURL = "https://github.com/mozilla/addon-sdk/commit/"+latest.sha;
    ui.openPage(viewURL);
};

exports.main = function() {
    doUpdate();
    ui.everyMinute(doUpdate);
    ui.onClick(openCommitPage);
};
    


console.log("The add-on is running.");
