const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin}=  require('clean-webpack-plugin') 
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cssLoader = function(firstLoader){
  return [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '/',
        hmr: process.env.NODE_ENV === 'development',
      },
    },
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: (loader) => [
          require('postcss-import')({ root: loader.resourcePath }),
          require('postcss-preset-env')(),
          require('cssnano')(),
          require('autoprefixer')
        ]
      }
    },
    firstLoader 
  ]
}
module.exports = {
  devtool: 'source-map',

  entry:{
    // lodash: path.resolve(__dirname, '../src/lodash.js'),
    app:path.resolve(__dirname,'../src/app.js')
  },
  output:{
    path:path.resolve(__dirname,'../dist/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns:'usage',
                  corejs:3
                }
              ]
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              [
                "@babel/plugin-proposal-decorators",
                {
                  legacy:true
                }
              ],
              [
                "@babel/plugin-proposal-class-properties",
                {
                  loose:true
                }
              ]
            ]
          }
        }
      },
      {
        test:/\.vue$/,
        loader:'vue-loader'
      },
      {
        test: /\.(css|styl)$/,
        use: cssLoader('stylus-loader')
      },
      {
        test: /\.scss$/,
        use: cssLoader('sass-loader')
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader:'url-loader',
            options:{
              limit:2000,
              outputPath:'../dist/'
            }
          }
        ]
      }
    ]
  },
  plugins: [ 
    // 打包前清dist文件夹
    new CleanWebpackPlugin(),
    // 给静态资源加版本号
    new HtmlWebpackPlugin({
        inject:'body',
        filename:'index.html',
        template:path.resolve(__dirname, "../public/index.html")
    }),
    // copy资源
    new CopyWebpackPlugin([
      {
        context:path.resolve(__dirname,'../public/'),
        from:'**/*',
        to:path.resolve(__dirname,'../dist/'),
        ignore:['index.html']
      }
    ]),
    // 解析.vue文件 配合loader使用
    new VueLoaderPlugin(),
    // 打包style
  ],
  
  // optimization: {
  //   splitChunks: {
  //     minSize:30000,
  //     cacheGroups: {
  //         default: {
  //           name: 'common',
  //           chunks: 'initial',
  //           priority:-20,
  //         },
  //         vendors: {  //拆分第三方库（通过npm|yarn安装的库）
  //           test: /[\\/]node_modules[\\/]/,
  //           name: 'vendor',
  //           chunks: 'initial',
  //           priority: -10
  //         }
  //     }
  //   }
  // }
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }

}