'use strict';

// Development specific configuration
// ==================================
module.exports = {
 // MongoDB connection options
  mongo: {
    uri: 'mongodb://127.0.0.1/weddingwall'
  },

  port: 3000,

  allowed_origins: [
    'http://localhost:3000'
  ],

  hostname: 'http://localhost:3000'
};
