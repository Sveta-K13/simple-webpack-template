const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const customProperties = require("postcss-custom-properties")();
const I18nPlugin = require("i18n-webpack-plugin");
const languages = {
  "en": null,
  "de": require("./languages/de.json"),
  "ru": require("./languages/ru.json")
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
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  minimize: true,
                  sourceMap: true,
                },
              },
              'postcss-loader',
            ],
          }),
          exclude: /\.config.css$/,
        },
          // {
          //     test: /\.jpg$/,
          //     loaders: [
          //         {
          //             loader: "file-loader"
          //         },
          //     ],
          // },
      ],
    },
    plugins: [
      new I18nPlugin(
        languages[language],
      ),
      new HtmlWebpackPlugin({
        title: 'webpack simple template',
        template: indexHtml,
        filename: 'index.' + language + '.html',
        minify: {
          removeComments: true,
        },
      }),
      new webpack.DefinePlugin({
        'SERVICE_URL': JSON.stringify("https://google.com"),
        'lang': JSON.stringify(language),
      }),
      new ExtractTextPlugin('index.css'),
    ]
  };
});
