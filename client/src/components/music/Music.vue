<!-- Music -->
<template>
  <div>
    <div class="musicList">
      <div :class="['music', music.index === index ? 'active' : '']" v-for="(i, index) in musicList" :key="index" @click="switchMusic(i, index)">
        <i class="el-icon-video-play"></i> {{ i.title }}
      </div>
    </div>
    <div class="play">
      <Aplayer
        :music="music"
      />
    </div>
  </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
export default {
  name: 'Music',
  components: {
    Aplayer
  },

  data() {
    return {
      musicList: [], music: {}
    }
  },

  created() {
    this.fetchMusicList()
  },

  mounted() {},

  methods: {
    async fetchMusicList() {
      const type = this.$route.params.album
      const res = await this.$axios.get(`/music/fetchMusicList/${type}`)
      if (res.data.code === 1) {
        this.musicList = res.data.chunk.rows
        console.log(this.musicList)
      }
    },

    switchMusic(info, index) {
      this.music = {
        index,
        title: info.title,
        artist: info.author,
        src: info.url,
      }
    }
  },

  computed: {}
}

</script>
<style lang='less' scoped>
@import '../../less/index.less';
.musicList { text-align: left; margin-top: 10px;
  .music { padding: 5px 10px; display: inline-block; border-radius: 4px; margin: 5px; font-size: 16px;
    background: @red; color: #fff; cursor: pointer; &:hover { background: @green; box-shadow: 0 5px 5px @grey }
  }
}
</style>