var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var router = express.Router();
module.exports = router;

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/login/:id/:pwd', controller.login);