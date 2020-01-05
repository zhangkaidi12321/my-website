const db = require('../config/db')
const Music = db.sequelize.import('../schema/k_music')

// 保存音乐数据
const uploadMusic = async params => {
  db.complete(params)
  await Music.create(params)
}

// 获取音乐列表
const fetchMusicList = async (type) => {
  const res = await Music.findAndCountAll({
    where: { type, enable: 1 }
  })
  return res
}

module.exports = {
  fetchMusicList, uploadMusic
}