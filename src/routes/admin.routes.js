const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/AdminController');

const verify = require('../jwt/verify');


/**
 * @api {post} /role/add Add new role to the database
 * @apiName AddRole
 * @apiGroup Admin
 *
 * @apiParam {String} name Role Unique Short Name.
 * @apiParam {String} displayName The display name of the role.
 * @apiParam {String} description The description of the role.
 * 
 * @apiSuccess {String} success Returns true .
 * @apiSuccess {Object} role The role that was created .
 * @apiError {Object} result "{Success = false, message = 'error message'}."
 */
router.post('/role/add', verify.verifyToken, AdminController.addRole);


/**
 * @api {post} /user/add Add new user to the database
 * @apiName AddUser
 * @apiGroup Admin
 *
 * @apiParam {String} firstname First name of User.
 * @apiParam {String} lastname Last name of User.
 * @apiParam {String} username Unique username for user.
 * @apiParam {String} email Unique email address for user.
 * 
 * @apiParam {String} password User's password
 * @apiParam {String} phonenumber User's phone number
 * @apiParam {Image} avatar User's photo/avatar
 * 
 * @apiSuccess {String} success Returns true .
 * @apiSuccess {Object} role The user that was created .
 * @apiError {Object} result "{Success = false, message = 'error message'}."
 */
router.post('/user/add', verify.verifyToken, AdminController.addUser);



/**
 * @api {post} /restaurant/publish Approve and make a restuarant public
 * @apiName PublishRestaurant
 * @apiGroup Admin
 *
 * @apiParam {String} id Id of the restuarant.
 * 
 * @apiSuccess {Object} result "{Success = true, message = 'success message'}."
 * @apiError {Object} result "{Success = false, message = 'error message'}."
 */
router.post('/restaurant/publish', verify.verifyToken, AdminController.publishRestaurant);


/**
 * @api {post} /checkout/delivery Calculate the cost of food delivery
 * @apiName CalculateDelivery
 * @apiGroup Admin
 *
 * @apiParam {Object} base The Latitude and Logitude the origin .
 * @apiParam {Array} addresses An array of objects containing logitude and latitude of the various restaurant that will fulfil the order.
 * 
 * @apiSuccess {Object} result "{ success: true, deliveryCost }."
 * 
 */
router.post('/checkout/delivery', AdminController.calculateDelivery);



module.exports = router;