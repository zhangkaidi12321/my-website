<!-- Member -->
<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import Login from '../components/member/Login'
export default {
  name: 'Member',
  components: {
    Login
  },

  data () {
    return {
    }
  },

  created () {},

  mounted () {},

  methods: {},

  computed: {}

}

</script>
<style lang='less' scoped>
@import '../less/index';

</style>