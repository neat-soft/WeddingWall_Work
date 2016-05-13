var Amvs = require('./amvs.model');
var passport = require('passport');
var config = require('../../config/environment');

exports.getAmvs = function ( req, res) {
  
  Amvs.find({} , function(err,data){
    if ( err ){
      return res.send(500,err);
    }
    return res.status(200).json(data);
  });
}
// Update AMVS 
/* Updates selected Employee */
exports.updateAmvs = function(req,res){
  var updatedAmvs; 
  Amvs.find({} , function(err,amvs){
    if (err){
      return res.send(500,err);
    }  
    for (var requestProperty in req.body){
      amvs[0][requestProperty] = req.body[requestProperty];
    }
    amvs[0].save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(amvs[0]);
    });
  });
};

var createAMVS = function(data, cb) {
  var amvs = new Amvs(data);
  amvs.save(function(err, savedData){
    if ( err ) return cb(err, savedData);
    return cb(false, savedData);
  })
};

function handleError(res, err) {
  return res.status(500).send(err);
}
exports.createAMVS = createAMVS;