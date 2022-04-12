# BuildAfterFileCopy
## 下载
```sh
npm install build-after-file-upload
```
## 使用
```js
// webpack.config.js
const BuildAfterFileUpload = require("build-after-file-upload")

module.exports={
  plugins:[
    new BuildAfterFileUpload({
      hostname: "",
      username: "",
      password: "",
      serverDir: ""
    })
  ]
}
```
## options参数
* hostname: 上传主机的IP地址
* username: 上传服务器的用户，默认root
* password: 服务器主机的密码
* serverDir: 上传到服务器主机的密码

例如：
```js
// webpack.config.js
const BuildAfterFileUpload = require("build-after-file-upload")

module.exports={
  plugins:[
    new BuildAfterFileUpload({
       hostname: "",
      username: "",
      password: "",
      serverDir: ""
    })
  ]
}
```
