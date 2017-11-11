'use strict';

module.exports = function (sequelize, DataTypes) {

    var ProductDocument = sequelize.define('T_Product_Document', {
            ProductDocumentID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            ProductDetailID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            DocumentName: {
                type: DataTypes.STRING(500),
                allowNull: false
            },
            DocumentType: {
                type: DataTypes.CHAR(30),
                allowNull: false
            },
            DocumentPath: {
                type: DataTypes.STRING(500),
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
        },

        {
            associate: function (models) {
                ProductDocument.BelongTo(models.ProductDetail, {foreignKey: 'ProductDetailID'});
            }
        }

    );

    return ProductDocument;
};