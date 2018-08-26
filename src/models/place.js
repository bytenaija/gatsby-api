'use strict';

module.exports = (sequelize, DataTypes) => {
    const Place = sequelize.define('place', {
        name: DataTypes.STRING,
        latitude: DataTypes.STRING,
        longitude: DataTypes.STRING,
    });




    return Place;
};