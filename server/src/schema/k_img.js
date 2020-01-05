/* jshint indent: 2 */
const moment = require('moment')

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kImg', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'url'
    },
    sort: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'sort'
    },
    type: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
      field: 'type'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'title'
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
        return moment(this.getDataValue('addTime')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    enable: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1',
      field: 'enable'
    }
  }, {
    tableName: 'k_img',
    timestamps: false
  });
};
