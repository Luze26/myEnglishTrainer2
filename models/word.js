var mongoose = require("mongoose");

var WordSchema = new mongoose.Schema({
  lexiconId: {
      type: String,
      index: true
  },
  word: String,
  translations: [{
          POST: String,
          sense: String,
          term: String          
    }]
});

var Word = mongoose.model('Word', WordSchema);

module.exports = {
  Word: Word
};