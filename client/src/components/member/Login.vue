<!-- Login -->
<template>
  <el-row>
    <el-col :span="12">
      <div></div>
    </el-col>
    <el-col :span="12">
      <div class="box">
        <el-input placeholder="帐号/手机号/邮箱" v-model="userInfo.userAccount"></el-input>
        <el-input placeholder="密码" type="password" v-model="userInfo.userPassword" @keyup.enter.native="login"></el-input>
        <el-row>
          <el-col :span="11">
            <el-button type="primary" @click="login">登录</el-button>
          </el-col>
          <el-col :span="11" :push="2">
            <el-button type="danger" @click="register">注册</el-button>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Login',
  components: {},

  data () {
    return {
      userInfo: { userAccount: '', userPassword: '' }
    }
  },

  created () {},

  mounted () {},

  methods: {
    async login() {
      const res = await this.$axios.post('/user/login', this.userInfo)
      if (res.data.code === 1) {
        this.$util.saveLocal('userToken', res.data.chunk.userToken)
        this.$router.push('/')
        this.$eventBus.$emit('refreshUserInfo')
        this.$tooltip.tip(res.data.msg)
      } else {
        this.$tooltip.tip(res.data.msg, 'error')
      }
    },

    register() {
      this.$router.push('/member/register')
    }
  },

  computed: {}

}

</script>
<style lang='less' scoped>
@import '../../less/index';
.el-col { height: 500px;
  .box { height: 100%; border-left: 1px solid @br-3; margin: 20px 0; padding: 30px 0;
    .el-input { width: 70%; margin-bottom: 30px }
    .el-row { width: 70%; margin: 0 auto;
      .el-col {
        height: auto;
        .el-button { width: 100% }
      }
    }
  }
}
</style>