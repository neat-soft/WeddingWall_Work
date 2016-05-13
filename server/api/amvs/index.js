var express = require('express');
var controller = require('./amvs.controller');
var config = require('../../config/environment');
var router = express.Router();
module.exports = router;

router.get('/getAmvs', controller.getAmvs);
router.post('/updateAmvs', controller.updateAmvs);