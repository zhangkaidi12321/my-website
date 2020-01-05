<!-- Bottom -->
<template>
  <div class="footer">
    <span>{{ recordInfo.contextB }}</span>
    <span>{{ recordInfo.contextC }}</span>
    <span>{{ recordInfo.contextA }}</span>
  </div>
</template>

<script>
export default {
  name: 'Bottom',
  components: {},

  data () {
    return {
      recordInfo: {}
    }
  },

  created () {
    this.fetchConfigInfo()
  },

  mounted () {},

  methods: {
    async fetchConfigInfo() {
      const res = await this.$axios.get('/config/fetchConfigInfo', { params: { type: 'record' } })
      if (res.data.code === 1) {
        this.recordInfo = res.data.chunk
      }
    }
  },

  computed: {}

}

</script>
<style lang='less' scoped>
@import '../../less/index';
.footer { height: 100%; background: #C1DFFE; line-height: 40px;
  span { margin: 0 10px; font-size: @fz-12; }
}
</style>