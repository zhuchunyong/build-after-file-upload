const { NodeSSH } = require("node-ssh");

class BuildAfterFileUpload {
  constructor(options) {
    this.options = options;
    this.ssh = new NodeSSH();
  }
  apply(compiler) {
    if (process.env.NODE_ENV === "production") {
      compiler.hooks.afterEmit.tapAsync(
        "BuildAfterFileUpload",
        async (compilation, callback) => {
          const outputPath = compilation.outputOptions.path;

          await this.connectServer();

          const serverDir = this.options.serverDir;
          await this.ssh.execCommand(`rm -rf ${serverDir}/*`);

          await this.uploadFiles(outputPath, serverDir);

          this.ssh.dispose();

          callback();
        }
      );
    }
  }

  async connectServer() {
    const { host, username = "root", password } = this.options;
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
