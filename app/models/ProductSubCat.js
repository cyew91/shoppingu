'use strict';

module.exports = function (sequelize, DataTypes) {

    var ProductSubCat = sequelize.define('T_Profile', {
            ProductSubCatID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            ProductCatID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            ProductSubCatDesc: {
                type: DataTypes.STRING(500),
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
                ProductSubCat.hasOne(models.ProductDetail, {foreignKey: 'ProductSubCatID'});
                ProductSubCat.BelongTo(models.ProductCat, {foreignKey: 'ProductCatID'});
            }
        }

    );

    return ProductSubCat;
};