const models = require("../models");
const Restaurant = models.restaurant;
const verify = require('../jwt/verify');

exports.create = (req, res, next) => {
    const verification = verify.verify(req, res, next);
    //console.log(verification);
    if (verification) {
        Restaurant.create(req.body).then(restaurant => {
            if (restaurant) {
                Restaurant.findAll()
                    .then(restaurants => {
                        res.json({ "success": true, message: "Restaurant successfully created!", restaurants });
                    })

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
        Restaurant.update(req.body, { where: { id: req.params.id } })
            .then(restaurant => {
                if (restaurant) {
                    Restaurant.findAll()
                        .then(restaurants => {
                            res.json({ "success": true, message: "Restaurant successfully updated!", restaurants });
                        })

                } else {
                    res.json({ "success": false, message: "An error occured. Please try again later" });
                }
            })
    } else {
        res.sendStatus(403);
    }

}

exports.show = (req, res, next) => {
    Restaurant.findOne({ where: { id: req.params.id }, include: [Product] })
        .then(restaurant => {
            if (restaurant) {
                res.json({ "success": true, restaurant });
            } else {
                res.json({ "success": false, message: "An error occured. Please try again later" });
            }

        })
        .catch(err => {
            res.json({ "success": false, message: "An error occured. Please try again later" });
        });
}

exports.getAll = (req, res, next) => {

    Restaurant.findAll()
        .then(restaurants => {
            res.json({ "success": true, restaurants });
        })
        .catch(err => {
            res.json({ "success": false, message: "An error occured. Please try again later" });
        });


}

exports.delete = (req, res, next) => {
    const verification = verify.verify(req, res, next);
    //console.log(verification);
    if (verification) {
        Restaurant.destroy({ where: { id: req.params.id } }).then(restaurant => {
            if (restaurant) {
                Restaurant.findAll()
                    .then(restaurants => {
                        res.json({ "success": true, message: "Restaurant successfully deleted!", restaurants });
                    })
            } else {
                res.json({ "success": false, message: "An error occured. Please try again later" });
            }
        })
    } else {
        res.sendStatus(403);
    }

}