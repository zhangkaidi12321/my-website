const db = require('../config/db')
const Carousel = db.sequelize.import('../schema/k_carousel')
const Img = db.sequelize.import('../schema/k_img')

//查询所有标签类型
const fetchCarousel = async () => {
  let res
  try {
    res = await Carousel.findAll({
      attributes: ['id', 'url'],
      where: { enable: 1 },
      order: [['sort', 'asc']]
    })
  } catch (e) {
    console.log(e)
  }
  return res
}

//首页图片
const fetchKeyImgs = async (type) => {
  let res
  try {
    res = await Img.findAll({
      attributes: ['id', 'url', 'title'],
      where: { type, enable: 1 },
      order: [['sort', 'asc']]
    })
  } catch (e) {
    console.log(e)
  }
  return res
}

module.exports = {
  fetchCarousel, fetchKeyImgs
}