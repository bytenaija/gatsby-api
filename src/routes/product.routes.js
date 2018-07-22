const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');

const verify = require('../jwt/verify');

router.get('/', ProductController.getAll); //return all restaurants   

router.post('/add', verify.verifyToken, ProductController.create);

router.put('/edit/:id', verify.verifyToken, ProductController.edit);

router.get('/get/:id', ProductController.show);

router.delete('/delete/:id', verify.verifyToken, ProductController.delete);

module.exports = router;