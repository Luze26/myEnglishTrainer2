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
              else if(result.term0) {
                  var entries = null;
                  if(result.term0.PrincipalTranslations) {
                      entries = result.term0.PrincipalTranslations;
                  }
                  else if(result.term0.Entries) {
                      entries = result.term0.Entries;
                  }
                  if(entries) {
                    for(var i = 0; i < Object.keys(entries).length; i++) {
                        if(entries[i].FirstTranslation) {
                          translations.push(formatTranslation(entries[i].FirstTranslation));
                          if(entries[i].SecondTranslation) {
                              translations.push(formatTranslation(entries[i].SecondTranslation));
                          }
                        }
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