'use strict';

module.exports = function (sequelize, DataTypes) {

    var Currency = sequelize.define('t_currency', {
            CurrencyID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            CurrencyCode: {
                type: DataTypes.CHAR(5),
                allowNull: false
            },
            CurrencyName: {
                type: DataTypes.STRING(200),
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
                Currency.hasOne(models.t_product_detail, {foreignKey: 'CurrencyID'});
            }
        }
    );

    return Currency;
};