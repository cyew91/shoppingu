'use strict';

module.exports = function (sequelize, DataTypes) {

    var ProductCat = sequelize.define('t_product_cat', {
            ProductCatID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            ProductCatDesc: {
                type: DataTypes.STRING(500),
                allowNull: false
            },
            IsActive: {
                type: DataTypes.INTEGER
            },
            Remarks: {
                type: DataTypes.STRING(500)
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
            associate: function (models) {
                ProductCat.hasOne(models.t_product_detail, {foreignKey: 'ProductCatID'});
                ProductCat.hasMany(models.t_product_subcat, {foreignKey: 'ProductCatID'});
            }
        }
    );

    return ProductCat;
};