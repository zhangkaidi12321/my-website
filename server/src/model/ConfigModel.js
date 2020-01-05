const db = require('../config/db')
const Config = db.sequelize.import('../schema/k_config')

// 获取备案信息
const fetchConfigInfo = async type => {
  let res 
  try {
    res = await Config.findOne({
      attributes: ['contextA', 'contextB', 'contextC'],
      where: { enable: 1, type },
    })
  } catch (e) {
    console.log(e)
  }
  return res
}

module.exports = {
  fetchConfigInfo
}