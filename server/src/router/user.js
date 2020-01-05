const router = require('koa-router')()
const user = require('../controllers/UserController')

//查询用户信息
router.get('/fetchUserInfo', user.fetchUserInfo)

//登录
router.post('/login', user.login)

//注册
router.post('/register', user.register)

//账号/手机号/邮箱冲突
router.post('/conflict', user.accountConflict)

//修改用户信息
router.post('/update', user.update)

module.exports = router