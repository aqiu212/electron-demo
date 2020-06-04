// vue.config.js

const isDev = process.env.NODE_ENV === "development";
module.exports = {
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        asar: false,
        nsis : {
          oneClick : false,
          allowToChangeInstallationDirectory: true,
          perMachine: true
        },
        productName: "demo",
        buildVersion: "1.0.0.0",
      },
      mainProcessFile: isDev
      ? "./src/index.dev.js"
      : "./src/index.js",
      mainProcessWatch: [
        "./src/index.js",
        "./src/windowManager.js"
      ]
    },
  },
  pages: {
    index: {
      entry: "src/renderer/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "单机版"
    }
  }
};
