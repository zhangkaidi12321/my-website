/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kCarousel', {
    id: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'url'
    },
    addTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'add_time'
    },
    modTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'mod_time'
    },
    enable: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1',
      field: 'enable'
    }
  }, {
    tableName: 'k_carousel'
  });
};
