var User = require("../models/user").User;
var Q = require("q");

var userCtrl = {};

userCtrl.connect = function(name, password) {
    var deferred = Q.defer();
    if(name && password) {
        User.findOne({'name': name}, function(err, user) {
            if(user != null) {
                if(user.password == password) {
                    deferred.resolve(user);
                }
                else {
                    deferred.reject("Invalid password");
                }
            }
            else {
                var user = new User({name: name, password: password, email: ""});
                user.save(function(err, user) {
                    if(err) {
                        console.error.bind(console, 'DB error while registering new user');
                        deferred.reject("DB error");
                    }
                    else {
                        deferred.resolve(user);
                    }
                });
            }
        });
    }
    else {
        deferred.reject("Bad parameter");
    }
    
    return deferred.promise;
};

module.exports = {
  userCtrl: userCtrl
};