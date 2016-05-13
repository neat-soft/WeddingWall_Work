var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');

exports.index = function (req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if (err) return res.send(500, err);
    res.status(200).json(users);
  });
};

exports.login = function ( req, res) {
	var sUserEmail = req.params.id;
	var sUserPwd = req.params.pwd; 
  console.log("login", "name:",sUserEmail,"pass:",sUserPwd);
	User.find({email : sUserEmail , hashedPassword : sUserPwd} , function(err,user){
		if ( err ){
			return res.send(500,err);
		}
		return res.status(200).json(user);
	});
}
var createUser = function(user, cb) {
  var newUser = new User(user);
  newUser.save(function(err, savedUser){
    if ( err ) return cb(err, savedUser);
    return cb(false, savedUser);
  })
  /*newUser.save(function(err, savedUser) {
    if (err) return cb(err, savedUser)
    createUserKey(savedUser, function(err) {
      if (err) {
        savedUser.remove();
        return cb(err, savedUser);
      }
      else {
        console.log("Create Succes");
        var userData = {
          name: savedUser.name,
          email: savedUser.email,
          hashedPassword: savedUser.hashedPassword,
          role: savedUser.role
        };
        return cb(false, savedUser);
      }
    });
  });*/

};
exports.createUser = createUser;