'use strict';

module.exports = function (sequelize, DataTypes) {

    var Profile = sequelize.define('T_Profile', {
        ProfileID: {
            type: DataTypes.STRING(36),
            primaryKey: true
        },
        FirstName: DataTypes.STRING(45),
        LastName: DataTypes.STRING(45),
        FullName: DataTypes.STRING(100),
        Address: DataTypes.STRING(500),
        Gender: DataTypes.INTEGER,
        DOB: DataTypes.DATE,
        Remarks: DataTypes.STRING(500),
        CreatedDate: DataTypes.DATE,
        CreatedBy: DataTypes.STRING(36),
        LastUpdatedDate: DataTypes.DATE,
        LastUpdatedBy: DataTypes.STRING(36)
    }, {
         // don't add the timestamp attributes (updatedAt, createdAt)
         timestamps: false,
         // disable the modification of tablenames; By default, sequelize will automatically
         // transform all passed model names (first parameter of define) into plural.
         // if you don't want that, set the following
         freezeTableName: true,
    });

    return Profile;
};