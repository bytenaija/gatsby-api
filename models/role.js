'use strict';

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('role', {
        roleName: DataTypes.STRING,

    });
    Role.associate = (models) => {
        // associations can be defined here

    };

    return Role;
};