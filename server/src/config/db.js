const Sequelize = require('sequelize')
const config = process.env.NODE_ENV === 'development' ? require('./db-local.json') : require('./db-online.json');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  pool: {
    max: config.max,
    min: config.min,
    idle: config.idle
  },
  timezone: '+08:00',  //东八时区
  logging: false,  //控制台禁止打印sql语句
  operatorsAliases: true  //是否使用别名
})

//sequelize-auto -o "./src/schema" -d local -h 212.64.82.120 -u root -p 3306 -x 83344258 -e mysql -C true -t k_reply
//sequelize-auto -o "./src/schema" -d community -h 212.64.82.120 -u root -p 3306 -x 83344258 -e mysql -C true -t k_tag

//完善
const complete = (obj) => {
  obj.addTime = new Date()
  obj.modTime = new Date()
  obj.enable = 1
}

module.exports = {
  sequelize, complete
}