const path = require("path");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");

module.exports = {
  watch: true,
  target: "node",
  entry: "./src/server.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ['node ./build/bundle.js"'],
        blocking: false,
        parallel: true,
      },
    }),
  ],
};
