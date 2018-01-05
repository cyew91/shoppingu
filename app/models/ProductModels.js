'use strict';

module.exports = function (sequelize, DataTypes) {

    var Product = sequelize.define('t_product', {
            ProductID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            ProfileID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            TravelID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            Description: {
                type: DataTypes.STRING(500),
                allowNull: false
            },
            Amount: {
                type: DataTypes.DECIMAL(10,3),
                allowNull: false
            },
            PostType: {
                type: DataTypes.INTEGER
            },
            IsActive: {
                type: DataTypes.INTEGER
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
                Product.hasMany(models.t_product_detail, {foreignKey: 'ProductID'});
                Product.belongsTo(models.t_profile, {foreignKey: 'ProfileID'});
                Product.belongsTo(models.t_travel, {foreignKey: 'TravelID'});
            }
        }
    );

    return Product;
};