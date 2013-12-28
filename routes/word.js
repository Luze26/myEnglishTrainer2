var colors = require("colors");
var lexiconCtrl = require("../controllers/lexicon").lexiconCtrl;

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