const express = require('express');
const router = express.Router();

const PlaceController = require('../controllers/PlaceController');

const verify = require('../jwt/verify');

router.get('/', PlaceController.getAll); //return all restaurants   

router.post('/add', verify.verifyToken, PlaceController.create);

router.put('/edit/:id', verify.verifyToken, PlaceController.edit);

router.get('/get/:id', PlaceController.show);

router.delete('/delete/:id', verify.verifyToken, PlaceController.delete);

module.exports = router;