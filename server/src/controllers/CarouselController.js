const carousel = require('../model/CarouselModel')

module.exports = {
  async fetchCarousel(ctx) {
    const res = await carousel.fetchCarousel()
    ctx.body = {
      code: 1,
      chunk: res
    }
  },

  async fetchKeyImgs(ctx) {
    const { type } =  ctx.params
    const res = await carousel.fetchKeyImgs(type)
    ctx.body = {
      code: 1,
      chunk: res
    }
  }
}