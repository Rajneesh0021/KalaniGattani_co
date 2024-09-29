const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateUser = require('../middlewares/auth.middleware');

// Register/Login
router.post('/login', userController.registerOrLogin);

// OTP Verification
router.post('/verifyOtp', userController.verifyOtp);

// Get User by ID
router.get('/', userController.getUserById);

// Create a new User
router.post('/', userController.createUser);

// Update User by ID
router.put('/',authenticateUser, userController.updateUser);

// Delete User by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
