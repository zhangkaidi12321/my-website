/* jshint indent: 2 */
const moment = require('moment')

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kArticle', {
    aKey: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'a_key'
    },
    title: {
      type: DataTypes.STRING(60),
      allowNull: true,
      field: 'title'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'content'
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
    type: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
      field: 'type'
    },
    like: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0',
      field: 'like'
    },
    collect: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0',
      field: 'collect'
    },
    preview: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0',
      field: 'preview'
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
    tableName: 'k_article',
    timestamps: false
  });
};
