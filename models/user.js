var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  password: String,
  email: String
});

var User = mongoose.model('User', UserSchema);

module.exports = {
  User: User
};