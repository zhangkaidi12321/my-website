<!-- Home -->
<template>
  <div class="home">
    <!-- <Floor></Floor> -->
    <Tag></Tag>
    <JumpBlog></JumpBlog>
    <Carousel></Carousel>
    <Card></Card>
    <Chatroom></Chatroom>
  </div>
</template>

<script>
import Floor from '../components/home/Floor'
import Tag from '../components/common/Tag'
import Carousel from '../components/home/Carousel'
import Card from '../components/home/Card'
import Chatroom from '../components/home/Chatroom'
import JumpBlog from '../components/common/JumpBlog'
export default {
  name: 'Home',
  components: {
    Tag, Carousel, Card, Chatroom, JumpBlog, Floor
  },

  data () {
    return {
    }
  },

  created () {},

  mounted () {},

  methods: {}
}

</script>
<style lang='less' scoped>
.home { position: relative }
</style>