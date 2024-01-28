const { isAuthenticated } = require('../middleware/authenticate');
const router = require('express').Router();
const trackController = require('../controllers/track');

router.get('/', isAuthenticated, trackController.getAll);
router.get('/:id', isAuthenticated, trackController.getById);

router.post('/add', isAuthenticated, trackController.addTrack);

router.put('/update/:id', isAuthenticated, trackController.updateTrack);

router.delete('/delete/:id', isAuthenticated, trackController.deleteTrack);


module.exports = router;