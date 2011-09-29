
const github = require("github");

exports.test_github = function(test) {
    function gotResponse(data) {
        console.log("last commit was created at "+data.author.date);
        console.log("by "+data.author.name);
        console.log("message: "+data.message);
        test.pass();
        test.done();
    }
    github.getBranchData("mozilla", "addon-sdk", "master", gotResponse);
    test.waitUntilDone(20000);
}
