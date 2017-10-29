'use strict';

module.exports = function (sequelize, DataTypes) {

    var Country = sequelize.define('T_Country', {
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
                Country.HasOne(models.Travel, {foreignKey: 'CountryID'});
            }
        }

    );

    return Country;
};