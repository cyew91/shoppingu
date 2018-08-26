'use strict';

module.exports = function (sequelize, DataTypes) {

    var ProductSubCategory = sequelize.define('product_sub_category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productSubCategoryCode: {
            type: DataTypes.CHAR(3),
            allowNull: false,
            field: 'product_sub_category_code'
        },
        productSubCategoryName: {
            type: DataTypes.STRING(500),
            allowNull: false,
            field: 'product_sub_category_name'
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            field: 'is_active'
        }
    }, {
        timestamps: true,
        createdAt: false,
        updatedAt: 'updated_date',
        freezeTableName: true,
    });

    return ProductSubCategory;
};