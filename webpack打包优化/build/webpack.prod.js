
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
    mode: "production",
};

module.exports = webpackMerge(baseConfig, config);
