/* jshint indent: 2 */
const moment = require('moment')

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kReply', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    cId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'c_id'
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'content'
    },
    aKey: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'a_key'
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'author'
    },
    userKey: {
      type: DataTypes.STRING(16),
      allowNull: false,
      field: 'user_key'
    },
    floor: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'floor'
    },
    addTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'add_time',
      get() {
        return moment(this.getDataValue('addTime')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    modTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'mod_time',
      get() {
        return moment(this.getDataValue('modTime')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    enable: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1',
      field: 'enable'
    }
  }, {
    tableName: 'k_reply',
    timestamps: false
  });
};
