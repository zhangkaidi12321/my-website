<!-- Blog -->
<template>
  <el-container>
    <el-header>
      <Top />
    </el-header>
    <el-main :class="$route.path === '/blog/index' ? 'topMove' : ''">
      <router-view />
    </el-main>
    <el-footer height="40px">
      <Bottom />
    </el-footer>
  </el-container>
</template>

<script>
import Top from '../components/blog/common/Top'
import Bottom from '../components/common/Bottom'
export default {
  name: 'Blog',
  components: {
    Top, Bottom
  },

  data () {
    return {
    }
  },

  created () {},

  mounted () {},

  methods: {

  },

  computed: {}

}

</script>
<style lang='less' scoped>
@import '../less/index';
.el-container { min-height: 100%; min-width: 1425px;
  .el-header { padding: 0; width: 100%; height: 100% !important; }
  .topMove { margin-top: -130px !important }
  .el-main { width: 1200px; margin: 0 auto; padding: 0; font-size: @fz-12; text-align: left }
  .el-footer { padding: 0;}
}
</style>