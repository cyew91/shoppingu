'use strict';

module.exports = function (sequelize, DataTypes) {

    var PostRequestProduct = sequelize.define('post_request_product', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        productName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'product_name'
        },
        description: {
            type: DataTypes.STRING(500)
        },
        amount: {
            type: DataTypes.DECIMAL(10, 3)
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            field: 'is_active'
        }
    }, {
        timestamps: true,
        createdAt: 'created_date',
        updatedAt: 'updated_date',
        freezeTableName: true,
        underscored: true,
        associate: function (models) {
            PostRequestProduct.belongsTo(models.product_category);
            PostRequestProduct.belongsTo(models.product_sub_category);
            PostRequestProduct.belongsTo(models.country);
            PostRequestProduct.hasMany(models.post_request_product_document);
            PostRequestProduct.belongsTo(models.profile);
        }
    });

    return PostRequestProduct;
};