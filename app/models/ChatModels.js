'use strict';

module.exports = function (sequelize, DataTypes) {

    var Chat = sequelize.define('t_chat', {
        ChatID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        ProductID: {
            type: DataTypes.UUID,
            allowNull: false
        },
        ChatProfileID_Sender: {
            type: DataTypes.STRING(36),
            allowNull: false
        },
        ChatProfileID_Receiver: {
            type: DataTypes.STRING(36),
            allowNull: false
        },
        TotalMessages: {
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
                //ProductDocument.BelongTo(models.ProductDetail, {foreignKey: 'ProductDetailID'});
                Chat.hasMany(models.t_chat_detail, {foreignKey: 'ChatID'}); // Adds ProductDetailID to ProductDocument
                Chat.belongsTo(models.t_product, { foreignKey: 'ProductID' });
            }
        }
    );

    return Chat;
};