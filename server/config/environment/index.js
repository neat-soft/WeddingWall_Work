'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: 3000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: true,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session:  process.env.SESSION_SECRET || 'weddingwall-seceret'
  },
  userRoles: ['guest', 'user', 'customer', 'admin'],
  // MongoDB connection options
   mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  twitter: {
    consumerKey:     process.env.TWITTER_CONSUMER_KEY || '0wrmRvT2Twv3QjTSkTSoRGLn7',
    consumerSecret: process.env.TWITTER_CONSUMER_SECERET || 'p8CvNIiU7IxAiEnuQ07Q3J4VIUXSShuWZ6nz8nNfdPSARkniaf',
    accessToken: process.env.TWITTER_ACCESS_TOKEN || '725996274399350785-agADEU04lcgZC9NCNVlTN8ywPqa5zYr',
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECERET || 'kXnUOEP93qs0yOR8Ealy33bX9SFH5yhmAQxmwkfexICee',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
  },

  instagram: {
    client_id: process.env.INSTAGRAM_CLIENT_ID || '65a117b4438c45efbca07ff89b57d03b',
    client_secret: process.env.INSTAGRAM_CLIENT_SECRET || '221ee733348d40d5b88c7169f21dadea'
  }
};
  

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
