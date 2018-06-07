const express = require('express');
const router = express.Router();

const RestaurantController = require('../controllers/RestaurantController');

const verify = require('../jwt/verify');


router.get('/', RestaurantController.getAll); //return all restaurants   

router.post('/add', verify.verifyToken, RestaurantController.create);

router.put('/edit/:id', verify.verifyToken, RestaurantController.edit);

router.put('/get/:id', verify.verifyToken, RestaurantController.show);

router.delete('/delete/:id', verify.verifyToken, RestaurantController.delete);

module.exports = router;