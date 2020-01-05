<!-- Post -->
<template>
  <el-row>
    <el-col :span="20">
      <div class="title">
        <h1>{{ postInfo.title }}</h1>
        <div class="val">
          <div>
            <i class="el-icon-star-on"></i>
            <span>{{ postInfo.collect }}</span>
          </div>
          <div>
            <i class="el-icon-success"></i>
            <span>{{ postInfo.like }}</span>
          </div>
        </div>
        <div class="btn">
          <el-button size="mini" @click="changeBuilder">{{ this.builderVisible ? '只看楼主' : '看全部' }}</el-button>
          <el-button size="mini">
            <i class="el-icon-star-on"></i> 收藏
          </el-button>
          <el-button size="mini">
            <i class="el-icon-success"></i> 点赞
          </el-button>
        </div>
      </div>
      <el-row class="body main">
        <el-col :span="4" class="info">
          <div class="tag"><span class="builder">楼主</span></div>
          <div><img :src="postInfo.kUser.userImage"></div>
          <div><span>{{ postInfo.kUser.userName }}</span></div>
        </el-col>
        <el-col :span="20" class="content">
          <div class="cont" v-html="postInfo.content"></div>
          <div class="floor">
            <span>#楼主</span>
            <span>{{ postInfo.addTime }}</span>
            <span @click="childReply('')">回复</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="body noTop" v-for="i in replyList" :key="i.id" v-show="builderVisible">
        <el-col :span="4" class="info">
          <div class="tag"><span>#{{ i.floor }}</span></div>
          <div><img :src="i.userImage"></div>
          <div><span>{{ i.author }}</span></div>
        </el-col>
        <el-col :span="20" class="content">
          <div class="cont" v-html="i.content"></div>
          <div class="floor">
            <span>#{{ i.floor }}</span>
            <span>{{ i.addTime }}</span>
            <span @click="childReply(i.id, '', 1)">{{ i.show ? `收起回复(${i.childrenLength})` : `回复(${i.childrenLength})` }}</span>
          </div>
          <ul class="cReply" v-show="i.show">
            <li v-for="j in i.curList" :key="j.id">
              <img :src="j.userImage">
              <span class="s1">{{ j.author }}：</span>
              <span class="s2">{{ j.content }}</span>
              <span class="s3">{{ j.addTime }}</span>
              <span class="s4" @click="childReply(i.id, j.author, 2)">回复</span>
            </li>
            <TinyPagination v-if="i.childrenLength" @cEvent="changePage" :total="i.childrenLength" :id="i.id"></TinyPagination>
            <el-input type="textarea" :rows="2" v-model="replyInfo.content" resize="none" v-show="i.childShow || !i.childrenLength" maxlength="100"></el-input>
            <el-button size="mini" v-show="i.childShow || !i.childrenLength" type="success" @click="submitReply(i.id)">发表</el-button>
            <el-button size="mini" v-show="i.childShow || !i.childrenLength" type="warning" @click="cancelReply(i.id)">取消回复</el-button>
            <el-button size="mini" v-show="!i.childShow && i.childrenLength" type="warning" @click="childReply(i.id, '', 2)">回复</el-button>
          </ul>
        </el-col>
      </el-row>
      <Pagination @pageEvent="fetchReplyList" :total="total" v-show="builderVisible"></Pagination>
      <div id="reply"></div>
      <div class="pub-btn">
        <el-button @click="reset" >重置</el-button>
        <el-button type="primary" @click="pub">回帖</el-button>
      </div>
    </el-col>
    <el-col :span="4" class="side">
      
    </el-col>
  </el-row>
</template>

<script>
import Pagination from '../common/Pagination'
import TinyPagination from '../common/TinyPagination'
export default {
  name: 'Post',
  components: {
    Pagination, TinyPagination
  },

  data () {
    return {
      postInfo: { kUser: { userName: '', userImage: '' } }, editor: {}, replyInfo: { content: '', aKey: '', floor: '', cId: 0 },
      replyList: [], total: 0, offset: 1, limit: 10, builderVisible: true
    }
  },

  created () {
    this.fetchPostDetail()
    this.fetchReplyList()
  },

  mounted () {
    this.createEditor()
  },

  methods: {
    // 获取帖子详情
    async fetchPostDetail() {
      const aKey = this.$route.params.key
      this.replyInfo.aKey = aKey
      const res = await this.$axios.get(`/tag/fetchPostDetail/${aKey}`)
      if (res.data.code === 1) {
        this.postInfo = res.data.chunk
      }
    },

    // 获取帖子回复
    async fetchReplyList(offset = 1, limit = 10) {
      this.offset = offset
      this.limit = limit
      const aKey = this.$route.params.key
      const res = await this.$axios.post('/tag/fetchReplyList', { aKey, offset, limit })
      if (res.data.code === 1) {
        this.total = res.data.chunk.count
        this.replyList = res.data.chunk.rows.map(i => Object.assign({}, i, {
          show: i.children && i.children.length ? true: false,
          childShow: false,
          curList: i.children && i.children.length ? i.children.slice((i.offset - 1) * 5, i.offset * 5) : []
        }))
      }
    },

    // 切换子回复页码
    changePage(offset = 1, id) {
      this.replyList = this.replyList.map(i => Object.assign({}, i, {
        offset: i.id === id ? offset : i.offset,
        curList: i.id === id ? i.children.slice((offset - 1) * 5, offset * 5) : i.children.slice((i.offset - 1) * 5, i.offset * 5),
        childShow: false,
      }))
    },

    createEditor() {
      this.editor = new this.$E('#reply')
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
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'emoticon',  // 表情
      ]
      this.editor.create()
    },

    reset() {
      this.editor.txt.clear()
    },

    // 发表帖子回复
    async pub() {
      if (!this.$util.getLocal('userToken')) {
        this.$tooltip.tip('请登录后再回复', 'error')
        return;
      }
      if (this.$util.isNullOrEmpty(this.editor.txt.text())) {
        this.$tooltip.notify('回帖内容不能为空')
        return
      }
      if (this.editor.txt.text().length > 200) {
        this.$tooltip.notify('回帖内容不能超过200字')
        return
      }
      this.replyInfo.content = this.editor.txt.html()
      this.replyInfo.floor = this.total + 1
      const res = await this.$axios.post('/tag/addPostReply', this.replyInfo)
      if (res.data.code === 1) {
        this.editor.txt.clear()
        this.$tooltip.tip(res.data.msg)
        this.fetchReplyList(Math.ceil(this.total === 0 ? 1 : this.total / this.limit), this.limit)
      } else {
        this.$tooltip.tip(res.data.msg)
      }
    },
    
    // 只看楼主/看全部
    changeBuilder () {
      this.builderVisible = !this.builderVisible
    },

    // 子回复展开回复
    childReply(id, name, cate) {
      if (!id) {
        document.getElementById('reply').scrollIntoView()
      } else {
        this.replyList.forEach(i => {
          if (i.id === id && !name && cate === 1) {
            i.show = !i.show
            i.childShow = false
            this.replyInfo.content = ''
          } else if (i.id === id && cate === 2) {
            i.childShow = true
            this.replyInfo.content = name ? `@${name}：` : ''
          } else {
            i.childShow = false
          }
        })
      }
    },

    // 取消回复
    cancelReply(id) {
      this.replyList.forEach(i => {
        if (i.id === id) {
          i.childShow = false
        }
      })
    },

    // 提交子回复
    async submitReply(id) {
      if (!this.$util.getLocal('userToken')) {
        this.$tooltip.tip('请登录后再回复', 'error')
        return
      }
      if (this.replyInfo.content === '') {
        this.$tooltip.notify('回复内容不能为空')
        return
      }
      this.replyInfo.cId = id
      const res = await this.$axios.post('/tag/addPostReply', this.replyInfo)
      if (res.data.code === 1) {
        this.$tooltip.tip(res.data.msg)
        this.fetchReplyList(this.offset, this.limit)
      } else {
        this.$tooltip.tip(res.data.msg)
      }
    }
  },

  computed: {}

}

</script>
<style lang='less' scoped>
@import '../../less/index';
.el-row {
  >:nth-child(1) {
    .title { text-align: left; display: flex; background: @br-4; border-left: 1px solid @br-1; border-right: 1px solid @br-1;
      h1 { flex: 9; padding: 0 20px }
      .val { flex: 2; line-height: 54px;
        div { margin-left: 15px; display: inline-block;
          span { margin-left: 5px }
        }
      }
      .btn { flex: 4; line-height: 54px }
    }
    .body { border: 1px solid @br-1; background: #F5F8F9;
      img { border-radius: 50% }
      .info { position: relative;
        .tag { position: absolute; right: 10px; margin: 10px 0;
          .builder { padding: 2px 3px; background: #FCA36C; border-radius: 4px; color: @white }
        }
        div { margin: 20px 0;
          img { height: 100px; width: 100px }
        }
      }
      .content { height: 100%; text-align: left; padding: 0 10px; border-left: 1px solid @br-1;  min-height: 240px;
        .cont { word-break: break-word; min-height: 200px }
        .floor {text-align: right; margin-bottom: 10px;
          span { margin: 0 10px }
          span:nth-child(3) { color: @blue; cursor: pointer }
        }
        .cReply { padding: 0; margin: 5px 10px; background: @br-3;
          li { padding: 5px 10px 0; border: 1px dashed @br-1;
            img { display: inline-block; height: 22px; width: 22px }
            span { display: inline-block; line-height: 22px; vertical-align: top }
            .s1 { margin-left: 1%}
            .s2 { width: 66% }
            .s3 { margin-left: 2% }
            .s4 { margin-left: 2%; color: @blue; cursor: pointer }
          }
          .el-textarea { width: 99%; margin: 5px 0.5% }
          .el-button { float: right; margin: 5px 0 5px 5px }
        }
      }
    }
    .main { border: 2px dashed #F2B6B6; background: #FBF8F8 }
    .noTop { border-top: none }
    #reply { text-align: left; margin-top: 90px; padding: 2px; border: 1px dashed @br-2 }
  }
  .side { min-height: 600px; background: #F0F8FF }
}
</style>