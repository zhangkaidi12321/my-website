const router = require('koa-router')()
const tag = require('../controllers/TagController')

// 获取所有帖子标签
router.get('/fetchAllTags', tag.fetchAllTags)

// 获取帖子列表
router.post('/fetchTopicList', tag.fetchTopicList)

// 获取帖子详情
router.get('/fetchPostDetail/:aKey', tag.fetchPostDetail)

// 发表帖子
router.post('/addPost', tag.addPost)

// 发表帖子回复
router.post('/addPostReply', tag.addPostReply)

// 获取帖子回复列表
router.post('/fetchReplyList', tag.fetchReplyList)

module.exports = router