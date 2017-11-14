'use strict';
const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {

    var ProfileAccount = sequelize.define('T_Profile_Account', {
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
        },

        {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,
            // disable the modification of tablenames; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: true,
        },

        {
            associate: function (models) {
                ProfileAccount.BelongTo(models.Profile, {
                    foreignKey: 'ProfileID'
                });
            }
        },

        {
            instanceMethods: {
                generateHash(HashPass) {
                    return bcrypt.hash(HashPass, bcrypt.genSaltSync(8));
                },
                validPassword(HashPass) {
                    return bcrypt.compare(HashPass, this.HashPass);
                }
            }
        }

    );

    var hasSecurePassword = function (ProfileAccount, options, callback) {
        // if (ProfileAccount.HashPass != user.password_confirmation) {
        //     throw new Error("Password confirmation doesn't match Password");
        // }
        bcrypt.hash(ProfileAccount.get('HashPass'), 10, function (err, hash) {
            if (err) return callback(err);
            ProfileAccount.set('HashPass', hash);
            return callback(null, options);
        });
    };

    ProfileAccount.beforeCreate(function (ProfileAccount, options, callback) {
        ProfileAccount.LoginID = ProfileAccount.LoginID.toLowerCase();
        if (ProfileAccount.HashPass)
            hasSecurePassword(ProfileAccount, options, callback);
        else
            return callback(null, options);
    })
    ProfileAccount.beforeUpdate(function (ProfileAccount, options, callback) {
        ProfileAccount.LoginID = ProfileAccount.LoginID.toLowerCase();
        if (ProfileAccount.HashPass)
            hasSecurePassword(ProfileAccount, options, callback);
        else
            return callback(null, options);
    })

    return ProfileAccount;
};