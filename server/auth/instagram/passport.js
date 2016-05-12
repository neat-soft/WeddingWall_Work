var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;
//var userController = require('../../api/user/user.controller');
var config = require('../../config/environment');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

exports.setup = function (config) {
  console.log('setup');
  passport.use(new InstagramStrategy({
      clientID: config.instagram.client_id,
      clientSecret: config.instagram.client_secret,
      callbackURL: config.instagram.callbackURL,
      passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
      console.log('token',accessToken);
    }
  ));
};
