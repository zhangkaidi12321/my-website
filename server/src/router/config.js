const router = require('koa-router')()
const config = require('../controllers/ConfigController')

//获取轮播图
router.get('/fetchConfigInfo', config.fetchConfigInfo)

module.exports = router