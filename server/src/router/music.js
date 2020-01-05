const router = require('koa-router')()
const music = require('../controllers/MusicController')

// 音乐列表
router.get('/fetchMusicList/:type', music.fetchMusicList)

module.exports = router