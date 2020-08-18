const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const commonConfig = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "../www"),
  },
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.(jsx?|es6)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                "@babel/plugin-syntax-dynamic-import",
                [
                  "import",
                  {
                    libraryName: "antd-mobile",
                    style: "css",
                  },
                ],
                [
                  "@babel/plugin-proposal-decorators",
                  {
                    legacy: true,
                  },
                ],
                [
                  "@babel/plugin-proposal-class-properties",
                  {
                    loose: true,
                  },
                ],
                "@babel/plugin-transform-runtime",
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|ico)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "static/images/[name].[ext]",
            limit: 1000,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "static/fonts/[name].[ext]",
          },
        },
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html",
      publicPath: "",
      minify: {
        minifyCSS: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeEmptyAttributes: true,
        removeComments: true,
      },
    }),
  ],
};

module.exports = commonConfig;
