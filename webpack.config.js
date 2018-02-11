const path = require('path');
const webpack = require('webpack');
const I18nPlugin = require("i18n-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const languages = {
  "en": null,
  "de": require("./languages/de.json")
};

const indexHtml = path.join(__dirname, "src", "index.html");



module.exports = Object.keys(languages).map(function(language) {
  return {
    name: language,
    entry: [
        path.join(__dirname, "src", "index.js"),
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.' + language + '.js',
      // publicPath: '/',                          // for auto generate link in html
    },
    module: {
      rules: [
          // {
          //     test: /\.css$/,
          //     loaders: [
          //         {
          //             loader: "file-loader",
          //         },
          //         {
          //             loader: "extract-loader",
          //         },
          //     ],
          // },
          // {
          //     test: /\.jpg$/,
          //     loaders: [
          //         {
          //             loader: "file-loader"
          //         },
          //     ],
          // },
      ],
      loaders: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      ],
    },
    plugins: [
      new I18nPlugin(
        languages[language],
      ),
       new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.' + language + '.html',
        minify: {
          removeComments: true,
        },
      }),
    ]
  };
});
