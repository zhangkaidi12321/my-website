const router = require('koa-router')()
const blog = require('../controllers/BlogController')

// 获取 blog md文件
router.get('/fetchBlogMd/:fileName', blog.fetchBlog)

module.exports = router