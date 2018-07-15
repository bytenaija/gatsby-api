'use strict';

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.STRING,
        disountPrice: {
            type: DataTypes.STRING,
            nullable: true
        }

    });
    Product.associate = (models) => {
        // associations can be defined here
        Product.belongsTo(models.restaurant);
        Product.belongsTo(models.category);


    };



    return Product;
};