const router = require('koa-router')()
const upload = require('../controllers/UploadController')

// 发表文章
router.post('/uploadMusic', upload.uploadMusic)

module.exports = router