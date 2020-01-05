const db = require('../config/db')
const Article = db.sequelize.import('../schema/k_article.js')
const User = db.sequelize.import('../schema/k_user.js')
const Reply = db.sequelize.import('../schema/k_reply.js')

// Article和User表关联
Article.belongsTo(User, {
  foreignKey: 'userKey', targetKey: 'userKey'
})

Reply.belongsTo(User, {
  foreignKey: 'userKey', targetKey: 'userKey'
})

// 查询所有标签类型
const fetchAllTags = async () => {
  // const res = await Tag.findAll({
  //   attributes: ['id', 'name', 'url'],
  //   where: { enable: 1 }, order: [['sort', 'asc']]
  // })
  const res = await db.sequelize.query(
    `SELECT
    t.name AS name,
    t.url AS url,
    (SELECT COUNT(1) FROM k_article a WHERE t.type = a.type and a.enable = 1) AS count
    FROM k_tag t
    WHERE t.enable = 1
    ORDER BY t.sort asc`,
    { type: db.sequelize.QueryTypes.SELECT }
  )
  return res
}

// 查询所有帖子
const fetchTopicList = async params => {
  let condition = {}
  switch (params.type) {
    case 99:
      condition = {
        enable: 1
      }
      break
    case 98:
      condition = {
        type: 99,
        enable: 1
      }
      break
    default:
      condition = {
        type: params.type,
        enable: 1
      }
      break
  }
  const res = await Article.findAndCountAll({
    include: [{
      attributes: ['userName'],
      model: User
    }],
    where: condition,
    offset: (params.offset - 1) * params.limit,
    limit: params.limit,
    order: [['modTime', 'desc']]
  })
  return res
}

// 查询单篇帖子
const fetchPostDetail = async aKey => {
  const res = await Article.findOne({
    include: [{
      attributes: ['userName', 'userImage'],
      model: User
    }],
    where: { aKey, enable: 1 }
  })
  return res
}

// 发布帖子
const addPost = async postInfo => {
  db.complete(postInfo)
  postInfo.like = 0
  postInfo.collect = 0
  postInfo.preview = 0
  postInfo.author = postInfo.userName
  await Article.create(postInfo)
}

// 发表帖子回复
const addPostReply = async replyInfo => {
  db.complete(replyInfo)
  replyInfo.author = replyInfo.userName
  await Reply.create(replyInfo)
}

// 获取帖子回复列表
const fetchReplyList = async params => {
  const res = await Reply.findAndCountAll({
    attributes: [[db.sequelize.col('kUser.user_image'), 'userImage'], 'id', 'cId', 'content', 'author', 'addTime', 'floor'],
    include: [{
      attributes: [],
      model: User
    }],
    where: { aKey: params.aKey, cId: { $eq: 0 }, enable: 1 },
    offset: (params.offset - 1) * params.limit,
    limit: params.limit,
    order: [['addTime', 'asc']],
    raw: true
  })
  return res
}

// 获取当前页帖子的子回复
const fetchChildReplyList = async ids => {
  const res = await Reply.findAndCountAll({
    attributes: [[db.sequelize.col('kUser.user_image'), 'userImage'], 'id', 'cId', 'content', 'author', 'addTime'],
    include: [{
      attributes: [],
      model: User
    }],
    where: { cId: { $in: ids }, enable: 1 },
    raw: true
  })
  return res
}

module.exports = {
  fetchAllTags, fetchTopicList, fetchPostDetail, addPost, addPostReply, fetchReplyList, fetchChildReplyList
}