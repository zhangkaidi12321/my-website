const db = require('../config/db')
const User = db.sequelize.import('../schema/k_user')
const Op = db.sequelize.Op
const tool = require('../util/tool')

//查询用户信息
const fetchUserInfo = async (id) => {
  const res = await User.findOne({
    attributes: ['userName', 'userImage', 'level'],
    where: { user_key: id }
  })
  return res
}

//登录
const login = async (userAccount) => {
  const res = await User.findOne({
    attributes: ['userPassword', 'userName', 'userImage', 'userKey', 'loginCount'],
    where: {
      [Op.or]: [{ userAccount }, { mobile: userAccount }, { email: userAccount }],
      [Op.and]: [{ enable: 1 }]
    },
    raw: true
  })
  return res
}

//登录次数+1
const loginCount = async (id) => {
  await User.update(
    { loginCount: db.sequelize.literal('login_count + 1'), lastLoginTime: new Date() },
    { where: { userKey: id } }
  )
}

//注册
const register = async (userInfo, domain) => {
  db.complete(userInfo)
  userInfo.userKey = tool.uuid(false, 16, 16)
  userInfo.loginCount = 1
  userInfo.lastLoginTime = new Date()
  userInfo.userImage = domain + '/image/default_common.png'
  await User.create(userInfo)
  return userInfo
}

//账号/手机号/邮箱冲突
const accountConflict = async (type, val) => {
  let count = 0
  switch (type) {
    case 1:
      count = await User.count({
        where: { userAccount: val }
      })
      break
    case 2:
      count = await User.count({
        where: { mobile: val }
      })
      break
    case 3:
      count = await User.count({
        where: { email: val }
      })
      break
  }
  return count
}

//修改个人信息
const update = async (userInfo, serverPath) => {
  const { userName, userKey } = userInfo
  await User.update({
    userName, userImage: serverPath, modTime: new Date()
  }, {
    where: { userKey }
  })
}

module.exports = {
  fetchUserInfo, login, loginCount, register, accountConflict, update
}