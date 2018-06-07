'use strict';

module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define('restaurant', {
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        longitude: DataTypes.STRING,
        latitude: DataTypes.STRING,
        account_number: DataTypes.STRING,
        bank_name: DataTypes.STRING,
        account_type: DataTypes.STRING,

    });
    Restaurant.associate = (models) => {
        // associations can be defined here
        Restaurant.hasMany(models.user);
        Restaurant.hasMany(models.product);

    };



    return Restaurant;
};