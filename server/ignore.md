const cors = require('kcors')

```
/**
 * 跨域的3种方式
 * 跨域方式1：kcors  (koa2框架写法)
 * 跨域方式2：常规写法
 * 跨域方式3：nginx  反向代理
 */

2.常规写法
app.use(cors({
  origin: config.CLIENT_URL,
  allowMethods: 'GET, POST, PUT, DELETE',
  maxAge: 600,
  credentials: true
}))
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', config.CLIENT_URL);
  ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
  ctx.set('Access-Control-Allow-Credentials', true);
  await next();
});

1.kcors写法
const cors = require('kcors')
app.use(cors({
  origin: config.CLIENT_URL,
  allowMethods: 'GET, POST, PUT, DELETE',
  maxAge: 600,
  credentials: true
}))
io.origins((origins, callback) => {
 if (origins !== config.CLIENT_URL) {
    return callback('origin not allowed.', false)
  }
  callback(null, true)
})

// koa老版本写法会引入koa-bodyparser来解析请求体
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
```