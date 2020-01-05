<!-- TinyPagination -->
<template>
  <div class="tiny">
    <el-pagination
      small
      background
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next"
      :total="total"
      :page-size="5">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},

  data() {
    return {
    }
  },

  props: ['total', 'id'],

  created() {},

  mounted() {},

  methods: {
    handleCurrentChange(val) {
      this.$emit('cEvent', val, this.id)
    }
  },

  computed: {}
}

</script>
<style lang='less' scoped>
.tiny { padding: 5px 8px }
</style>