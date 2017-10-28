'use strict';

module.exports = function (sequelize, DataTypes) {

    var Profile = sequelize.define('T_Profile', {
        ProfileID: {
            type: DataTypes.STRING(36),
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
            type: DataTypes.STRING(500),
            allowNull: true
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
            type: DataTypes.INTEGER,
            allowNull: true
        },
        DOB: {
            type: DataTypes.DATE,
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
        associate: function(models){
            Profile.hasOne(models.ProfileAccount, {foreignKey: 'ProfileID'});
        }
    }

);

    return Profile;
};