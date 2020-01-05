<!-- News -->
<template>
  <div class="news">
    <p class="title">{{ newsInfo.title }}</p>
    <p class="author">作者：{{ newsInfo.author }}&nbsp;&nbsp;&nbsp;&nbsp;{{ newsInfo.addTime }}</p>
    <div class="content" v-html="newsInfo.content"></div>
  </div>
</template>

<script>
export default {
  name: 'News',
  components: {},

  data() {
    return {
      newsInfo: {}
    }
  },

  created() {
    this.fetchNewsInfo()
  },

  mounted() {},

  methods: {
    async fetchNewsInfo() {
      const id = this.$route.params.key
      const res = await this.$axios.get(`/news/fetchNewsInfo/${id}`)
      if (res.data.code === 1) {
        this.newsInfo = res.data.chunk
      }
    }
  },

  computed: {}
}
</script>

<style lang='less' scoped>
@import '../../less/index';
.news { border: 2px dashed #E09EFF; background: #FCF4FF; min-height: 500px; margin: 0 100px; padding: 0 50px;
  .title { font-size: @fz-24; margin: 5px 0; font-weight: bold }
  .author { font-size: @fz-14; margin: 5px 0 }
  .content { text-align: left }
}
</style>