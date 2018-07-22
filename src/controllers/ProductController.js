const models = require("../models");
const Product = models.product;
const Restaurant = models.restaurant;
const verify = require('../jwt/verify');

exports.create = (req, res, next) => {
    const verification = verify.verify(req, res, next);
    //console.log(verification);
    if (verification) {
        Product.create(req.body).then(product => {
            if (product) {
                Product.findAll()
                    .then(products => {
                        res.json({ "success": true, message: "Product successfully created!", products });
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
        Product.update(req.body, { where: { id: req.params.id } })
            .then(product => {
                if (product) {
                    Product.findAll()
                        .then(products => {
                            res.json({ "success": true, message: "Product successfully updated!", products });
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
    Product.findOne({ where: { id: req.params.id }, include: [Restaurant] })
        .then(product => {
            if (product) {
                res.json({ "success": true, product });
            } else {
                res.json({ "success": false, message: "An error occured. Please try again later" });
            }

        })
        .catch(err => {
            res.json({ "success": false, message: "An error occured. Please try again later" });
        });
}

exports.getAll = (req, res, next) => {

    Product.findAll()
        .then(products => {
            res.json({ "success": true, products });
        })
        .catch(err => {
            res.json({ "success": false, message: "An error occured. Please try again later" });
        });


}

exports.delete = (req, res, next) => {
    const verification = verify.verify(req, res, next);
    //console.log(verification);
    if (verification) {
        Product.destroy({ where: { id: req.params.id } }).then(product => {
            if (product) {
                Product.findAll()
                    .then(products => {
                        res.json({ "success": true, message: "Product successfully deleted!", products });
                    })
            } else {
                res.json({ "success": false, message: "An error occured. Please try again later" });
            }
        })
    } else {
        res.sendStatus(403);
    }

}