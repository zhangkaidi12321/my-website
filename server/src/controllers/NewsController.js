const news = require('../model/NewsModel')

module.exports = {
  async addNews(ctx) {
    try {
      await news.addNews(ctx.request.body)
      ctx.body = {
        code: 1,
        msg: '发布成功'
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        code: 0,
        msg: '发布失败'
      }
    }
  },

  async fetchNewsList(ctx) {
    try {
      const res = await news.fetchNewsList(ctx.request.body)
      ctx.body = {
        code: 1,
        chunk: res
      }
    } catch (err) {
      console.log(err)
    }
  },

  async fetchNewsInfo(ctx) {
    const { id } =  ctx.params
    try {
      const res = await news.fetchNewsInfo(id)
      ctx.body = {
        code: 1,
        chunk: res
      }
    } catch (err) {
      console.log(err)
    }
  }
}