'use strict';
var bcrypt = require("bcrypt");
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config')
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        password: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true
        }
    });
    User.associate = (models) => {
        // associations can be defined here
        User.belongsTo(models.role);
    };

    User.beforeSave(async(user, options) => {
        let err;
        if (user.changed('password')) {
            let salt;
            salt = await (bcrypt.genSalt(10));

            //console.log(salt);
            let hash = await (bcrypt.hash(user.password, salt));


            user.password = hash;
        }
    });

    User.prototype.comparePassword = async function(pw) {
        let err, pass
        if (!this.password) TE('password not set');

        pass = await bcrypt_p.compare(pw, this.password);


        if (!pass) TE('invalid password');

        return this;
    }

    User.prototype.getJWT = function() {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return "Bearer " + jwt.sign({ user_id: this.id }, CONFIG.jwt_encryption, { expiresIn: expiration_time });
    };

    User.prototype.toWeb = function(pw) {
        let json = this.toJSON();
        return json;
    };


    return User;
};