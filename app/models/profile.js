'use strict';

module.exports = function (sequelize, DataTypes) {

    var Profile = sequelize.define('T_Profile', {
        ProfileID: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        FirstName: DataTypes.STRING,
        LastName: DataTypes.STRING,
        FullName: DataTypes.STRING,
        Address: DataTypes.STRING,
        Gender: DataTypes.INTEGER,
        DOB: DataTypes.DATE,
        Remarks: DataTypes.STRING,
        CreatedDate: DataTypes.DATE,
        CreatedBy: DataTypes.STRING,
        LastUpdatedDate: DataTypes.DATE,
        LastUpdatedBy: DataTypes.STRING
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