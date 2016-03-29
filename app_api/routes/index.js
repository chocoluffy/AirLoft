var express= require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
})

var ctrlMissions = require('../controllers/missions');
var ctrlReviews = require('../controllers/reviews');
var ctrlAuth = require('../controllers/authentication');

// missions
router.get('/missions', ctrlMissions.missionsListByDistance);
router.post('/missions', ctrlMissions.missionsCreate);
router.get('/missions/:missionid', ctrlMissions.missionsReadOne);
router.put('/missions/:missionid', ctrlMissions.missionsUpdateOne);
router.delete('/missions/:missionid', ctrlMissions.missionsDeleteOne);

// reviews
router.post('/missions/:missionid/reviews', auth, ctrlReviews.reviewsCreate);
router.get('/missions/:missionid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/missions/:missionid/reviews/:reviewid', auth, ctrlReviews.reviewsUpdateOne);
router.delete('/missions/:missionid/reviews/:reviewid', auth, ctrlReviews.reviewsDeleteOne);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;