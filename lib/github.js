
const githubRequest = require("./github-request");

function checkRateLimiting(response) {
    if (Number(response.headers["X-RateLimit-Remaining"]) == 0) {
        console.log("Rate limited!");
        throw new Error("Rate limited!");
    }
}

function getCommitData(username, reponame, revid, callback) {
    var url = "repos/"+username+"/"+reponame+"/git/commits/"+revid;
    var gotResponse = function(response) {
        checkRateLimiting(response);
        callback(response.json);
    };
    githubRequest.GET(url, gotResponse);
}

exports.getReferenceData = function(username, reponame, branchname, callback) {
    var url = "repos/"+username+"/"+reponame+"/git/refs/heads/"+branchname;
    var gotResponse = function(response) {
        checkRateLimiting(response);
        var parsed = response.json;
        //console.log("JSON is "+response.text);
        //console.log("2 is "+JSON.stringify(response.json));
        var revid = parsed.object.sha;
        getCommitData(username, reponame, revid, callback);
    };
    githubRequest.GET(url, gotResponse);
}

exports.getEmails = function(requester, callback) {
    var url = "user/emails";
    requester.GET(url, function(response) { callback(response.json); });
};
