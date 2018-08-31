'use strict';

module.exports = function (sequelize, DataTypes) {

    var ProductCategory = sequelize.define('product_category', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        productCategoryCode: {
            type: DataTypes.CHAR(3),
            allowNull: false,
            field: 'product_category_code'
        },
        productCategoryName: {
            type: DataTypes.STRING(500),
            allowNull: false,
            field: 'product_category_name'
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
        underscored: true,
        associate: function (models) {
            ProductCategory.hasMany(models.product_sub_category);
        }
    });

    return ProductCategory;
};