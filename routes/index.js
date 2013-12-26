var colors = require("colors");
var Q = require("q");
var userCtrl = require("../controllers/user").userCtrl;
var lexiconCtrl = require("../controllers/lexicon").lexiconCtrl;

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

exports.newLexicon = function(req, res){
  var name = req.body.name;  
  var ownerId = req.session.user.id;
  
  console.log(("Try to create new lexicon: " + name + ", for user: " + ownerId).yellow);
  
  var promise = lexiconCtrl.newLexicon(ownerId, name);
  promise.then(function(data) {
      console.log(("Lexicon created").green);
      var lexiconApi = {id: data.id, name: data.name};
      res.send(lexiconApi);
  },
  function(error) {
      console.log(("Lexicon not created: " + error).red);
      res.status(400);
      res.send({error: error});
  });
};

exports.getLexicons = function(req, res){
  if(req.session.user) {
    var ownerId = req.session.user.id;

    console.log(("Try to get lexicons of: " + ownerId).yellow);

    var promise = lexiconCtrl.getLexicons(ownerId);
    promise.then(function(data) {
            res.send(data);
        },
        function(error) {
            console.log(("Can't get lexicons: " + error).red);
            res.status(400);
            res.send({error: error});
        });
  }
  else {
      res.status(400);
      res.send({error: "User must be connected"});
  }
};