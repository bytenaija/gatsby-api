'use strict';

module.exports = (sequelize, DataTypes) => {
    const Reminder = sequelize.define('reminder', {
        code: DataTypes.STRING,
        expiresAt: DataTypes.DATE,


    });
    Reminder.associate = (models) => {
        // associations can be defined here
        Reminder.belongsTo(models.user);


    };



    return Reminder;
};