<!-- JumpBlog -->
<template>
  <div class="toBlog">
    <el-button icon="el-icon-edit" type="success" plain @click="jumpBlog">帅凯的个人博客</el-button>
  </div>
</template>

<script>
export default {
  name: 'JumpBlog',
  components: {},

  data () {
    return {
    }
  },

  created () {},

  mounted () {},

  methods: {
    jumpBlog() {
      this.$router.push('/blog/index')
    }
  },

  computed: {}

}

</script>
<style lang='less' scoped>
.toBlog { position: absolute; right: 0; top: 35px }
</style>