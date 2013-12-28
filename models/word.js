var mongoose = require("mongoose");

var WordSchema = new mongoose.Schema({
  lexiconId: {
      type: String,
      index: true
  },
  word: String,
  translations: [{
          POS: String,
          sense: String,
          term: String,    
          tags: [String]
    }]
});

var Word = mongoose.model('Word', WordSchema);

module.exports = {
  Word: Word
};