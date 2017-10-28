'use strict';

module.exports = function (sequelize, DataTypes) {

    var Product = sequelize.define('T_Profile', {
            ProductID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            ProfileID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            TravelID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            Description: {
                type: DataTypes.STRING(500),
                allowNull: false
            },
            Amount: {
                type: DataTypes.DECIMAL(10,3),
                allowNull: false
            },
            IsActive: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            Remarks: {
                type: DataTypes.STRING(500),
                allowNull: true
            },
            CreatedDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            CreatedBy: {
                type: DataTypes.STRING(36),
                allowNull: false
            },
            LastUpdatedDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            LastUpdatedBy: {
                type: DataTypes.STRING(36),
                allowNull: false
            },
        }, {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,
            // disable the modification of tablenames; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: true,
        },

        {
            associate: function (models) {
                Product.hasOne(models.ProductDetail, {foreignKey: 'ProductID'});
                Product.BelongTo(models.Profile, {foreignKey: 'ProfileID'});
            }
        }

    );

    return Product;
};