var express = require('express');
var router = express.Router();
var ctrlMissions = require('../controllers/missions');
var ctrlOthers = require('../controllers/others');

// locations controller
// router.get('/', ctrlMissions.missionlist);
router.get('/', ctrlOthers.angularApp);
router.get('/mission/:missionid', ctrlMissions.missioninfo);
router.get('/mission/:missionid/review/new', ctrlMissions.addReview);
router.post('/mission/:missionid/review/new', ctrlMissions.postAddReview);

// others controller
router.get('/others', ctrlOthers.about);


module.exports = router;
