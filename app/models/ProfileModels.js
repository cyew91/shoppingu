'use strict';

module.exports = function (sequelize, DataTypes) {

    var Profile = sequelize.define('t_profile', {
            ProfileID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            FirstName: {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            LastName: {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            FullName: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            Address: {
                type: DataTypes.STRING(500)
            },
            Email: {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            ContactNo: {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            Gender: {
                type: DataTypes.INTEGER
            },
            DOB: {
                type: DataTypes.DATE
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
            CountryID: {
                type: DataTypes.UUID,
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
                Profile.hasOne(models.t_profile_account, {foreignKey: 'ProfileID'});
                Profile.hasOne(models.t_profile_document, {foreignKey: 'ProfileID'});
                Profile.hasMany(models.t_product, {foreignKey: 'ProfileID'});
                Profile.hasMany(models.t_travel, {foreignKey: 'ProfileID'});
                Profile.hasMany(models.t_customer_order, {foreignKey: 'ProfileID'});
            }
        }
    );

    return Profile;
};