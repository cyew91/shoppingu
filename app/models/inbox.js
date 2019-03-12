'use strict';
    
module.exports = function (sequelize, DataTypes) {

  var inbox = sequelize.define('inboxes', {
      id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
      },
      user_1: {
          type: DataTypes.STRING(30),
          allowNull: false,
          field: 'user_1'
      },
      user_2: {
        type: DataTypes.STRING(30),
        allowNull: false,
        field: 'user_2'
    }
  }, {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      freezeTableName: true,
      underscored: true,
  });

  return inbox;
};