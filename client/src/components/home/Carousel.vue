<!-- Carousel -->
<template>
  <el-carousel :interval="4000" type="card" height="200px" class="carousel">
    <el-carousel-item v-for="(i, index) in carouselSrc" :key="index">
      <img :src="i.url">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'Carousel',
  components: {},

  data () {
    return {
      carouselSrc: {}
    }
  },

  created () {
    this.fetchCarousel()
  },

  methods: {
    async fetchCarousel() {
      const res = await this.$axios.get('/carousel/fetchCarousel')
      this.carouselSrc = res.data.chunk
    }
  },

  computed: {}

}

</script>
<style lang='less' scoped>
.carousel {
  width: 600px; display: block; float: left;
  .el-carousel__item h3 { color: #475669; font-size: 14px; opacity: 0.75; line-height: 200px; margin: 0 }
  .el-carousel__item:nth-child(2n) { background-color: #99a9bf }
  .el-carousel__item:nth-child(2n+1) { background-color: #d3dce6 }
}

</style>