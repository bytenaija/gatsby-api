const models = require("../models");
const Role = models.role;
const User = models.user;
const verify = require('../jwt/verify');

exports.addRole = (req, res, next) => {
    const verification = verify.verify(req, res, next);

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