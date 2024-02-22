const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getSingleUser);

router.post('/', isAuthenticated, validation.validateUser, userController.createUser);

router.put('/:id', isAuthenticated, validation.validateUser, userController.updateUser);

router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;