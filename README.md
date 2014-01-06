Logus
==============

Logus is a web application to learn vocabulary in differents languages.

##Getting started

###Dependencies
* install [node](http://nodejs.org)
* install [mongoDB](http://www.mongodb.org/)
* Then install dependencies with: `npm install`

###Run

Run mongod<br/>
Then run `node app.js` and open http://localhost:3000 in your browser.

##Documentation

The server part is divided between `app.js` and the followings folders `views`, `controllers`, `models`, `routes`.<br/>
The client part is entirely written in the `public/javascripts` folder.

###Server

####App.js
`app.js` is the main file, use to launch the server and connect to the database. It also describes routes.

####Routes
Interface between web requests and the logic part.

####Controllers
The logic, where the actual work is done.

####Models
Contains models, used to describe data objects.

####Views
Views for the web application, written with Jade.

###Client
The client part is the code executed by the user's browser. Written with AngularJS.


##Resources

Useful resources for development
* [AngularJS API](http://docs.angularjs.org/api/)
* [nodeJS API](http://nodejs.org/api/)
* [Express](http://expressjs.com/api.html)
* [Jade](http://jade-lang.com/)
* [MongoDB](http://docs.mongodb.org/manual/)
* [Mongoose](http://mongoosejs.com/docs/guide.html)
* [Bootstrap](http://getbootstrap.com/)
* [Lesscss](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation)


##Contributors

* [Luze26](https://github.com/Luze26)
