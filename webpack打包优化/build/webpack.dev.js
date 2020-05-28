
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const path = require('path');
const config = {
    mode: "development",
    devServer: {
        port: 8001,
        // contentBase: path.join(__dirname, './dist/'),
        publicPath: '/',
        // 代理
        proxy: {
            '/api': {
                target: "https://wwww.xxxxdomain.cn",
                changeOrigin: true
            }
        }
    },
    // devtool: 'source-map'
};

module.exports = webpackMerge(baseConfig, config);
