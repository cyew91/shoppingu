'use strict';

module.exports = function (sequelize, DataTypes) {

    var CustomerOrder = sequelize.define('t_customer_order', {
            CustomerOrderID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            ProfileID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            ProductDetailID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            Quantity: {
                type: DataTypes.INTEGER
            },
            Amount: {
                type: DataTypes.DECIMAL(10, 3)
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
        }, 
        {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,
            // disable the modification of tablenames; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: true,
            associate: function (models) {
                CustomerOrder.belongsTo(models.t_profile, { foreignKey: 'ProfileID' });
                CustomerOrder.belongsTo(models.t_product_detail, { foreignKey: 'ProductDetailID' });
                CustomerOrder.belongsTo(models.t_product_document, {foreignKey: 'ProductDetailID'});
            }
        }
    );

    return CustomerOrder;
};