const models = require("../models");
const Role = models.role;
const User = models.user;
const Order = models.order;
const Restaurant = models.restaurant;
const verify = require('../jwt/verify');
const distance = require('./SystemController').calculateDistance;


exports.addRole = (req, res, next) => {
    const verification = verify.verify(req, res, next);
    console.log(verification);
    if (verification) {
        Role.create(req.body).then(role => {
            if (role) {
                res.json({ "success": true, message: "Role successfully created!", role });
            } else {
                res.json({ "success": false, message: "An error occured. Please try again later" });
            }
        });
    } else {
        res.sendStatus(403);
    }

}
exports.addUser = (req, res, next) => {
    const verification = verify.verify(req, res, next);

    if (verification) {
        User.create(req.body).then(user => {
            if (user) {
                res.json({ "success": true, message: "User successfully created!", user });
            } else {
                res.json({ "success": false, message: "An error occured. Please try again later" });
            }
        });
    } else {
        res.sendStatus(403);
    }
}

exports.publishRestaurant = (req, res, next) => {
    Restaurant.findOne({ where: { id: req.body.id } }).then(
        restaurant => {
            restaurant.updateAttributes({ publishAt: Date.now }).on('success', (restaurant) => {
                res.json({ "success": true, message: "Restaurant successfully published!" })
            }).error((err) => {
                res.json({ "success": false, message: "An error occured. Please try again later" });
            });
        }
    )
}

exports.calculateDelivery = (req, res, next) => {

    let totalDistance = distance(req.body.base, req.body.addresses);
    let pricePerKm = 0;

    if (totalDistance < 0) {
        res.json({ 'success': false, message: 'An error occurred. Please try again later' });
    } else if (totalDistance >= 0 && totalDistance <= 5) {
        pricePerKm = 50;
    } else if (totalDistance >= 6 && totalDistance <= 10) {
        pricePerKm = 60;
    } else {
        pricePerKm = 60;
    }
    let deliveryCost = 150 + (totalDistance * pricePerKm);
    res.json({ success: true, deliveryCost })

}

exports.getAllOrders = (req, res, next) => {

    Order.findAll()
        .then(orders => {
            res.json({ "success": true, orders });
        })
        .catch(err => {
            res.json({ "success": false, message: "An error occured. Please try again later" });
        });


}