'use strict';
var crypto = require('crypto');

module.exports = function (sequelize, DataTypes) {

    var ProfileAccount = sequelize.define('t_profile_account', {
        ProfileAccountID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        ProfileID: {
            type: DataTypes.UUID,
            allowNull: false
        },
        LoginID: {
            type: DataTypes.STRING(36)
        },
        SaltPass: {
            type: DataTypes.STRING(1000)
        },
        HashPass: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        RetryCount: {
            type: DataTypes.INTEGER
        },
        IsActive: {
            type: DataTypes.INTEGER
        },
        Remarks: {
            type: DataTypes.STRING(500),
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
        instanceMethods: {
            toJSON: function () {
                var values = this.get();
                delete values.HashPass;
                delete values.SaltPass;
                return values;
            },
            makeSalt: function () {
                return crypto.randomBytes(16).toString('base64');
            },
            authenticate: function (plainText) {
                return this.encryptPassword(plainText, this.SaltPass) === this.HashPass;
            },
            encryptPassword: function (password, salt) {
                if (!password || !salt) {
                    return '';
                }
                salt = new Buffer(salt, 'base64');
                return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
            }
        },
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,
        associate: function (models) {
            ProfileAccount.belongsTo(models.t_profile, {
                foreignKey: 'ProfileID'
            });
        }
    });

    return ProfileAccount;
};