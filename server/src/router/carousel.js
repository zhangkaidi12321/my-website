const router = require('koa-router')()
const carousel = require('../controllers/CarouselController')

//获取轮播图
router.get('/fetchCarousel', carousel.fetchCarousel)

//轮播图右侧推荐图
router.get('/fetchKeyImgs/:type', carousel.fetchKeyImgs)

module.exports = router