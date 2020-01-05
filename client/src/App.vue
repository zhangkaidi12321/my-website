<template>
  <div id="app">
    <router-view name="blog" v-if="$route.path.indexOf('blog') !== -1" />
    <el-container v-else>
      <el-header :height="bgHeight">
        <Top @event="resize"></Top>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer height="40px">
        <Bottom></Bottom>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Top from './components/common/Top'
import Bottom from './components/common/Bottom'
export default {
  components: {
    Top, Bottom
  },

  data() {
    return {
      bgHeight: '150px'
    }
  },

  created() {
    this.resize()
  },

  methods: {
    resize(bgHeight = 150) {
      this.bgHeight = `${bgHeight}px`
    }
  }
}
</script>

<style lang="less" scoped>
@import './less/index';
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  .el-container { min-height: 100%; min-width: 1425px;
    .el-header { padding: 0; }
    .el-main { width: 1200px; margin: 0 auto; padding: 0; font-size: @fz-12 }
    .el-footer { padding: 0; margin-top: 40px }
  }
}
</style>
