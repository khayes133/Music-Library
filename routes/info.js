const express = require('express');
const router = express.Router();

const infoController = require('../controllers/info');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.get('/', infoController.getAll);

router.get('/:id', infoController.getSingle);

router.post('/:id', isAuthenticated, validation.saveUserInfo, infoController.createUserInfo);

router.put('/:id', isAuthenticated, validation.saveUserInfo, infoController.updateUserInfo);

router.delete('/:id', isAuthenticated, infoController.deleteUserInfo);

module.exports = router;