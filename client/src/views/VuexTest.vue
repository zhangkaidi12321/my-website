<!-- Test -->
<template>
  <div>
    <el-button type="danger" @click="test">test</el-button>
    <el-button type="success" @click="btn">act</el-button>
    <p>getter1: <span>{{ getA }}</span></p>
    <p>getter2: <span>{{ getB }}</span></p>
    <p>state1: <span>{{ a }}</span></p>
    <p>state2: <span>{{ b }}</span></p>
    <input v-focus style="width: 20%">
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'VuexTest',
  components: {},

  data () {
    return {
      // a: '', b: ''
    }
  },

  created () {},

  mounted () {},

  methods: {
    test() {
      // this.$store.commit('changeA')
      this.changeA()
      this.changeB()
    },

    btn() {
      this.act()
    },

    ...mapMutations([
      'changeA', 'changeB'
    ]),

    ...mapActions([
      'act'
    ])
  },

  computed: {
    ...mapGetters([
      'getA', 'getB'
    ]),

    // ...mapGetters({
      // A: 'getA', B: 'getB'
    // }),

    a() {
      return this.$store.state.vuexTest.a
    },

    b() {
      return this.$store.state.vuexTest.b
    }

    // ...mapState([
    //   'a', 'b'
    // ])
  }

}

</script>
<style lang='less' scoped>
</style>