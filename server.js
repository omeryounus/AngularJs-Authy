var http = require('http');
var path = require('path');
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var urlencoded = require('body-parser').urlencoded;
var config = require('./api/config');

// initialize MongoDB connection
mongoose.connect(config.mongoUrl);

// Create Express web public with some useful middleware
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencoded({ extended: true }));
//app.use(morgan('combined'));

// Create REST API
require('./api')(app);

// Create HTTP server and mount Express public
var server = http.createServer(app);
server.listen(config.port, function() {
    console.log('Express server started on *:'+config.port);
});