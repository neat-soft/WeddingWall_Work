'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'https://localhost:3000',
  SESSION_SECRET:   'weddingwall-seceret',

  //AC_API_URL:       'https://omninox.api-us1.com',
  //AC_API_KEY:       'eab5bf86ac12deffe120d7048160f45512ce8fa819cc4c3c9330c556237234ec05b67f57',

  FACEBOOK_ID:      'app-id',
  FACEBOOK_SECRET:  'secret',

  TWITTER_CONSUMER_KEY:        '0wrmRvT2Twv3QjTSkTSoRGLn7'
  TWITTER_CONSUMER_SECERET:     'p8CvNIiU7IxAiEnuQ07Q3J4VIUXSShuWZ6nz8nNfdPSARkniaf',
  TWITTER_ACCESS_TOKEN: '725996274399350785-agADEU04lcgZC9NCNVlTN8ywPqa5zYr',
  TWITTER_ACCESS_TOKEN_SECERET: 'kXnUOEP93qs0yOR8Ealy33bX9SFH5yhmAQxmwkfexICee',

  INSTAGRAM_CLIENT_ID:        '65a117b4438c45efbca07ff89b57d03b',
  INSTAGRAM_CLIENT_SECRET:     '221ee733348d40d5b88c7169f21dadea',
  //MONGODB_URI: 'mongodb://128.227.123.79:56789/fsa'
  MONGODB_URI: 'mongodb://localhost/weddingwall-dev'
};