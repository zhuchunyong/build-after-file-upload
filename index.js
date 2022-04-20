const { NodeSSH } = require("node-ssh");

class BuildAfterFileUpload {
  constructor(options) {
    this.options = options;
    this.ssh = new NodeSSH();
  }
  apply(compiler) {
    const production = !!this.options.production;
    if (process.env.NODE_ENV === "development" && !production) {
      callback && callback();
      return;
    }
    if (compiler.hooks?.afterEmit) {
      compiler.hooks.afterEmit.tapAsync("BuildAfterFileUpload", async (compilation, callback) => {
        const outputPath = compilation.outputOptions.path;
        this.handle(outputPath);

        callback && callback();
      });
    } else {
      compiler.plugin("after-emit", (compilation, callback) => {
        const outputPath = compilation.outputOptions.path;
        this.handle(outputPath);
        callback && callback();
      });
    }
  }
  async handle(outputPath) {
    await this.connectServer();

    const serverDir = this.options.serverDir;
    await this.ssh.execCommand(`rm -rf ${serverDir}/*`);

    await this.uploadFiles(outputPath, serverDir);

    this.ssh.dispose();
  }

  async connectServer() {
    const { host, username, password } = this.options;
    await this.ssh.connect({
      host: host,
      username: username,
      password: password,
    });
    console.log("连接成功");
  }

  async uploadFiles(localpath, remotePath) {
    const status = await this.ssh.putDirectory(localpath, remotePath, {
      recursive: true,
      concurrency: 10,
    });
    console.log("传输到服务器：", status ? "成功" : "失败");
  }
}

module.exports = BuildAfterFileUpload;
