const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/OrderController');

const verify = require('../jwt/verify');



router.post('/add', verify.verifyToken, OrderController.create);

router.get('/show/:id', verify.verifyToken, OrderController.show);

router.get('/track/:id', verify.verifyToken, OrderController.track);




module.exports = router;