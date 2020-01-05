### 目的  
  &emsp;&emsp;对于有 IT 信息能力的供应商或其使用的 saas 服务商需要接入 SHEIN 的各类业务 系统，本公司将开放现有业务系统能力，对外打通线上信息流。因此搭建对外开放平台 (gateway) ，统一外部系统接入规范，本文档给出了接口接入说明。
### 接入流程  
* 申请开通接入账号(前期由 SHEIN 后台录入，提供给用户 customerName、secretKey)
* 根据【接入细则】计算签名:x-lt-signature
* 根据 SHEIN 业务系统的具体业务 API 文档调试接口
### 接入细则
* 请求头
  * x-lt-openKeyId 即注册的用户名 customerName
  * x-lt-timestamp 毫秒时间戳
  * x-lt-signature 接口签名
* 签名计算方法
  * Build 5 位随机码:randomKey
  * 将字符串:value = x-lt-openKeyId + “&”+ x-lt-timestamp+“&”+requestPath 和 key = secretKey+randomKey 进行 hmacSha256 求值后转全小写
  * 将上一步(step2)的值进行 base64Encode 求值
  * x-lt-signature = randomKey + 上一步(step3)值
* Request params 和 Response Body 参照具体 [接口文档](https://openapi-portal.sheincorp.cn/#/module/1) 传入
### 调用示例
- HTTP请求方式(同样包含HTTPS请求)  
  查询操作使用 GET，增、删、改使用使用 POST  
  Protocol1.1 以上
- Header  

  | 参数 | 是否必填 | 说明 |
  | :---- | :---- | :---- |
  | Content-Type | 必填 | application/json;charset=UTF-8 |
  | x-lt-openKeyId| 必填 | 请求用户唯一标识 |
  | x-lt-timestamp | 必填 | 请求毫秒时间戳 |
  | x-lt-signature | 必填 | 接口签名 |

- GET /get/userInfo  
参数格式:url?customerId=1&country=china
- POST /update/userInfo  
参数 Body 格式:
```json
{
  "id": 1,
  "supplier_name": "南京希音",
  "remark": "这是备注"
}
```
- 请求响应:  
当 http status = 200 表示程序正确处理  
当 http status = 401 签名未通过  
当 http status = 404 访问接口不存在  
当 http status = 403 接口无权限访问  
当 http status = 429 请求超过访问限制  
当 http status = 502 网关异常  
当 http status = 500 内部业务服务器异常  
均可解析以下 json 格式报文:
```json
{
  "code": "0", // 请求成功 code 为 0，非 0 均为失败，默认失败的 code 为-1
  "msg": "ok", // 请求失败时，msg 会返回简要的错误信息
  "info": {}, // 请求成功时，返回接口数据
  "error": {} // 部分接口在 code 非 0 时,该字段会返回 json 格式的详细错误
}
```
### 错误码

* 定义

  | Code | 含义 |
  | :---| :--- |
  | 0 | 唯一标志成功的 code |
  | -1 | 默认的失败 code |

## 环境

* 测试

  [http://openapi-test01.sheincorp.cn](http://openapi-test01.sheincorp.cn)

* 生产

  [https://openapi.sheincorp.cn](https://openapi.sheincorp.cn)