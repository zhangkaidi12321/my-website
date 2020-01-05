/* jshint indent: 2 */
const moment = require('moment')

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kTag', {
    id: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'name'
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'url'
    },
    sort: {
      type: DataTypes.INTEGER(3),
      allowNull: true,
      field: 'sort'
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
      type: DataTypes.INTEGER(255),
      allowNull: true,
      defaultValue: '1',
      field: 'enable'
    }
  }, {
    tableName: 'k_tag', 
    timestamps: false
  });
};
