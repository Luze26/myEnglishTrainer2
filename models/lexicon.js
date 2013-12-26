var mongoose = require("mongoose");

var LexiconSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    index: true
  },
  name: String,
});

var Lexicon = mongoose.model('Lexicon', LexiconSchema);

module.exports = {
  Lexicon: Lexicon
};