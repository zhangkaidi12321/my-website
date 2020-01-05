const user = require('../model/UserModel')
const tool = require('../util/tool')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const config = require('../config/config')

module.exports = {
  async fetchUserInfo(ctx) {
    const id = ctx.request.body.userKey
    const res = await user.fetchUserInfo(id)
    ctx.body = {
      code: 1,
      chunk: res
    }
  },

  async login(ctx) {
    const { userAccount, userPassword } = ctx.request.body
    const res = await user.login(userAccount)
    if (!tool.isNullOrEmpty(res)) {
      if (res.userPassword === userPassword) {
        await user.loginCount(res.userKey)
        const token = jwt.sign({
          name: res.userName,
          key: res.userKey
        }, 'secret', {
          expiresIn: '3d'  //一周好了
        })
        ctx.body = {
          code: 1,
          msg: '登录成功',
          chunk: { userToken: token }
        }
      } else {
        ctx.body = {
          code: 0,
          msg: '密码错误'
        }
      }
    } else {
      ctx.body = {
        code: 0,
        msg: '帐号不存在'
      }
    }
  },

  async register(ctx) {
    try {
      const res = await user.register(ctx.request.body, ctx.request.header.origin)
      const token = jwt.sign({
        name: res.userName,
        key: res.userKey
      }, 'secret', {
        expiresIn: '3d'  //一周好了
      })
      ctx.body = {
        code: 1,
        msg: '注册成功',
        chunk: { userToken: token }
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        code: 0,
        msg: '注册失败'
      }
    }
  },

  async accountConflict(ctx) {
    const { type, val } = ctx.request.body
    try {
      const res = await user.accountConflict(type, val)
      ctx.body = {
        code: 1,
        chunk: {
          count: res
        }
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        code: 0,
        msg: '信息对比失败'
      }
    }
  },

  async update(ctx) {
    const { userImage, userName } = ctx.request.body
    let serverPath = ''
    //没有选择新的图片
    if (userImage.indexOf('http') !== -1) {
      serverPath = userImage
    } else {
      let base64 = userImage.replace(/^data:image\/\w+;base64,/, '')
      let buffer = Buffer.from(base64, 'base64')
      // console.log(Buffer.isBuffer(buffer))
      const path = config.env({
        type: 'img', name: userName
      })
      // console.log(path)
      fs.writeFile(path.realPath, buffer, err => {
        if (err) {
          console.log(err, '文件上传失败')
        } else {
          console.log('头像保存成功')
          if (process.env.NODE_ENV === 'development') {
            serverPath = ctx.request.header.origin + '/userImage/' + path.imgName
          } else if (process.env.NODE_ENV === 'production') {
            serverPath = ctx.request.header.origin + ':8082/userImage/' + path.imgName
          }
        }
      })
    }
    await require('../util/tool').sleep(500)
    try {
      await user.update(ctx.request.body, serverPath)
      ctx.body = {
        code: 1,
        msg: '信息修改成功'
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        code: 0,
        msg: '信息修改失败'
      }
    }
  }
}