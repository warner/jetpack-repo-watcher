
const base64 = require("./base64");

exports.basic_auth_header = function(username, password) {
    return "Basic "+base64.encode(username+":"+password);
}

