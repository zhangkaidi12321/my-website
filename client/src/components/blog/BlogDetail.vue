<!-- BlogDetail -->
<template>
  <div class="blog">
    <vue-markdown id="blog" :source="mdContent"></vue-markdown>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
import VueMarkdown from 'vue-markdown'
export default {
  name: 'BlogDetail',
  components: {
    VueMarkdown
  },

  data () {
    return {
      mdContent: ''
    }
  },

  created () {
    this.fetchBlogMd();
  },

  mounted () {
    this.highlightCode()
  },

  updated() {
    this.highlightCode()
  },

  methods: {
    async fetchBlogMd() {
      const res = await this.$axios.get('/blog/fetchBlogMd/description');
      if (res.data.code === 1) {
        this.mdContent = res.data.chunk
      }
    },

    highlightCode() {
      const ele = document.querySelectorAll('#blog')
      ele.forEach((el) => {
        hljs.highlightBlock(el)
      })
    }
  },

  computed: {}

}

</script>
<style lang='less' scoped>
.blog { text-align: left; #blog { padding: 10px 30px } }
</style>