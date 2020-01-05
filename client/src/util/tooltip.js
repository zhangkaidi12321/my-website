import { Message, Notification } from 'element-ui'

export default {
  /**
   * 通用提示框 不传type默认success
   * @param {提示内容} message 
   * @param {success/warning/info/error} type 
   */
  tip(message, type) {
    Message({
      showClose: true,
      duration: 2000,
      message,
      type: type === undefined? 'success' : type
    })
  },

  /**
   * 右侧提示框 不穿tyoe默认warning
   * @param {提示内容} message 
   * @param {success/warning/info/error} type 
   */
  notify(message, type) {
    Notification({
      title: '提示',
      showClose: true,
      duration: 1500,
      message,
      type: type === undefined? 'warning' : type,
      offset: 100
    })
  }
}