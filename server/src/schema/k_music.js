/* jshint indent: 2 */
const moment = require('moment')

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kMusic', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'url'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'title'
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'author'
    },
    album: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'album'
    },
    pic: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'pic'
    },
    lyric: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      field: 'lyric'
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'type'
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
      field: 'enable'
    }
  }, {
    tableName: 'k_music',
    timestamps: false
  });
};
