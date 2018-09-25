'use strict';

module.exports = function (sequelize, DataTypes) {

    var PostTravelProduct = sequelize.define('post_travel_product', {
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
        }
    }, {
        timestamps: true,
        createdAt: 'created_date',
        updatedAt: 'updated_date',
        freezeTableName: true,
        underscored: true,
        associate: function (models) {
            PostTravelProduct.belongsTo(models.product_category);
            PostTravelProduct.belongsTo(models.product_sub_category);
            PostTravelProduct.hasMany(models.post_travel_product_document);
        }
    });

    return PostTravelProduct;
};