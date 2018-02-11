const path = require('path');
const webpack = require('webpack');
const I18nPlugin = require("i18n-webpack-plugin");
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
        indexHtml
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.' + language + '.js',
      publicPath: '/dist',                          // New
    },
    module: {
        rules: [
            {
                test: indexHtml,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                        },
                    },
                    {
                        loader: "extract-loader",
                    },
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src", "link:href"],
                            interpolate: true,
                            minimize: true,
                            root: path.resolve(__dirname, 'assets'),
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                loaders: [
                    {
                        loader: "file-loader",
                    },
                    {
                        loader: "extract-loader",
                    },
                ],
            },
            {
                test: /\.jpg$/,
                loaders: [
                    {
                        loader: "file-loader"
                    },
                ],
            },
        ]
    },
    plugins: [
      new I18nPlugin(
        languages[language]
      )
    ]
  };
});