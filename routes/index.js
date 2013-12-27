var colors = require("colors");
var Q = require("q");
var http = require('http');
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

exports.getLexicon = function(req, res){
  if(req.session.user) {
    var ownerId = req.session.user.id;
    var lexiconId = req.params.id;
    
    console.log(("Try to get lexicon " + lexiconId + " of: " + ownerId).yellow);

    if(ownerId && lexiconId) {
        var promise = lexiconCtrl.getLexicon(ownerId, lexiconId);
        promise.then(function(data) {
                res.send(data);
            },
            function(error) {
                console.log(("Can't get lexicon: " + error).red);
                res.status(400);
                res.send({error: error});
            });
    }
  }
  else {
      res.status(400);
      res.send({error: "User must be connected"});
  }
};

exports.addWord = function(req, res) {
  if(req.session.user) {
    if(req.body.lexiconId && req.body.word) {
        console.log(("Try to register word").yellow);
        var promise = lexiconCtrl.addWord(req.body.lexiconId, req.body.word);
        promise.then(function(data) {
                res.send(data);
            },
            function(error) {
                console.log(("Can't add word: " + error).red);
                res.status(400);
                res.send({error: error});
            });
    }
  }
  else {
      res.status(400);
      res.send({error: "User must be connected"});
  }
};

var options = {
  host: 'api.wordreference.com',
  path: '/0.8/fe477/json/enfr/'
};

exports.getTranslations = function(req, res){
  if(req.session.user) {
    if(req.body.word) {
        console.log(("Try to get translations for: " + req.body.word).yellow);
        var ownerId = req.session.user.id;
        
        http.request({host: options.host, path: options.path + req.body.word}, function(response) {
            var str = '';

            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (chunk) {
              str += chunk;
            });

            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {
              var result = JSON.parse(str);
              var translations = [];
              
              if(result.Error) {
                  console.log((result.Error).red);
              }
              else if(result.term0 && result.term0.PrincipalTranslations) {
                  translations.push(result.term0.PrincipalTranslations[0].FirstTranslation);
                  translations.push(result.term0.PrincipalTranslations[0].SecondTranslation);
              }
              
              res.send(translations);
            });
        }).end();    
    }
  }
  else {
      res.status(400);
      res.send({error: "User must be connected"});
  }
};