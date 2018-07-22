'use strict';

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
    });
    Category.associate = (models) => {

    };



    return Category;
};