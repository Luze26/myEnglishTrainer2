var colors = require("colors");
var userCtrl = require("../controllers/user").userCtrl;

/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { title: 'My English Trainer' });
};

exports.connect = function(req, res){
  var name = req.body.name;
  var password = req.body.password;
  
  console.log(("User try to log with name: " + name + ", and password: " + password).yellow);
  
  var promise = userCtrl.connect(name, password);
  promise.then(function(data) {
      console.log(("User logged").green);
      var userApi = {id: data.id, name: data.name};
      req.session.user = userApi;
      res.send(userApi);
  },
  function(error) {
      console.log(("User not logged: " + error).red);
      res.status(400);
      res.send({error: error});
  });
};


exports.getCurrent = function(req, res){
    if(req.session.user) {
        res.send(req.session.user);
    }
    else {
        res.send(null);
    }
};