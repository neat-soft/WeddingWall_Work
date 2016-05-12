'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', passport.authenticate('instagram', {
    scope: ['email', 'user_about_me'],
    failureRedirect: '/login',
    session: false
  }));

module.exports = router;
