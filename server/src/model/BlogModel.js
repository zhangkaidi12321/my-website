const fs = require('fs')

//查询所有标签类型
const fetchBlog = async () => {
  let res;
  try {
    res = fs.readFileSync('/Users/zhangkaidi/desktop/files/my-app/git_repository/client/src/components/blog/md/description.md')
  } catch (error) {
    console.log(error)
  }
  return res.toString()
}

module.exports = {
  fetchBlog
}