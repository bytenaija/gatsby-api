const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/AdminController');

const verify = require('../jwt/verify');



router.post('/role/add', verify.verifyToken, AdminController.addRole);

router.post('/user/add', verify.verifyToken, AdminController.addUser);



module.exports = router;