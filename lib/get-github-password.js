const passwords = require("passwords");

exports.getGithubPassword = function(callback) {
    passwords.search({url: "https://github.com",
                      onComplete: function(credentials) {
                          if (credentials.length == 0)
                              callback(undefined);
                          else
                              callback(credentials[0]);
                      }
                     });
}

// cred.username, cred.password
