var express = require('express');
var controller = require('./twitter.controller');
var router = express.Router();
module.exports = router;
router.get('/getMediaFromHashTag/:hashtag', controller.getMediaFromHashTag);
