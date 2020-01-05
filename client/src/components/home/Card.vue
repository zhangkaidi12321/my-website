<!-- Card -->
<template>
  <div class="card">
    <div v-for="i in keyImgs" :key="i.id">
      <el-tooltip effect="light" :content="i.title" placement="top-start">
        <img :src="i.url" @click="jumpUrl(i.title)">
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  components: {},

  data () {
    return {
      keyImgs: {}
    }
  },

  created () {
    this.fetchKeyImgs()
  },

  methods: {
    async fetchKeyImgs() {
      const res = await this.$axios.get('/carousel/fetchKeyImgs/1')
      if (res.data.code == 1) this.keyImgs = res.data.chunk
    },

    jumpUrl(type) {
      this.$router.push(`/music/${type}`)
    }
  },

  computed: {}

}

</script>
<style lang='less' scoped>
.card { width: 600px; height: 226px; display: inline-block; text-align: left;
  div { height: 100px; width: 170px; padding: 0 0 20px 20px; display: inline-block;
    img { height: 100%; width: 100%; cursor: pointer; }
  }
}
</style>