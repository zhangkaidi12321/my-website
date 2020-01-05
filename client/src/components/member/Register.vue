<!-- Register -->
<template>
  <el-row id="register">
    <el-col :span="24">
      <div class="regBox">
        <h1>注册</h1>
        <el-form class="form" :model="userInfo" :rules="rule" ref="userInfo" status-icon>
          <el-form-item prop="userAccount" label=" ">
            <el-input placeholder="帐号" v-model="userInfo.userAccount"></el-input>
          </el-form-item>
          <el-form-item prop="userName" label=" ">
            <el-input placeholder="昵称" v-model="userInfo.userName" maxlength="15"></el-input>
          </el-form-item>
          <el-form-item prop="userPassword" label=" ">
            <el-input type="password" placeholder="密码" v-model="userInfo.userPassword"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword" label=" ">
            <el-input type="password" placeholder="确认密码" v-model="userInfo.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item prop="mobile">
            <el-input placeholder="手机号" v-model="userInfo.mobile" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input placeholder="邮箱" v-model="userInfo.email"></el-input>
          </el-form-item>
          <p>* 为必填项，注册成功后可用 账号 或 手机号 或 邮箱 登录</p>
          <el-button type="primary" @click="register('userInfo')">注册</el-button>
          <span @click="jumpLogin">已有账号，直接登录></span>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mobileReg, emailReg } from '../../util/regex'
export default {
  name: 'Register',
  components: {},

  data () {
    return {
      userInfo: {
        userAccount: '', userName: '', userPassword: '', confirmPassword: '', mobile: '', email: ''
      },
      rule: {
        userAccount: [
          { required: true, message: '请填写帐号', trigger: 'blur' },
          { min: 6, max: 18, message: '帐号长度为6-18' },
          { validator: (rule, val, callback) => {
            this.conflict(1, this.userInfo.userAccount).then(count => {
              count > 0? callback(new Error('帐号名已重复，请重新填写')) : callback()
            })
          }, trigger: 'blur'}
        ],
        userName: [{ required: true, message: '请填写昵称', trigger: 'blur' }],
        userPassword: [
          { required: true, message: '请填写密码' },
          { min: 6, max: 18, message: '密码长度为6-18' },
          { validator: (rule, val, callback) => {
            if (this.userInfo.confirmPassword !== '') {
              this.$refs.userInfo.validateField('confirmPassword')
            }
            callback()
          }}
        ],
        confirmPassword: [
          { required: true, message: '请再次填写密码' },
          { min: 6, max: 18, message: '密码长度为6-18' },
          { validator: (rule, val, callback) => {
            if (val !== this.userInfo.userPassword) {
              callback(new Error('两次输入密码不一致'))
            } else {
              callback()
            }
          }}
        ],
        mobile: [
          { required: false },
          { pattern: mobileReg, message: '请填写正确格式的手机号' },
          { validator: (rule, val, callback) => {
            if (val !== '') {
              this.conflict(2, this.userInfo.mobile).then(count => {
                count > 0? callback(new Error('手机号已重复，请重新填写')) : callback()
              })
            } else {
              callback()
            }
          }, trigger: 'blur' }
        ],
        email: [
          { required: false },
          { pattern: emailReg, message: '请填写正确格式的邮箱号' },
          { validator: (rule, val, callback) => {
            if (val !== '') {
              this.conflict(3, this.userInfo.email).then(count => {
                count > 0? callback(new Error('邮箱已重复，请重新填写')) : callback()
              })
            } else {
              callback()
            }
          }, trigger: 'blur'}
        ] 
      }
    }
  },

  created () {},

  mounted () {},

  methods: {
    register(form) {
      this.$refs[form].validate(async valid => {
        if (valid) {
          const res = await this.$axios.post('/user/register', this.userInfo)
          if (res.data.code === 1) {
            this.$util.saveLocal('userToken', res.data.chunk.userToken)
            this.$eventBus.$emit('refreshUserInfo')
            this.$router.push('/')
            this.$tooltip.tip(res.data.msg)
          } else {
            this.$tooltip.tip(res.data.msg, 'error')
          }
        }
      })
    },

    jumpLogin() {
      this.$router.push('/member/login')
    },

    //账号是否重复
    async conflict(type, val) {
      const res = await this.$axios.post('/user/conflict', {
        type, val
      })
      return res.data.chunk.count
    }
  },

  computed: {}

}

</script>
<style lang='less' scoped>
@import '../../less/index';
.el-col {
  .regBox {
    .form { width: 35%; margin: 0 auto;
      .el-form-item {
        .el-input { width: 94%; }
      }
      .el-button { width: 94%; margin-left: 6% }
      p { text-align: right; color: @green }
      span { color: @blue; float: right; cursor: pointer; margin-top: 10px;
        &:hover { color: @red } }
    }
  }
}
</style>