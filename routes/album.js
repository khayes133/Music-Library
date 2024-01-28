const router = require('express').Router();
const albumController = require('../controllers/album');

router.get('/', albumController.getAll);
router.get('/:id', albumController.getById);

router.post('/add', albumController.addAlbum);

router.put('/update/:id', albumController.updateAlbum);

router.delete('/delete/:id', albumController.deleteAlbum);


module.exports = router;