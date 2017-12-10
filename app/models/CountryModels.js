'use strict';

module.exports = function (sequelize, DataTypes) {

    var Country = sequelize.define('t_country', {
            CountryID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            CountryCode: {
                type: DataTypes.CHAR(3),
                allowNull: false
            },
            CountryName: {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            Status: {
                type: DataTypes.INTEGER,
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
            associate: function (models) {
                Country.hasOne(models.t_travel, {foreignKey: 'CountryID'});
            }
        }
    );

    return Country;
};