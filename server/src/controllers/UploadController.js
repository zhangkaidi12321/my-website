const upload = require('../model/MusicModel')
const jsmediatags = require('jsmediatags')
const config = require('../config/config')
const fs = require('fs')
const music = require('../model/MusicModel')

module.exports = {
  async uploadMusic(ctx) {
    try {
      const mp3 = ctx.request.files
      const path = config.env({
        type: 'music', name: mp3.file.name
      })
      // // 创建可读流
      // const reader = fs.createReadStream(mp3.file.path);
      // // 创建可写流
      // const upStream = fs.createWriteStream(path.realPath);
      // reader.pipe(upStream);
      // console.log('音乐上传成功')
      let serverPath = ''
      if (process.env.NODE_ENV === 'development') {
        serverPath = ctx.request.header.origin + '/music/' + path.musicName
      } else if (process.env.NODE_ENV === 'production') {
        serverPath = ctx.request.header.origin + ':8082/music/' + path.musicName
      }
      new jsmediatags.Reader(mp3.file.path)
        .read({
          onSuccess: tag => {
            const { title, artist, album, lyrics } = tag.tags
            music.uploadMusic({
              url: serverPath,
              title,
              author: artist,
              album,
              lyric: lyrics,
              type: artist
            })
          },
          onError: error => {
            console.log(':(', error.type, error.info);
          }
        })
      ctx.body = {
        code: 1,
        msg: '上传成功'
      }
    } catch (err) {
      console.log(err)
      console.log('音乐上传失败')
      ctx.body = {
        code: 0,
        msg: '上传失败'
      }
    }
  },
}