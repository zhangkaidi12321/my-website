const tag = require('../model/TagModel')
const tool = require('../util/format')

module.exports = {
  async fetchAllTags(ctx) {
    try {
      const res = await tag.fetchAllTags()
      const otherNum = res.filter(i => i.url === 'all')[0].count
      res.filter(i => i.url === 'all')[0].count = res.map(i => i.count).reduce((total, num) => total + num, 0)
      res.filter(i => i.url === 'other')[0].count = otherNum
      ctx.body = {
        code: 1,
        chunk: res
      }
    } catch (err) {
      console.log(err)
    }
  },

  async fetchTopicList(ctx) {
    try {
      const res = await tag.fetchTopicList(ctx.request.body)
      ctx.body = {
        code: 1,
        chunk: res
      }
    } catch (err) {
      console.log(err)
    }
  },

  async fetchPostDetail(ctx) {
    const { aKey } =  ctx.params
    try {
      const res = await tag.fetchPostDetail(aKey)
      ctx.body = {
        code: 1,
        chunk: res
      }
    } catch (err) {
      console.log(err)
    }
  },

  async addPost(ctx) {
    try {
      await tag.addPost(ctx.request.body)
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

  async addPostReply(ctx) {
    try {
      await tag.addPostReply(ctx.request.body)
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

  async fetchReplyList(ctx) {
    try {
      const repList = await tag.fetchReplyList(ctx.request.body)
      const ids = repList.rows.map(i => i.id)
      const childList = await tag.fetchChildReplyList(ids)
      const res = repList.rows.map(i => Object.assign({}, i, {
        children: childList.rows.filter(j => j.cId === i.id),
        childrenLength: childList.rows.filter(j => j.cId === i.id).length,
        offset: 1
      }))
      const list = tool.dateFormat(res)
      repList.rows = list
      ctx.body = {
        code: 1,
        chunk: repList
      }
    } catch (err) {
      console.log(err)
    }
  }
}