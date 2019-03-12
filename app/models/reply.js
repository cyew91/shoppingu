'use strict';
    
module.exports = function (sequelize, DataTypes) {

  var reply = sequelize.define('replies', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        Message:{
            type:DataTypes.STRING(1000), 
            allowNull:false,
            field: 'Message'
        },
        time:{
            type:DataTypes.STRING(30),  
            allowNull:false,
            field: 'time'
        },
        status:{
            type:DataTypes.STRING(30),
            allowNull:false,
            field: 'status'
        },
        date:{
            type:DataTypes.STRING(30),
            allowNull:false,
            field: 'date'
        },
        seen_time:{
            type:DataTypes.STRING(30),
            allowNull:true,
            field: 'seen_time'
        }
  }, {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      freezeTableName: true,
      underscored: true,
      associate: function (models) {
        reply.belongsTo(models.profile, {foreignKey: 'user_name', targetKeyField: 'login_id'});
        reply.belongsTo(models.inboxes, {foreignKey: 'inbox_id', });
    }
  });

  return reply;
};