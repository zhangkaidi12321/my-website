import axios from 'axios'
export default {
  state: {},

  getters: {},
  
  actions: {
    //获取用户信息
    async fetchUserInfo() {
      return await axios.get('/user/fetchUserInfo')
    }
  }
 
}