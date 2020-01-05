const Koa = require('koa2')
const app = new Koa()
const router = require('koa-router')()
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)
const moment = require('moment')
const config = require('./config/config')
const jwt = require('jsonwebtoken')
const koajwt = require('koa-jwt')
const path = require('path')
const static = require('koa-static')
const koaBody = require('koa-body')
// console.log(process.env.NODE_ENV)

app.use(koaBody({
  multipart: true,
  formidable: {
      maxFileSize: 20 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
}));
//设置可访问的静态资源目录
app.use(static(path.join(__dirname, './assets')))

//token验证错误或失效返回401
app.use(async (ctx, next) => {
  //如果存在token并且验证通过会将userKey当作参数传入
  if (ctx.header.authorization) {
    let token = ctx.header.authorization.split(' ')[1]
    await jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        ctx.status = 200
        ctx.body = {
          code: 401,
          msg: 'Can not find authorization(token).'
        }
      } else {
        ctx.request.body.userKey = decoded.key
        ctx.request.body.userName = decoded.name
      }
    })
    return await next().catch(err => {
      console.log(err)
    })
  } else {
    return await next().catch(err => {
      console.log(err)
      throw err
    })
  }
})

//不需要token验证的api
app.use(koajwt({
  secret: 'secret'
}).unless({
  path: [
    /^\/tag/, /^\/carousel/,
    /^\/user\/register/, /^\/user\/login/, /^\/user\/conflict/,
    /^\/config/,
    /^\/blog/,
    /^\/music/,
  ]
}))

/**
 * 路由
 */
router.use('/user', require('./router/user').routes())
      .use('/tag', require('./router/tag').routes())
      .use('/carousel', require('./router/carousel').routes())
      .use('/config', require('./router/config').routes())
      .use('/news', require('./router/news').routes())
      .use('/blog', require('./router/blog').routes())
      .use('/upload', require('./router/upload').routes())
      .use('/music', require('./router/music').routes())

app.use(router.routes()).use(router.allowedMethods())

//连接用户
let connectedUser = []
//服务端连接成功
io.on('connection', socket => {
  console.log('a user connected.')

  let curUser = ''
  //接受连接用户的昵称
  socket.on('userName', userName => {
    console.log('连接用户：' + userName)
    if (connectedUser.some(i => i === userName)) {
      connectedUser = connectedUser.filter(i => i !== userName)
    }
    curUser = userName
    connectedUser.push(curUser)
    broadUserArray(connectedUser)
  })

  //接受用户信息并广播
  socket.on('sendMsg', msgInfo => {
    msgInfo.sendDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    io.emit('receiveMsg', msgInfo)
  })

  //客户端主动断开连接
  socket.on('close', userName => {
    console.log('失去用户：' + userName)
    socket.disconnect()
  })

  //用户失去连接
  socket.on('disconnect', () => {
    console.log('a user disconnect')
    connectedUser = connectedUser.filter(i => i !== curUser)
    broadUserArray(connectedUser)
  })

  //广播最新的用户组昵称
  const broadUserArray = connectedUser => {
    io.emit('userGroup', connectedUser)
  }
})

const port = config.port
server.listen(port, () => {
  console.log(`server run success at ${port}.`)
})