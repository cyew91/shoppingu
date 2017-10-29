'use strict';

module.exports = function (sequelize, DataTypes) {

    var Travel = sequelize.define('T_Travel', {
            TravelID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            ProfileID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            CountryID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            TravelDescription: {
                type: DataTypes.STRING(500),
                allowNull: false
            },
            TravelStartDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            TravelEndDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            IsExpired: {
                type: DataTypes.INTEGER,
                allowNull: false
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
            associate: function (models) {
                Travel.BelongTo(models.Profile, {foreignKey: 'ProfileID'});
                Travel.BelongTo(models.Country, {foreignKey: 'CountryID'});
                Travel.HasOne(models.Product, {foreignKey: 'TravelID'});
            }
        }

    );

    return Travel;
};