const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getSingleUser);

router.post('/', validation.validateUser, userController.createUser);

router.put('/:id', validation.validateUser, userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;