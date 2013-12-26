var mongoose = require("mongoose");

var WordSchema = new mongoose.Schema({
  lexiconId: {
      type: String,
      index: true
  },
  word: String,
  translations: [Object]
});

var Word = mongoose.model('Word', WordSchema);

module.exports = {
  Word: Word
};