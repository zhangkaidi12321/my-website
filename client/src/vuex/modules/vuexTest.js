export default {
  state: {
    a: 1, b: 2
  },

  getters: {
    getA: state => {
      return state.a
    },

    getB: state => state.b
  },

  mutations: {
    changeA(state) {
      state.a++
    },

    changeB(state) {
      state.b--
    }
  },

  actions: {
    act({ commit, state }) {
      commit('changeB')
      setTimeout(() => {
        state.b -= 10
      }, 2000)
    }
  }
}