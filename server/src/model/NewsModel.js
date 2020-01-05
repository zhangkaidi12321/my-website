const db = require('../config/db')
const News = db.sequelize.import('../schema/k_news.js')

// 发布文章
const addNews = async newsInfo => {
  db.complete(newsInfo)
  newsInfo.author = newsInfo.userName
  await News.create(newsInfo)
}

// 查询文章列表
const fetchNewsList = async params => {
  const res = await News.findAndCountAll({
    where: { enable: 1 },
    offset: (params.offset - 1) * params.limit,
    limit: params.limit,
    order: [['addTime', 'desc']]
  })
  return res
}

// 查询单篇帖子
const fetchNewsInfo = async id => {
  const res = await News.findOne({
    where: { id, enable: 1 }
  })
  return res
}

module.exports = {
  addNews, fetchNewsList, fetchNewsInfo
}