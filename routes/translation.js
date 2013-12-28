var colors = require("colors");
var http = require('http');

var options = {
  host: 'api.wordreference.com',
  path: '/0.8/fe477/json/enfr/'
};

var formatTranslation = function(translation) {
    return {term: translation.term, POS: translation.POS, sense: translation.sense, tags: []};
};

exports.getTranslations = function(req, res){
  if(req.session.user) {
    if(req.body.word) {
        console.log(("Try to get translations for: " + req.body.word).yellow);
        
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
                  if(result.term0.PrincipalTranslations[0].FirstTranslation) {
                    translations.push(formatTranslation(result.term0.PrincipalTranslations[0].FirstTranslation));
                    if(result.term0.PrincipalTranslations[0].SecondTranslation) {
                        translations.push(formatTranslation(result.term0.PrincipalTranslations[0].SecondTranslation));
                    }
                  }
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