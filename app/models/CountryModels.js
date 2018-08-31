'use strict';

module.exports = function (sequelize, DataTypes) {

    var Country = sequelize.define('country', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        countryCode: {
            type: DataTypes.CHAR(3),
            allowNull: false,
            field: 'country_code'
        },
        countryName: {
            type: DataTypes.STRING(45),
            allowNull: false,
            field: 'country_name'
        },
        currencyCode: {
            type: DataTypes.CHAR(5),
            allowNull: false,
            field: 'currency_code'
        },
        currencyName: {
            type: DataTypes.STRING(200),
            allowNull: false,
            field: 'currency_name'
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            field: 'is_active'
        }
    }, {
        timestamps: true,
        createdAt: false,
        updatedAt: 'updated_date',
        freezeTableName: true,
    });

    return Country;
};