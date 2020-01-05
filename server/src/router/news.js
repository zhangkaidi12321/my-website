const router = require('koa-router')()
const news = require('../controllers/NewsController')

// 发表文章
router.post('/addNews', news.addNews)

// 获取文章列表
router.post('/fetchNewsList', news.fetchNewsList)

// 获取文章详情
router.get('/fetchNewsInfo/:id', news.fetchNewsInfo)

module.exports = router