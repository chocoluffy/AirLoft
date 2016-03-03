var express = require('express');
var router = express.Router();
var mainpage = require('../controllers/main');

/* GET home page. */
router.get('/', mainpage.index);

module.exports = router;
