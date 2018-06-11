'use strict';

module.exports = (sequelize, DataTypes) => {
    const Branch = sequelize.define('branch', {
        name: DataTypes.STRING,
        latitude: DataTypes.STRING,
        longitude: DataTypes.STRING,
        contact_email: DataTypes.STRING,
        contact_phone: DataTypes.STRING,
        address: DataTypes.STRING,
        area_id: DataTypes.STRING,
    });
    Branch.associate = (models) => {
        // associations can be defined here
        Branch.belongsTo(models.restaurant);


    };



    return Branch;
};