const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware')

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authMiddleware, authController.logout);

// Me route
router.get('/me', authMiddleware, authController.me);

// User routes
router.post('/user', authMiddleware, userController.createUser);
router.get('/user', authMiddleware, userController.getUser);
router.get('/user/:id', authMiddleware, userController.getUserById);
router.put('/user/:id', authMiddleware, userController.updateUser);
router.delete('/user/:id', authMiddleware, userController.deleteUser);



module.exports = router;
