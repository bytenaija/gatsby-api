'use strict';

module.exports = (sequelize, DataTypes) => {
    const Activation = sequelize.define('activation', {
        code: DataTypes.STRING,
        expiresAt: DataTypes.DATE,


    });
    Activation.associate = (models) => {
        // associations can be defined here
        Activation.belongsTo(models.user);


    };



    return Activation;
};