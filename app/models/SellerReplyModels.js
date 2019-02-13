'use strict';

module.exports = function (sequelize, DataTypes) {

    var SellerReply = sequelize.define('seller_reply', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        sellerId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            field: 'seller_id'
        },
        rating: {
            type: DataTypes.DECIMAL(10, 3),
            allowNull: false
        },
        reply: {
            type: DataTypes.STRING(500),
            allowNull: false
        }
    }, {
        timestamps: true,
        createdAt: 'created_date',
        updatedAt: 'updated_date',
        freezeTableName: true,
        underscored: true,
        associate: function (models) {
            SellerReply.belongsTo(models.seller_rate);
            SellerReply.belongsTo(models.profile);
        }
    });

    return SellerReply;
};
