<!-- UserCenter -->
<template>
  <el-row v-loading="loading">
    <el-col :span="24">
      <h2>个人信息</h2>
      <el-form :model="userInfo" :rules="rule" ref="userInfo" status-icon label-width="90px">
        <el-form-item prop="userName" label="用户昵称" style="width: 30%">
          <el-input v-model="userInfo.userName" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item prop="userImage" label="用户头像">
          <img :src="userInfo.userImage">
          <div class="upload">
            <input type="file" @change="showImg" accept="image/*">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </div>
          <span class="tip">头像建议比例1：1，尺寸不要超过140px * 140px</span>
        </el-form-item>
        <el-form-item label="">
          <el-button type="danger" @click="reset">重置</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <h2>我的收藏</h2>
      <div></div>
    </el-col>
    <el-col :span="24">
      <h2>发布文章</h2>
      <div class="pub">
        <el-button type="primary" @click="pub" size="small" v-if="userInfo.level === 0">发布</el-button>
      </div>
    </el-col>
    <el-col :span="24">
      <h2>上传音乐</h2>
      <div class="pub">
        <el-upload
          v-if="userInfo.level === 0"
          action="/upload/uploadMusic"
          :headers="auth"
          name="file"
          accept="audio/mp3"
          :on-success="success"
          with-credentials
        >
          <el-button size="small" type="primary">上传</el-button>
        </el-upload>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'UserCenter',
  components: {},

  data () {
    return {
      userInfo: { userName: '', userImage: '', level: null },
      rule: {
        userName: [{ required: true, message: '请填写昵称', trigger: 'blur' }]
      },
      loading: false,
      auth: { Authorization: 'Bearer ' + localStorage.getItem('userToken') }
    }
  },

  created () {
    this.fetchUserInfo()
  },

  mounted () {},

  methods: {
    async fetchUserInfo() {
      const res = await this.$store.dispatch('fetchUserInfo')
      if (res.data.code === 1) {
        this.userInfo.userName = res.data.chunk.userName
        this.userInfo.userImage = res.data.chunk.userImage
        this.userInfo.level = res.data.chunk.level
        this.$eventBus.$emit('refreshUserInfo')
      }
    },

    showImg(e) {
      let file = e.target.files[0]
      let imgUrl = ''
      if (file) {
          let reader = new FileReader()
          reader.onload = e => {
            this.userInfo.userImage = e.target.result
          }
          reader.readAsDataURL(file)
      }
    },

    reset() {
      this.fetchUserInfo()
    },

    async save() {
      this.loading = true
      const res = await this.$axios.post('/user/update', this.userInfo)
      this.loading = false
      if (res.data.code === 1) {
        this.$tooltip.tip(res.data.msg)
        this.$eventBus.$emit('refreshUserInfo')
      } else {
        this.$tooltip.tip(res.data.msg, 'error')
      }
    },

    pub() {
      this.$router.push('/addNews')
    },

    success(response, file) {

    }
  },

  computed: {}

}

</script>
<style lang='less' scoped>
@import '../../less/index';
.el-row { text-align: left;
  .el-col { border-bottom: 1px dashed  @br-1;
    .el-form {
      .el-form-item { margin-bottom: 20px; text-align: left;
        img { width: 140px; height: 140px; border: 1px dashed @br-1 }
        .upload { position: absolute; display: inline-block; margin-left: 30px; font-size: 28px; color: #8c939d; width: 140px;
          height: 140px; line-height: 140px; text-align: center; border: 1px dashed @br-1;
          input { height: 140px; width: 140px; position: absolute; margin-left: -56px; opacity: 0; }
        }
        .tip { display: inline-block; position: absolute; bottom: 0; margin-left: 200px; color: @orange }
        .el-button { width: 100px; margin-right: 30px }
      }
    }
    .pub { margin-bottom: 20px }
  }
}
</style>