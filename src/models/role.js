'use strict';

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('role', {
        name: DataTypes.STRING,
        displayName: DataTypes.STRING,
        description: DataTypes.STRING

    });
    Role.associate = (models) => {
        // associations can be defined here

    };

    return Role;
};