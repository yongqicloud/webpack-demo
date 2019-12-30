
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.config.common')

const buildConfig = {
  mode:'production',
  
  output:{
    filename:'scripts/[name]-[hash:6].js', 
  },
  
  plugins: [ 
    
    // 打包style
    new MiniCssExtractPlugin({
      filename:'styles/[name]-[hash:6].css'
    })
  ],
}
module.exports = merge(commonConfig,buildConfig)