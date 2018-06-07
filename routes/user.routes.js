const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');


const passport = require('passport');
const verify = require('../jwt/verify');


router.post('/register', UserController.register); //create   

router.post('/login', UserController.login);

router.get('/profile/:id', verify.verifyToken, UserController.profile);

module.exports = router;