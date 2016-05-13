/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var logger = require('./config/logger');


// Connect to MongoDB
/*mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function (err) {
  logger.error('MongoDB connection error: ' + err);
  process.exit(-1);
});*/


// Setup server
var app = express();
var https = require('https');
var http = require('http');
var fs = require('fs');
var OAuth2 = require('oauth').OAuth2; 


require('./config/express')(app);
require('./routes')(app);
var config = require('./config/environment');

// Connect to database
if (config.env === 'production') {
  console.log('connecting to database in production');
  config.mongo.setUri(function() {
    console.log('setting the Uri successful. The uri is ' + config.mongo.uri);
    mongoose.connect(config.mongo.uri, config.mongo.options);
    return;
  })
} else {
  mongoose.connect(config.mongo.uri, config.mongo.options);
}
if(config.seedDB){
  console.log("seed");
  require('./config/seed.js');
}

var env = app.get('env');

if ('development' === env) {
  var server = http.createServer(app);
  server.listen(config.port, config.ip, function () {
    logger.info('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

// Expose app
exports = module.exports = app;
