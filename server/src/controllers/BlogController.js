const blog = require('../model/BlogModel')

module.exports = {
  async fetchBlog(ctx) {
    const res = await blog.fetchBlog()
    ctx.body = {
      code: 1,
      chunk: res
    }
  },
}