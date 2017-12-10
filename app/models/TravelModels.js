'use strict';

module.exports = function (sequelize, DataTypes) {

    var Travel = sequelize.define('t_travel', {
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
                type: DataTypes.DATE
            },
            TravelEndDate: {
                type: DataTypes.DATE
            },
            IsRequest: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            IsExpired: {
                type: DataTypes.INTEGER,
                allowNull: false
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
        }, {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,
            // disable the modification of tablenames; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: true,
            associate: function (models) {
                Travel.belongsTo(models.t_product_detail, {foreignKey: 'ProfileID'});
                Travel.belongsTo(models.t_country, {foreignKey: 'CountryID'});
                Travel.hasOne(models.t_product, {foreignKey: 'TravelID'});
            }
        }
    );

    return Travel;
};