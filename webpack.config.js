const path = require('path');
const webpack = require('webpack');
// const htmlLoader = require('html-loader');
// const fileLoader = require('file-loader');
// const extractLoader = require('extract-loader');
// const indexHtml = path.join(__dirname, "src", "index.html");

// module.exports = {
//   context: path.resolve(__dirname, 'src'),
//   entry: {
//     'index.html': './index.html',
//     'index.js': './index.js',
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: '[name]',
//     publicPath: '/dist',                          // New
//   },
//   devServer: {
//     contentBase: path.resolve(__dirname, 'src'),    // New
//   },
//   module: {
//     rules: [
//       {
//         test: /\.html$/,
//         use: [
//             {
//                 loader: "html-loader",
//                 options: {
//                     attrs: ["img:src", "link:href"],
//                     interpolate: true,
//                     ignoreCustomFragments: [/\{\{.*?}}/],
//                     root: path.resolve(__dirname, 'assets'),
//                 },
//             },
//             {
//                 loader: "file-loader",
//                 options: {
//                     name: "[name].[ext]",
//                 },
//             },
//             {
//                 loader: "extract-loader",
//                 options: {
//                   publicPath: '/dist',
//                 },
//             },
//         ],
//       },
//       {
//         test: /\.(png|jpg|gif)$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {}
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new webpack.LoaderOptionsPlugin({
//       options: {
//         htmlLoader: {
//           ignoreCustomFragments: [/\{\{.*?}}/],
//           root: path.resolve(__dirname, 'assets'),
//           attrs: ['img:src', 'link:href']
//         },
//         extractLoader: {

//         },
//       }
//     })
//   ],
// };

const indexHtml = path.join(__dirname, "src", "index.html");

module.exports = {
    entry: [
        path.join(__dirname, "src", "index.js"),
        indexHtml
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
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
    }
};
