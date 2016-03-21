var express= require('express');
var router = express.Router();
var ctrlMissions = require('../controllers/missions');
var ctrlReviews = require('../controllers/reviews');

// missions
router.get('/missions', ctrlMissions.missionsListByDistance);
router.post('/missions', ctrlMissions.missionsCreate);
router.get('/missions/:missionid', ctrlMissions.missionsReadOne);
router.put('/missions/:missionid', ctrlMissions.missionsUpdateOne);
router.delete('/missions/:missionid', ctrlMissions.missionsDeleteOne);

// reviews
router.post('/missions/:missionid/reviews', ctrlReviews.reviewsCreate);
router.get('/missions/:missionid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/missions/:missionid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/missions/:missionid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);


module.exports = router;