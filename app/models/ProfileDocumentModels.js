'use strict';

module.exports = function (sequelize, DataTypes) {

    var ProfileDocument = sequelize.define('T_Profile_Document', {
            ProfileDocumentID: {
                type: DataTypes.STRING(36),
                primaryKey: true
            },
            ProfileID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            DocumentName: {
                type: DataTypes.STRING(500),
                allowNull: false
            },
            DocumentType: {
                type: DataTypes.CHAR(20),
                allowNull: false
            },
            DocumentPath: {
                type: DataTypes.STRING(500),
                allowNull: false
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
            }
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
                ProfileDocument.BelongTo(models.Profile, {foreignKey: 'ProfileID'});
            }
        }

    );

    return ProfileDocument;
};