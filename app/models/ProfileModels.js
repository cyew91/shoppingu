'use strict';

var crypto = require('crypto');

module.exports = function (sequelize, DataTypes) {

    var Profile = sequelize.define('profile', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING(45),
            allowNull: false,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING(45),
            allowNull: false,
            field: 'last_name'
        },
        address: {
            type: DataTypes.STRING(500)
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        contactNo: {
            type: DataTypes.STRING(45),
            allowNull: true,
            field: 'contact_no'
        },
        gender: {
            type: DataTypes.STRING(1)
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            field: 'date_of_birth'
        },
        imageName: {
            type: DataTypes.STRING(500),
            field: 'image_name'
        },
        imagePath: {
            type: DataTypes.STRING(500),
            field: 'image_path'
        },
        loginId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            field: 'login_id'
        },
        hashPassword: {
            type: DataTypes.STRING(1000),
            allowNull: true,
            field: 'hash_password'
        },
        saltPassword: {
            type: DataTypes.STRING(1000),
            field: 'salt_password'
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            field: 'is_active',
            defaultValue: true,
        },
        facebookUserId: {
            type: DataTypes.STRING(45),
            field: 'facebook_user_id'
        }
    }, {
        timestamps: true,
        createdAt: 'created_date',
        updatedAt: 'updated_date',
        freezeTableName: true,       
        instanceMethods: {
            toJSON: function () {
                var values = this.get();
                delete values.hashPassword;
                delete values.saltPassword;
                return values;
            },
            makeSalt: function () {
                return crypto.randomBytes(16).toString('base64');
            },
            authenticate: function (plainText) {
                return this.encryptPassword(plainText, this.saltPassword) === this.hashPassword;
            },
            encryptPassword: function (password, saltPassword) {
                if (!password || !saltPassword) {
                    return '';
                }
                saltPassword = new Buffer(saltPassword, 'base64');
                return crypto.pbkdf2Sync(password, saltPassword, 10000, 64, 'sha512').toString('base64');
            }
        },
        underscored: true,
        associate: function (models) {
            Profile.belongsTo(models.country);
            Profile.hasMany(models.post_travel);
            Profile.hasMany(models.product_order);
            Profile.hasMany(models.post_request_product);
        }
    });

    return Profile;
};