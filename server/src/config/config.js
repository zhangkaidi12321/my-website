const path = require('path')
// const CLIENT_URL = 'http://localhost:8080'  //本地
const CLIENT_URL = 'http://212.64.82.120'  //前端项目地址 腾讯云

const port = process.env.PORT || 8081

// 本地
const USER_IMAGE_URL = '../assets/userImage'
const MUSIC_URL = '../assets/music'

// 线上
// const USER_IMAGE_URL = '../../../assets/userImage'
// const MUSIC_URL = '../../../assets/music'

const env = param => {
  let urls = {}
  switch (param.type) {
    case 'img':
      urls.imgName = param.name + Date.now() + '.png'
      urls.realPath = path.join(__dirname, USER_IMAGE_URL, urls.imgName)
      break
    case 'music':
      urls.musicName = param.name
      urls.realPath = path.join(__dirname, MUSIC_URL, urls.musicName)
      break
    default:
      break;
  }
  return urls
}

module.exports = {
  CLIENT_URL, port, env
}