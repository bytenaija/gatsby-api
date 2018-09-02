const models = require("../models");
const Order = models.order;
const Restaurant = models.restaurant;
const verify = require('../jwt/verify');

exports.create = (req, res, next) => {
    const verification = verify.verify(req, res, next);
    //console.log(verification);
    if (verification) {
        Order.create(req.body).then(order => {
            if (order) {

                res.json({ "success": true, message: "Order successfully created!", order });


            } else {
                res.json({ "success": false, message: "An error occured. Please try again later" });
            }
        })
    } else {
        res.sendStatus(403);
    }

}

exports.edit = (req, res, next) => {
    const verification = verify.verify(req, res, next);
    //console.log(verification);

    if (verification) {
        Order.update(req.body, { where: { id: req.params.id } })
            .then(order => {
                if (order) {

                    res.json({ "success": true, message: "Order successfully updated!", order });


                } else {
                    res.json({ "success": false, message: "An error occured. Please try again later" });
                }
            })
    } else {
        res.sendStatus(403);
    }

}

exports.show = (req, res, next) => {
    Order.findOne({ where: { id: req.params.id }, include: [Restaurant] })
        .then(order => {
            if (order) {
                res.json({ "success": true, order });
            } else {
                res.json({ "success": false, message: "An error occured. Please try again later" });
            }

        })
        .catch(err => {
            res.json({ "success": false, message: "An error occured. Please try again later" });
        });
}


exports.delete = (req, res, next) => {
    const verification = verify.verify(req, res, next);
    var deletedAt = Date.now();
    if (verification) {
        Order.update({ deletedAt: deletedAt }, { where: { id: req.params.id } }).then(order => {
            if (order) {
                Order.findAll()
                    .then(orders => {
                        res.json({ "success": true, message: "Order successfully deleted!", orders });
                    })
            } else {
                res.json({ "success": false, message: "An error occured. Please try again later" });
            }
        })
    } else {
        res.sendStatus(403);
    }

}