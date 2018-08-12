const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const fs = require('fs')

function generateHtmlPlugins (templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map(item => {
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]
    return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
        inject: false,
        alwaysWriteToDisk: true
    })
  })
}
const htmlPlugins = generateHtmlPlugins('./src/views/pages')

function HarddiskPlugin() {
    return new HtmlWebpackHarddiskPlugin({
        outputPath: path.resolve(__dirname, 'dist')
    })
}

module.exports = {
  entry: {
        app: ['./src/index.js', 'webpack-hot-middleware/client?noInfo=true&reload=true'],
    },
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
  .concat(htmlPlugins)
  .concat(HarddiskPlugin()),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.pug$/,
                use: ['pug-loader?pretty&exports=false']
            },
        ]
    },
    target: 'web'
};