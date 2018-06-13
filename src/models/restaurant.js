'use strict';

module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define('restaurant', {
        name: DataTypes.STRING,
        slug: DataTypes.STRING,
        logo: DataTypes.STRING,
        tags: DataTypes.STRING,
        published_at: DataTypes.STRING,
    });
    Restaurant.associate = (models) => {
        // associations can be defined here
        Restaurant.hasMany(models.user);
        Restaurant.hasMany(models.product);
        Restaurant.hasMany(models.branch)

    };



    return Restaurant;
};