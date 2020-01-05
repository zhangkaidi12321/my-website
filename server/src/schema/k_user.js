/* jshint indent: 2 */
const moment = require('moment')

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kUser', {
    userKey: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true,
      field: 'user_key'
    },
    userName: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'user_name'
    },
    userAccount: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'user_account'
    },
    userPassword: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'user_password'
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
    mobile: {
      type: DataTypes.STRING(11),
      allowNull: true,
      field: 'mobile'
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: true,
      field: 'email'
    },
    loginCount: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0',
      field: 'login_count'
    },
    lastLoginTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_login_time',
      get() {
        return moment(this.getDataValue('lastLoginTime')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    userImage: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'user_image'
    },
    level: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: 2,
      field: 'level'
    },
    enable: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1',
      field: 'enable'
    }
  }, {
    tableName: 'k_user',
    timestamps: false
  });
};
