<!-- PostList -->
<template>
  <div class="content" v-loading="loading">
      <el-tabs @tab-click="handleClick" value="total">
        <el-tab-pane label="所有帖子" name="total">
          <ul>
            <li>
              <span>标题</span>
              <span>作者 / 发表日期</span>
              <span>回复 / 浏览</span>
              <span>最后回复</span>
            </li>
            <li v-for="i in topicList" :key="i.aKey" @click="toPostDetail(i.aKey)">
              <span>{{ i.title }}</span>
              <span>{{ i.kUser.userName }} / {{ i.addTime }}</span>
              <span>0 / {{ i.preview }}</span>
              <span>{{ i.modTime }}</span>
            </li>
            <li v-if="topicList.length === 0" class="noContent">暂无内容</li>
          </ul>
          <Pagination @pageEvent="fetchTopicList" :total="total" :type="type"></Pagination>
        </el-tab-pane>
        <el-tab-pane label="精华帖子" name="essence">
          
        </el-tab-pane>
      </el-tabs>
      <el-button type="primary" @click="addPost">
        <i class="el-icon-plus"></i>
        发布新帖
      </el-button>
    </div>
</template>

<script>
import moment from 'moment'
import Pagination from '../common/Pagination'
export default {
  name: 'PostList',
  components: {
    Pagination
  },

  data () {
    return {
      tabInfo: {}, topicList: {}, total: 0, type: 1, loading: false
    }
  },

  created () {
    this.fetchTopicList(this.$route.params.type)
  },

  mounted () {},

  methods: {
    handleClick(tab, event) {
      
    },

    async fetchTopicList(type, offset = 1, limit = 10) {
      this.loading = true
      if (typeof type ==='string') {
        switch (type) {
          case 'all':
            this.type = 99
            break
          case 'program':
            this.type = 1
            break
          case 'game':
            this.type = 2
            break
          case 'animation':
            this.type = 3
            break
          case 'life':
            this.type = 4
            break
          case 'food':
            this.type = 5
            break
          case 'other':
            this.type = 98
            break
          default:
            this.type = 99
            break
        }
      }
      const res = await this.$axios.post('/tag/fetchTopicList', { type: this.type, offset, limit })
      this.total = res.data.chunk.count
      this.topicList = res.data.chunk.rows
      this.topicList.forEach(i => {
        i.addTime = moment(i.addTime).format('YYYY-MM-DD')
      })
      this.loading = false
    },

    toPostDetail(key) {
      const { href } = this.$router.resolve({
        name: 'post',
        params: { key }
      })
      window.open(href, '_blank')
    },

    addPost() {
      this.$router.push(`/addPost/${this.type}`)
    }
  },

  computed: {},

  watch: {
    $route(to, from) {
      this.fetchTopicList(to.params.type)
    }
  }
}

</script>
<style lang='less' scoped>
@import '../../less/index';
.content {  text-align: left; position: relative;
  .el-tabs { width: 100%; display: inline-block;
    ul { text-align: left; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      li { display: flex; font-size: @fz-13; padding: 10px; border-bottom: 1px solid @br-2; color: tx-b;
        &:first-child { font-size: @fz-14; color: @tx-t; font-weight: bold }
        &:not(:first-child):hover { color: @red; background: @br-4; cursor: pointer }
        :nth-child(1) { flex: 7 }
        :nth-child(2) { flex: 3 }
        :nth-child(3) { flex: 2 }
        :nth-child(4) { flex: 2 }
      }
      li.noContent { display: block; text-align: center; height: 60px; line-height: 60px;
        &:hover { color: @blue }
      }
    }
  }
  .el-button { position: absolute; right: 0; z-index: 100; }
}
</style>