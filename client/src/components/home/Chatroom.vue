<!-- Chatroom -->
<template>
  <el-row>
    <el-col :span="24">
      <el-button type="success" round v-show="btnShow" @click="openChatroom">Join the Chatroom.</el-button>
    </el-col>
    <el-col :span="24" v-if="roomShow">
      <el-card shadow="hover" :body-style="chat">
        <div slot="header" class="clearfix">
          <span>k-chatroom</span>
          <i class="el-icon-circle-close" style="float: right; font-size: 26px; margin-right: 15px; color: #409EFF; line-height: 60px" @click="closeChatroom"></i>
        </div>
        <div class="cb">
          <div class="cb-l">
            <h2>在线用户</h2>
            <ul>
              <li v-for="(i,index) in userGroup" :key="index">{{ i }}</li>
            </ul>
          </div>
          <div class="cb-r">
            <ul class="body">
              <li v-for="(i, index) in msgGroup" :key="index" :style="i.msgPos">
                <span>{{ i.userMsg }}</span>
                <span :style="i.spanName">{{ i.userName }}</span>
                <p>{{ i.sendDate }}</p>
              </li>
            </ul>
            <div class="send">
              <el-input type="textarea" :rows="3" placeholder="请输入内容" :maxlength="100" resize="none" v-model="msg" @keydown.enter.native="sendMsg($event)"></el-input>
              <el-button type="primary" @click="sendMsg">发送</el-button>
            </div>
            <div class="status">
              <span>身份：{{ identity }}</span>
              <span>昵称：{{ nickname }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import io from 'socket.io-client'
import uuid from 'uuid'
export default {
  name: 'Chatroom',
  components: {},

  data () {
    return {
      btnShow: true, roomShow: false, chat: { 'border-top': '2px solid #409EFF' }, socket: {}, userGroup: [], msgGroup: [],
      identity: '游客', nickname: '', msg: ''
    }
  },

  created () {},

  methods: {
    //建立连接
    async setUpSocket() {
      //和服务端建立连接
      this.socket = io(this.$config.BASE_URL)
      //客户端显示连接成功
      this.socket.on('connect', async () => {
        // console.log('Connect to server.')
        if (this.$util.getLocal('userToken')) {
          //登录获取用户昵称
          const res = await this.$store.dispatch('fetchUserInfo')
          this.nickname = res.data.chunk.userName
          this.identity = '注册用户'
        } else {
          //未登录时产生随机游客昵称
          this.nickname = `-_-游客${this.$util.random(false, 6)}` 
        }
        this.socket.emit('userName', this.nickname)
      })

      //客户端失去连接
      this.socket.on('disconnect', () => {
        // console.log('Disconnect.')
      })
      //用户组
      this.socket.on('userGroup', ary => {
        this.userGroup = ary
      })
      //接受消息
      this.socket.on('receiveMsg', msgInfo => {
        if (msgInfo.userName === this.nickname) {
          msgInfo.msgPos = { 'text-align': 'right', 'color': '#0479F2', 'border': '2px solid #0479F2', 'border-radius': '20px' }
        } else {
          msgInfo.msgPos = { 'text-align': 'left', 'color': '#E6A23C', 'border': '2px solid #E6A23C', 'border-radius': '20px' }
          msgInfo.spanName = { 'float': 'left' }
        }
        this.msgGroup.push(msgInfo)
        if (this.msgGroup.length > 50) {
          this.msgGroup.shift()
        }
        //接受新消息时聊天框滚动最底部
        this.$nextTick(() => {
          const ul = document.getElementsByClassName('body')[0]
          const li = ul.getElementsByTagName('li')
          const height = li[0].clientHeight * li.length
          ul.scrollTop = height
        })
      })
    },

    //发送消息
    async sendMsg(e) {
      e.preventDefault()
      if (this.msg.trim() === '') return
      this.socket.emit('sendMsg', {
        userName: this.nickname,
        userMsg: this.msg
      })
      this.msg = ''
    },

    //打开聊天室
    async openChatroom() {
      this.btnShow = false
      this.roomShow = true
      this.setUpSocket()
    },

    //关闭聊天室 断开连接
    async closeChatroom() {
      this.btnShow = true
      this.roomShow = false
      this.socket.emit('close', this.nickname)
    }
  },

  beforeDestroy(){
    //摧毁该组件之前断开连接
    if (Object.keys(this.socket).length > 0)
    this.socket.emit('close', this.nickname)
  },

  computed: {}
}

</script>
<style lang='less' scoped>
@import '../../less/index';
.el-row { padding: 20px 0;
  .el-card { border: 2px solid @blue; border-radius: 6px;
    .cb { display: flex; height: 100%;
      .cb-l { flex: 1; background: @white; border-right: 1px solid @br-2;
        h2 { margin: 0; padding: 5px 0; border-bottom: 1px solid @br-2 }
        ul { padding: 2px 10px; margin: 0;
          li { font-size: @fz-14; padding: 2px 0 }
        }
      }
      .cb-r { flex: 3;
        .body { height: 400px; margin: 0; padding: 0 10px; overflow-y: auto;
          li { padding: 8px 10px 5px; margin: 5px 0; font-size: @fz-14;
            :nth-child(3) { font-size: @fz-12; margin: 5px 0 }
            :nth-child(2) { font-size: @fz-12 }
            :nth-child(1) { text-decoration: underline; text-decoration-color: @red; padding: 0 20px }
          }
        }
        .send { height: 75px; text-align: left;
          .el-textarea { width: 90% }
          .el-button { width: 10%; height: 75px; }
        }
        .status { line-height: 25px;
          span { margin-left: 20px }
        }
      }
    }
  }
}
</style>