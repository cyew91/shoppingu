'use strict';

module.exports = function (sequelize, DataTypes) {

    var ProductOrder = sequelize.define('product_order', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        offerPrice: {
            type: DataTypes.DECIMAL(10, 3),
            allowNull: false,
            field: 'offer_price'
        },
        orderStatus: {
            type: DataTypes.STRING(30),
            allowNull: false,
            field: 'order_status'
        }
    }, {
        timestamps: true,
        createdAt: 'created_date',
        updatedAt: 'updated_date',
        freezeTableName: true,
        underscored: true,
        associate: function (models) {
            ProductOrder.belongsTo(models.post_travel_product);
        }
    });

    return ProductOrder;
};