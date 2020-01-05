const config = require('../model/ConfigModel')

module.exports = {
  async fetchConfigInfo(ctx) {
    try {
      const { type } = ctx.query
      const res = await config.fetchConfigInfo(type)
      ctx.body = {
        code: 1,
        chunk: res
      }
    } catch (err) {
      console.log(err)
    }
  },
}