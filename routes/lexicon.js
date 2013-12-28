var colors = require("colors");
var lexiconCtrl = require("../controllers/lexicon").lexiconCtrl;

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