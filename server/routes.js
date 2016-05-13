/**
 * Main application routes
 */

'use strict';

var path = require('path');
var raven = require('raven');

module.exports = function (app) {

  // Insert routes below
  app.use('/api/hashtag/twitter', require('./api/hashtag/twitter'));
  app.use('/api/hashtag/instagram', require('./api/hashtag/instagram'));
  app.use('/api/user', require('./api/user'));
  app.use('/api/amvs', require('./api/amvs'));
  app.use('/auth', require('./auth'));

  // The error handler must be before any other error middleware

  // All undefined asset or api routes should return a 404

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function (req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
