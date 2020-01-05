<!-- Top -->
<template>
  <div class="top">
    <div class="th">
      <div class="header">
        <img class="wm" src="../../../assets/img/logo_w.png">
        <ul>
          <li
            v-for="(i, index) in menu"
            :key="index"
            @click="$router.push(i.url)"
            :class="$route.path === i.url ? 'active' : ''"
          >
            {{ i.title }}
          </li>
        </ul>
        <div class="back" @click="$router.push('/')">
          <i class="el-icon-cherry"></i>
          kk-community
        </div>
      </div>
    </div>
    <div class="img" v-if="$route.path === '/blog/index'"></div>
    <div class="articleImg" v-else></div>
  </div>
</template>

<script>
export default {
  name: 'Top',
  components: {},

  data() {
    return {
      menu: [{ title: '首页', url: '/blog/index' }, { title: '技术文档', url: '/blog/documents' }, { title: '生活随笔', url: '/blog/essay' }]
    }
  },

  created() {},

  mounted() {},

  methods: {},

  computed: {}
}

</script>
<style lang='less' scoped>
@import '../../../less/index.less';
.top { line-height: 37px; text-align: left; height: 100%;
  .th { box-shadow: 0 4px 8px #888888; position: fixed; background: #fff; margin-top: -40px; z-index: 1000; width: 100%;
    .header { width: 1200px; margin: 0 auto; height: 40px;
      .wm { margin: 3px }
      ul { list-style-type: none; margin: 0; padding: 0; display: inline-block;
        li { float: left; margin-left: 30px; cursor: pointer; font-weight: bold;
          &:hover { border-bottom: 3px solid @blue }
        }
        .active { border-bottom: 3px solid @blue }
      }
      .back { float: right; font-weight: bold; cursor: pointer; margin-top: 3px;
        i { font-size: 16px; font-weight: bold; }
        &:hover { color: @blue }
      }
    }
  }
  .img { background: url('../../../assets/img/color.jpg'); height: 300px;
    background-size: 100% 100%; opacity: 0.5; filter: blur(1px); margin-top: 40px }
  .articleImg { background: url('../../../assets/img/color-2.jpg'); height: 150px;
    background-size: auto 100%; background-repeat: repeat-x; opacity: 0.7; filter: blur(1px); margin-top: 40px }
}
</style>