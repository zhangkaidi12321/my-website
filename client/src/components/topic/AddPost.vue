<!-- AddPost -->
<template>
  <el-row>
    <el-col :span="24">
      <div class="add">发布帖子</div>
      <div class="title">
        <p>标题</p>
        <el-input v-model="postInfo.title" :clearable="true" :maxlength="30" placeholder="不超过30字"></el-input>
      </div>
      <div class="body">
        <p>内容</p>
        <div id="addPost"></div>
      </div>
      <div class="pub-btn">
        <el-button @click="reset" >重置</el-button>
        <el-button type="primary" @click="pub" :disabled="pubDisable">发布</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: '',
  components: {},

  data () {
    return {
      editor: {}, postInfo: { title: '', content: '', type: 1 }, pubDisable: false
    }
  },

  created () {
    
  },

  mounted () {
    this.createEditor()
  },

  methods: {
    createEditor() {
      this.editor = new this.$E('#addPost')
      this.editor.customConfig.zIndex = 100
      this.editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        // 'image',  // 插入图片
        'table',  // 表格
        // 'video',  // 插入视频
        // 'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ]
      this.editor.create()
    },

    reset() {
      this.editor.txt.clear()
    },

    async pub() {
      if (this.$util.isNullOrEmpty(this.editor.txt.text()) || this.$util.isNullOrEmpty(this.postInfo.title)) {
        this.$tooltip.notify('帖子标题或内容不能为空')
        return
      }
      if (this.editor.txt.text().length > 2000) {
        this.$tooltip.notify('帖子长度不能超过2000字')
        return
      }
      this.postInfo.type = this.$route.params.id
      this.postInfo.content = this.editor.txt.html()
      const res = await this.$axios.post('/tag/addPost', this.postInfo)
      if (res.data.code === 1) {
        this.$tooltip.tip(res.data.msg)
        this.pubDisable = true
        setTimeout(() => {
          this.$router.go(-1)
        }, 1500)
      } else {
        this.$tooltip.tip(res.data.msg)
      }
    }
  },

  computed: {}

}

</script>
<style lang='less' scoped>
@import '../../less/index.less';
.add { font-size: @fz-24; margin: 20px 0 }
.title, .body { margin-bottom: 20px; text-align: left; font-size: @fz-14 }
</style>