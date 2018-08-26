const models = require("../models");
const Place = models.place;
const verify = require('../jwt/verify');

exports.create = (req, res, next) => {
    const verification = verify.verify(req, res, next);
    //console.log(verification);
    if (verification) {
        Place.create(req.body).then(place => {
            if (place) {
                Place.findAll()
                    .then(places => {
                        res.json({ "success": true, message: "Place successfully created!", places });
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
        Place.update(req.body, { where: { id: req.params.id } })
            .then(place => {
                if (place) {
                    Place.findAll()
                        .then(places => {
                            res.json({ "success": true, message: "Place successfully updated!", places });
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
    Place.findOne({ where: { id: req.params.id } })
        .then(place => {
            if (place) {
                res.json({ "success": true, place });
            } else {
                res.json({ "success": false, message: "An error occured. Please try again later" });
            }

        })
        .catch(err => {
            res.json({ "success": false, message: "An error occured. Please try again later" });
        });
}

exports.getAll = (req, res, next) => {

    Place.findAll()
        .then(places => {
            res.json({ "success": true, places });
        })
        .catch(err => {
            res.json({ "success": false, message: "An error occured. Please try again later" });
        });


}

exports.delete = (req, res, next) => {
    const verification = verify.verify(req, res, next);
    //console.log(verification);
    if (verification) {
        Place.destroy({ where: { id: req.params.id } }).then(place => {
            if (place) {
                Place.findAll()
                    .then(places => {
                        res.json({ "success": true, message: "Place successfully deleted!", places });
                    })
            } else {
                res.json({ "success": false, message: "An error occured. Please try again later" });
            }
        })
    } else {
        res.sendStatus(403);
    }

}