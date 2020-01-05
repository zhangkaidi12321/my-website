<!-- Index -->
<template>
  <el-row>
    <el-col :span="6" class="card-l">
      <div class="round">
        <img class="avatar" src="../../assets/img/hmbb.jpeg" alt="">
        <el-card class="box-card">
          <p v-for="(i, index) in info" :key="index">
            <i :class="i.icon"></i>
            <el-link type="primary" :href="i.value" target="_blank" v-if="index === info.length - 1">{{ i.value }}</el-link>
            <span v-else>{{ i.value }}</span>
          </p>
        </el-card>
        <div class="album">
          <el-image
            v-for="(i, index) in albumList"
            :key="index"
            :src="i.url"
            :preview-src-list="[i.url]"
          >
          </el-image>
        </div>
      </div>
    </el-col>
    <el-col :span="18" class="card-r">
      <el-card></el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Index',
  components: {},

  data() {
    return {
      info: [
        { icon: 'el-icon-user', value: '帅凯kk' },
        { icon: 'el-icon-location-outline', value: '江苏 南京' },
        { icon: 'el-icon-headset', value: '游戏 电影 美剧' },
        { icon: 'el-icon-position', value: 'http://www.aprilbetter.cn' }
      ],
      albumList: []
    }
  },

  created() {
    this.fetchAlbums();
  },

  mounted() {},

  methods: {
    async fetchAlbums() {
      const res = await this.$axios.get('/carousel/fetchKeyImgs/2')
      if (res.data.code == 1) this.albumList = res.data.chunk
    }
  },

  computed: {}
}

</script>
<style lang='less' scoped>
@import '../../less/index.less';
.el-row {
  .card-l {
    .round { text-align: center;
      .avatar { border-radius: 50%; width: 190px; height: 190px; border: 5px solid @pink }
      .box-card { text-align: left; height: 130px; margin-top: 10px;
        p { padding: 0 10px;
          span { margin-left: 10px }
          .el-link { margin-left: 10px }
        }
      }
      .album {
        .el-image { height: 80px; width: 90px; margin: 10px 5px 0 }
      }
    }
  }
  .card-r { padding: 20px; margin-top: 60px }
}
</style>