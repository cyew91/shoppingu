'use strict';

module.exports = function (sequelize, DataTypes) {

    var ProfileAccount = sequelize.define('T_Profile_Account', {
        ProfileAccountID: {
            type: DataTypes.STRING(36),
            primaryKey: true,
            allowNull: false
        },
        ProfileID: {
            type: DataTypes.STRING(36),
            allowNull: false
        },
        LoginID: {
            type: DataTypes.STRING(36),
            allowNull: true
        },
        SaltPass: {
            type: 'VARBINARY(100)',
            allowNull: false
        },
        HashPass: {
            type: 'VARBINARY(100)',
            allowNull: false
        },
        RetryCount: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        IsActive:{
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
        associate: function(models) {
            ProfileAccount.BelongTo(models.Profile);
        }
    }

);

    return ProfileAccount;
};