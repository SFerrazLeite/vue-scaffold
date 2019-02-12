const merge = require("webpack-merge");
const path = require("path");
const baseConfig = require("../webpack.config");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPlugin = require("webpack-shell-plugin");
const exec = require("child_process").exec;

var config = merge(baseConfig, {
  devtool: "eval-source-map",
  entry: "./test/suite.js",
  output: {
    path: path.resolve(__dirname, "../"),
    filename: "test.bundle.js"
  },
  externals: [nodeExternals()],
  node: {
    fs: "empty"
  },
  module: {
    rules: [
      {
        test: /test\/.*\.spec\.js$/,
        use: "mocha-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    {
      apply: compiler => {
        compiler.hooks.afterEmit.tap("AfterEmitPlugin", compilation => {
          exec("mocha ./test.bundle.js", (err, stdout, stderr) => {
            if (stdout) process.stdout.write(stdout);
            if (stderr) process.stderr.write(stderr);
          });
        });
      }
    }
  ]
});

//Remove HtmlWebpackPlugin from base config
config.plugins = config.plugins.filter(
  value => value.constructor.name !== "HtmlWebpackPlugin"
);

module.exports = config;
