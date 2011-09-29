
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

exports.getBranchData = function(username, reponame, branchname, callback) {
    var url = "repos/"+username+"/"+reponame+"/git/refs/heads/"+branchname;
    var gotResponse = function(response) {
        checkRateLimiting(response);
        var revid = response.json.object.sha;
        getCommitData(username, reponame, revid, callback);
    };
    githubRequest.GET(url, gotResponse);
}
