
const auth = require("basic-auth");

exports.test_auth = function(test) {
    var username = "alice";
    var password = "yaycookies";
    test.assertEqual(auth.basic_auth_header(username, password),
                     "YWxpY2U6eWF5Y29va2llcw==");
}
