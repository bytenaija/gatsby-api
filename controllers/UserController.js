const models = require("../models");
const User = models.user;
const Role = models.role;
const verify = require('../jwt/verify');

exports.register = (req, res, next) => {
    User.findAndCountAll({ where: { email: req.body.email } }).then(user => {
        var count = user["count"];
        if (count > 0) {
            res.json({ "success": false, message: "This email address already exists" })
        } else {
            var role;
            Role.create({ roleName: "Admin" }).then(r => {
                console.log("R ", r.id);
                req.body.roleId = r.id;
            });

            console.log(req.body);
            User.create(req.body)
                .then(user =>
                    res.json({ success: true, message: "You have successfully registered. Please proceed to login" })
                )
                .catch(err => {
                    res.json({ "success": false, message: "An error occured. Please try again later" });
                });
        }
    });


}


exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } }).then(user => {
        //console.log(user);
        if (user) {
            if (user.comparePassword(req.body.password)) {
                res.json({ token: user.getJWT() });
            }
        } else {
            res.json({ "success": false, message: "Login information is incorrect" })
        }

    });
}


exports.profile = (req, res, next) => {
    const verification = verify.verify(req, res, next);
    //console.log(verification);
    if (verification) {
        User.findOne({ where: { id: req.params.id }, include: [Role] }).then(user => {
            res.json(user)
        });
    } else {
        res.sendStatus(403);
    }
}