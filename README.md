# BuildAfterFileUpload

# 作用
在打包后把生成的文件上传到服务器一个目录中
例如打包生成的build文件，服务器在nginx的html中，使用此插件会把build内的内容复制到html中

weboack5一下都可以使用
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
* serverDir: 上传到服务器主机的目录
* production: 是否只在生产模式下上传，默认true

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
      serverDir: "",
      production: true
    })
  ]
}
```
