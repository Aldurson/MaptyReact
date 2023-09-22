const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./components/App.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "js/bundle.js",
    publicPath: "/",
    assetModuleFilename: "assets/img/[hash][ext][query]",
  },
  devServer: { port: 3050, hot: true, open: true },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new MiniCssExtractPlugin({ filename: "css/mystyle.css" }),
  ],
  module: {
    rules: [
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      { test: /\.(png|jpe?g|gif|svg)$/i, type: "asset" },
      ,
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
    ],
  },
};
