'use strict';
var bcrypt = require("bcrypt");
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config')
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        phonenumber: DataTypes.STRING,
        avatar: DataTypes.STRING,
    });
    User.associate = (models) => {
        // associations can be defined here
        User.belongsTo(models.role);
        User.hasMany(models.order);
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
        return "Bearer " + jwt.sign({ id: this.id, role: this.roleId }, CONFIG.jwt_encryption, { expiresIn: expiration_time });
    };

    User.prototype.toWeb = function(pw) {
        let json = this.toJSON();
        return json;
    };

    User.prototype.equals = function(user) {
        return user && this.id === user.id;
    }

    return User;
};