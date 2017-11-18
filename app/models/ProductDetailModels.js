'use strict';

module.exports = function (sequelize, DataTypes) {

    var ProductDetail = sequelize.define('t_product_detail', {
        ProductDetailID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        ProductID: {
            type: DataTypes.UUID,
            allowNull: false
        },
        ProductCatID: {
            type: DataTypes.UUID,
            allowNull: false
        },
        ProductSubCatID: {
            type: DataTypes.UUID,
            allowNull: false
        },
        DetailDescription: {
            type: DataTypes.STRING(3000),
            allowNull: false
        },
        CurrencyID: {
            type: DataTypes.UUID,
            allowNull: false
        },
        Amount: {
            type: DataTypes.DECIMAL(10, 3),
            allowNull: false
        },
        Status: {
            type: DataTypes.INTEGER,
            allowNull: false
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
                ProductDetail.hasMany(models.t_product_document, { foreignKey: 'ProductDetailID' });
                ProductDetail.belongsTo(models.t_product, { foreignKey: 'ProductID' });
                ProductDetail.belongsTo(models.t_product_cat, { foreignKey: 'ProductCatID' });
                ProductDetail.belongsTo(models.t_product_subcat, { foreignKey: 'ProductSubCatID' });
                ProductDetail.belongsTo(models.t_currency, { foreignKey: 'CurrencyID' });
            }
        }
    );

    return ProductDetail;
};