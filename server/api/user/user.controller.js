var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');

exports.index = function (req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if (err) return res.send(500, err);
    res.status(200).json(users);
  });
};
