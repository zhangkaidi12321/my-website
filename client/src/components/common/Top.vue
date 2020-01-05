<!-- Top -->
<template>
  <div class="top">
    <div class="top-h">
      <div class="top-t"></div>
      <div class="top-m"></div>
      <el-row>
        <el-col :span="16">
          <div class="home" @click="jumpHome">
            <img src="../../assets/img/logo_s.png">
            <span>KK-COMMUNITY</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="member" @click="jumpMember" v-if="!status">
            <img src="../../assets/img/no_login.png">
            <span>{{ loginDesc }}</span>
          </div>
          <el-dropdown placement="top-start" @command="menuCommand" v-else>
            <span class="el-dropdown-link">
              <img :src="userImage">
              <span>{{ loginDesc }}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personal">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
    <div class="top-bg">
      <img id="bgHeight" src="../../assets/img/top_final.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top',
  components: {},

  data () {
    return {
      loginDesc: '', status: false, userImage: ''
    }
  },

  created () {
    this.refreshUserInfo()
    this.userInfo()
  },

  mounted () {
    this.autoResize()
  },

  methods: {
    autoResize() {
      window.onresize= () => {
        this.$emit('event', document.querySelector('#bgHeight').clientHeight)
      }
    },

    jumpMember() {
      //已登录显示下拉框，未登录跳转登录页
      if (this.status) {

      } else {
        this.$router.push('/member/login')
      }
    },

    jumpHome() {
      this.$router.push('/')
    },

    refreshUserInfo() {
      this.$eventBus.$on('refreshUserInfo', () => {
        this.userInfo().then(res => {
          this.userImage = res.userImage
          this.loginDesc = res.userName
        })
      })
    },

    async userInfo() {
      if (this.$util.getLocal('userToken')) {
        try {
          const res = await this.$store.dispatch('fetchUserInfo')
          if (res.data.code === 1) {
            this.status = true
            this.loginDesc = res.data.chunk.userName
            this.userImage = res.data.chunk.userImage
            const info = {
              userName: res.data.chunk.userName,
              userImage: res.data.chunk.userImage
            }
            return info
          }
        } catch (err) {
          console.log(err)
        }
      } else {
        this.loginDesc = '登录 / 注册'
      }
    },

    menuCommand(cmd) {
      switch (cmd) {
        case 'personal': 
          this.$router.push('/member/userCenter')
          break
        case 'logout':
          this.logout()
          this.$router.go(0)
          break
      }
    },

    logout() {
      this.$util.removeLocal('userToken')
    }
  },

  computed: {}

}

</script>
<style lang='less' scoped>
@import '../../less/index';
.top { height: 100%; color: @tx-t; font-size: @fz-12;
  .top-h { height: 40px; line-height: 40px; z-index: 100; position: relative;
    .top-t {
      position: absolute; width: 100%; height: 100%; filter: blur(5px);
      background-image: url(../../assets/img/top_final.png); background-size: 100% auto
    }
    .top-m { position: absolute; width: 100%; height: 100%; background-color: rgba(255, 255, 255, .5) }
    .el-row { width: 1200px; margin: 0 auto; height: 100%; text-align: left;
      .el-col { height: 100%;
        .home { height: 100%; cursor: pointer; display: inline-block;
          &:hover { color: @red }
          img { margin: 3px }
          span { position: absolute; font-size: @fz-16; font-weight: bold; margin: 2px 0 0 5px }
        }
        .el-dropdown { height: 100%; cursor: pointer; display: inline-block; width: 50%;
          &:hover { color: @blue }
          .el-dropdown-link {
            img { width: 38px; height: 38px; margin: 1px; border-radius: 50% }
            span { position: absolute; margin: 2px 0 0 5px; font-size: @fz-12; width: 100% }
          }
        }
        .member { height: 100%; cursor: pointer; display: inline-block;
          &:hover { color: @blue }
          img { width: 38px; height: 38px; margin: 1px; border-radius: 50% }
          span { position: absolute; margin: 2px 0 0 5px }
        }
      }
    }
  }
  .top-bg {
    img { opacity: 0.6; margin-top: -40px; width: 100%; }
  }
}
</style>