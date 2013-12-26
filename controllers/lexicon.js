var Lexicon = require("../models/lexicon").Lexicon;
var Word = require("../models/word").Word;
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

lexiconCtrl.addWord = function(lexiconId, word) {
    var deferred = Q.defer();
    var word = new Word({lexiconId: lexiconId, word: word.word, translations: word.translations});
    word.save(function(err, word) {
        if(err) {
            console.error.bind(console, 'DB error while registering new word');
            deferred.reject("DB error");
        }
        else {
            deferred.resolve(word);
        }
    });
    
    return deferred.promise;
};

module.exports = {
  lexiconCtrl: lexiconCtrl
};