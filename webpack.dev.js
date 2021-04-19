const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  watch: true,
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
});
