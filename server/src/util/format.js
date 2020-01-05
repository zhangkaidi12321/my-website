const moment = require('moment')

/**
* sequelize查询的日期需要+8.00和格式化
* @param {日期} date 
*/
const dateFormat = list => {
 const result = list.map(i => {
   if (i.hasOwnProperty('addTime') && i.hasOwnProperty('modTime')) {
     const j = Object.assign({}, i, {
       addTime: moment.utc(i.addTime).local().format('YYYY-MM-DD HH:mm:ss'),
       modTime: moment.utc(i.modTime).local().format('YYYY-MM-DD HH:mm:ss')
     })
     return i.children && i.children.length ? Object.assign({}, j, {
       children: dateFormat(i.children)
     }) : j
   } else if (i.hasOwnProperty('addTime')) {
     const j = Object.assign({}, i, {
       addTime: moment.utc(i.addTime).local().format('YYYY-MM-DD HH:mm:ss')
     })
     return i.children && i.children.length ? Object.assign({}, j, {
      children: dateFormat(i.children)
    }) : j
   } else if (i.hasOwnProperty('modTime')) {
     const j = Object.assign({}, i, {
       modTime: moment.utc(i.modTime).local().format('YYYY-MM-DD HH:mm:ss')
     })
     return i.children && i.children.length ? Object.assign({}, j, {
      children: dateFormat(i.children)
    }) : j
   }
 })
 return result
}

module.exports = {
  dateFormat
}