'use strict';

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order', {
        totalPrice: {
            type: DataTypes.double,
            nullable: false
        }

    });
    Order.associate = (models) => {
        // associations can be defined here

        Order.belongsTo(models.user);
        Order.hasMany(models.orderItem, { as: 'Items' });


    };



    return Order;
};