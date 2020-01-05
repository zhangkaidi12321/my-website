<!-- Pagination -->
<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="offset"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  components: {},

  data () {
    return {
      offset: 1, limit: 10
    }
  },

  props: ['total', 'type'],

  created () {},

  mounted () {},

  methods: {
    handleSizeChange(val) {
      this.limit = val
      if (this.type) {
        this.pageTypeEvent()
        return
      }
      this.pageEvent()
    },

    handleCurrentChange(val) {
      this.offset = val
      if (this.type) {
        this.pageTypeEvent()
        return
      }
      this.pageEvent()
    },

    pageEvent() {
      this.$emit('pageEvent', this.offset, this.limit)
    },

    pageTypeEvent() {
      this.$emit('pageEvent', this.type, this.offset, this.limit)
    }
  }
}

</script>
<style lang='less' scoped>
.block { float: right; margin-top: 30px }
</style>