'use strict';

module.exports = function (sequelize, DataTypes) {

    var PostTravel = sequelize.define('post_travel', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'start_date'
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'end_date'
        },
        travelStatus: {
            type: DataTypes.STRING(30),
            allowNull: false,
            field: 'travel_status'
        }
    }, {
        timestamps: true,
        createdAt: 'created_date',
        updatedAt: 'updated_date',
        freezeTableName: true,
        underscored: true,
        associate: function (models) {
            PostTravel.belongsTo(models.country);
            PostTravel.hasMany(models.post_travel_product);
        }
    });

    return PostTravel;
};