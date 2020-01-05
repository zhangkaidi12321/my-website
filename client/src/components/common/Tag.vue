<!-- Tag -->
<template>
  <div class="tag">
    <ul>
      <li v-for="i in tags" :key="i.id">
        <div @click="toTopic(i.url)" :class="i.active">
          <el-tag type="danger" size="mini">{{ i.count }}</el-tag>
          <span>{{ i.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  components: {},

  data () {
    return {
      tags: {}
    }
  },

  created () {
    this.fetchAllTags()
  },

  methods: {
    async fetchAllTags() {
      const res = await this.$axios.get('/tag/fetchAllTags')
      res.data.chunk.forEach(i => {
        i.active = ''
      })
      if (res.data.code == 1) this.tags = res.data.chunk
      if (this.$route.params.type) {
        this.tags.map(i => {
          i.url === this.$route.params.type? i.active = 'active' : i.active = ''
        })
      }
    },

    async toTopic(type) {
      this.$router.push(`/topic/${type}`)
      this.tags.forEach((i, index) => {
        if (i.url === type) {
          this.$set(i ,'active', 'active')
        } else {
          this.$set(i, 'active', '')
        }
      })
    }
  }
}

</script>
<style lang='less' scoped>
@import '../../less/index';
.tag { padding: 30px 0; font-size: @fz-12;
  ul { margin: 0; padding: 0; height: 36px; width: 80%;
    li { float: left; height: 100%; margin-right: 20px;
      div {
        span { display: block; margin-top: 3px}
        span:nth-child(2):hover { cursor: pointer; color: @red; border-bottom: 1px solid @red }
      }
      div.active { color: @red; border-bottom: 1px solid @red; padding: 0 5px 2px }
    }
  }
}
</style>