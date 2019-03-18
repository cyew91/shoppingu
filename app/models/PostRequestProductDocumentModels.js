'use strict';

module.exports = function (sequelize, DataTypes) {

    var PostRequestProductDocument = sequelize.define('post_request_product_document', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        imageName: {
            type: DataTypes.STRING(500),
            allowNull: false,
            field: 'image_name'
        },
        imagePath: {
            type: DataTypes.STRING(500),
            allowNull: false,
            field: 'image_path'
        }
    }, {
        timestamps: true,
        createdAt: 'created_date',
        updatedAt: 'updated_date',
        freezeTableName: true,
    });

    return PostRequestProductDocument;
};