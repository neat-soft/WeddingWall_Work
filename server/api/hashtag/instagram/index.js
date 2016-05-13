
var express = require('express');
var controller = require('./instagram.controller');
var router = express.Router();
module.exports = router;
router.get('/getMediaFromHashTag/:hashtag', controller.getMediaFromHashTag);
