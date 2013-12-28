var mongoose = require("mongoose");
var Lexicon = require("../models/lexicon").Lexicon;
var Word = require("../models/word").Word;
var Q = require("q");

var quizCtrl = {};

module.exports = {
  quizCtrl: quizCtrl
};