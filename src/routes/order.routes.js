const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/OrderController');

const verify = require('../jwt/verify');



/**
 * @api {post} /orders/add Add new order to the database
 * @apiName AddOrder
 * @apiGroup Orders
 *
 * @apiParam {String} name Role Unique Short Name.
 * @apiParam {String} displayName The display name of the role.
 * @apiParam {String} description The description of the role.
 * 
 * @apiSuccess {String} success Returns true .
 * @apiSuccess {Object} role The role that was created .
 * @apiError {Object} result "{Success = false, message = 'error message'}."
 */
router.post('/add', verify.verifyToken, OrderController.create);

router.get('/show/:id', verify.verifyToken, OrderController.show);

router.get('/track/:id', verify.verifyToken, OrderController.track);




module.exports = router;