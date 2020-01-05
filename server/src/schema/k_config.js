/* jshint indent: 2 */
const moment = require('moment')

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kConfig', {
    id: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'type'
    },
    contextA: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'context_a'
    },
    contextB: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'context_b'
    },
    contextC: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'context_c'
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
      allowNull: false,
      defaultValue: '1',
      field: 'enable'
    }
  }, {
    tableName: 'k_config',
    timestamps: false
  });
};
