'use strict';

module.exports = function (sequelize, DataTypes) {

    var SellerRate = sequelize.define('seller_rate', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        subject:{
            type: DataTypes.STRING(30),
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
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
            SellerRate.belongsTo(models.profile);
            SellerRate.belongsTo(models.post_travel_product);
        }
    });

    return SellerRate;
};
