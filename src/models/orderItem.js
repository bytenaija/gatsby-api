'use strict';

module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('orderItem', {
        item: DataTypes.String,
        quantity: DataTypes.Int,
        price: DataTypes.double

    });
    OrderItem.associate = (models) => {
        // associations can be defined here

        OrderItem.belongsTo(models.order);
        OrderItem.belongsTo(models.branch);
        OrderItem.belongsTo(models.product);


    };



    return OrderItem;
};