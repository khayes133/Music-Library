const express = require('express');
const router = express.Router();

const trackController = require('../controllers/track');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.get('/', trackController.getAllTracks);

router.get('/:id', trackController.getSingleTrack);

router.post('/:id', isAuthenticated, validation.validateTrack, trackController.createTrack);

router.put('/:id', isAuthenticated, validation.validateTrack, trackController.updateTrack);

router.delete('/:id', isAuthenticated, trackController.deleteTrack);

module.exports = router;
