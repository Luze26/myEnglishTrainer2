var Lexicon = require("../models/lexicon").Lexicon;
var Q = require("q");

var lexiconCtrl = {};

lexiconCtrl.newLexicon = function(ownerId, name) {
    var deferred = Q.defer();
    var lexicon = new Lexicon({ownerId: ownerId, name: name});
    lexicon.save(function(err, lexicon) {
        if(err) {
            console.error.bind(console, 'DB error while registering new lexicon');
            deferred.reject("DB error");
        }
        else {
            deferred.resolve(lexicon);
        }
    });
    
    return deferred.promise;
};

lexiconCtrl.getLexicons = function(ownerId) {
    var deferred = Q.defer();
    Lexicon.find({ownerId: ownerId}).sort('+name').exec(
            function(err, lexicons) {
                if(err) {
                    console.error.bind(console, 'DB error while getting lexicon');
                    deferred.reject("DB error");
                }
                else {
                    deferred.resolve(lexicons);
                }
            });
    return deferred.promise;        
};

module.exports = {
  lexiconCtrl: lexiconCtrl
};