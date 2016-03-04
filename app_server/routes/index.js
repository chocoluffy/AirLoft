var express = require('express');
var router = express.Router();
var ctrlMissions = require('../controllers/missions');
var ctrlOthers = require('../controllers/others');

// locations controller
router.get('/', ctrlMissions.missionlist);
router.get('/mission', ctrlMissions.missioninfo);
router.get('/mission/review/new', ctrlMissions.addReview);

// others controller
router.get('/others', ctrlOthers.about);


module.exports = router;
