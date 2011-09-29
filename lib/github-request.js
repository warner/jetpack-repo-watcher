
const request = require("request");

exports.GET = function(url, callback) {
    request.Request({url: "https://api.github.com/"+url,
                     onComplete: callback}).get();
}
