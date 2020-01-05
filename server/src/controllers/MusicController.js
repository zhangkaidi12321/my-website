const music = require('../model/MusicModel')

module.exports = {
  async fetchMusicList(ctx) {
    try {
      const res = await music.fetchMusicList(ctx.params.type)
      ctx.body = {
        code: 1,
        chunk: res
      }
    } catch (err) {
      console.log(err)
    }
  },
}