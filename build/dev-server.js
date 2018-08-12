const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('../webpack.config.js');
const compiler = webpack(config);

app.use(express.static("dist"));
app.use(webpackDevMiddleware(compiler, {
  noInfo: true, publicPath: config.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});