var colors = require("colors");
var _ = require("underscore");
var lexiconCtrl = require("../controllers/lexicon").lexiconCtrl;

exports.generate = function(req, res){
  var ownerId = req.session.user.id;
  var lexiconId = req.body.lexiconId;  
    
  var promise = lexiconCtrl.getLexicon(ownerId, lexiconId);
  promise.then(function(data) {
      var number = req.body.number;
      var tags = req.body.tags;
      var words = [];
      
      var length1 = data.words.length;
      for(var i = 0; i < length1; i++) {
          var word = data.words[i];
          var length2 = word.translations.length;
          var translations = [];
          if(tags.length > 0) {
            for(var j = 0; j < length2; j++) {
                var nb = _.intersection(tags, word.translations[j]);
                if(nb > 0) {
                    translations.push(word.translations[j]);
                }
            }
          }
          else {
              translations = word.translations;
          }

          if(translations.length > 0) {
              word.translations = translations;
              words.push(word);
          }          
      }
      words = _.sample(words, number);
      res.send(words);
  },
  function(error) {
      console.log(("Quiz not generated: " + error).red);
      res.status(400);
      res.send({error: error});
  });
};