
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var colors = require("colors");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser('akl,lklLLdsmùmloPOP^56,'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));
var mongoUrl = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost/test";

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/user/connect', routes.connect);
app.get('/user/getCurrent', routes.getCurrent);
app.post('/lexicon/new', routes.newLexicon);
app.get('/lexicon/all', routes.getLexicons);

http.createServer(app).listen(app.get('port'), function(){
  console.log(('Express server listening on port ' + app.get('port')).cyan);
  
  mongoose.connect(mongoUrl);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'DB connection error'));
});
