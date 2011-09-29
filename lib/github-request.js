
const request = require("request");

exports.GET = function(url, callback) {
    request.Request({url: "https://api.github.com/"+url,
                     onComplete: callback}).get();
}

const auth = require("basic-auth");

exports.authorizedRequester = function(username, password) {
    return {
        GET: function(url, callback) {
            var header = auth.basic_auth_header(username, password);
            request.Request({url: "https://api.github.com/"+url,
                             headers: {Authorization: header},
                             onComplete: callback}
                           ).get();
        }
    };
};
