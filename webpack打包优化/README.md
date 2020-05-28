

### 基础项目搭建
1、初始化package.json
```
npm init
```

2、初始化一个demo项目
```
npm i react react-dom redux react-redux react-router-dom react-router -S
```

3、安装打包依赖
```
npm i webpack webpack-cli @babel/core @babel/preset-env @babel/preset-react babel-loader css-loader html-webpack-plugin less less-loader -D
```
4、webpack资源合并
```
npm i webpack-merge -D
```


### 打包优化
- 资源拆分
     1、路由分包
    ```
    npm install react-loadable -S
    npm install @babel/plugin-syntax-dynamic-import -D
    
    // .babelrc配置:
    {
        ...,
         "plugins": [
        "@babel/plugin-syntax-dynamic-import"
      ]
    }
    ```
    2、css抽离单独包，支持动态加载，使用optimize-css-assets-webpack-plugin进行css压缩
    ```
    npm install mini-css-extract-plugin -S
    {
        ...,
        module: {
            rules: [  
                {
                    test: /.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'px2rem-loader',
                            options: {
                                remUnit: 75,
                                remPrecision: 8
                            }
                        },
                        'less-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('autoprefixer')({overrideBrowserslist: ['> 0.15% in CN']})// 自动添加css前缀
                                ]
                            }
                        }
                    ]
                },
            ]
        }  
        "plugins": [
            new MiniCssExtractPlugin({
                filename: '[name]-[contenthash:8].css',
                chunkFilename: '[id].[hash].css',
            }),
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css$/g
            }),          
        ]
    }            
    ```
- 每次打包后，目标输出目录不会清空，需要手动清空，可以使用 clean-webpack-plugin 插件辅助清空输出目录
    ```
        npm i clean-webpack-plugin -D
        
        // webpack配置      
        {
            ...,      
            plugins: [
                new CleanWebpackPlugin(),
            ]  
        }      
                 
    ```

- 有好的错误提示，friendly-errors-webpack-plugin，能识别某些类别的webpack错误，并清理，聚合和优先级，以提供更好的开发人员体验
    ```
        npm i friendly-errors-webpack-plugin -D
        // webpack配置      
        {
            ...,      
            plugins: [
                new FriendlyErrorsWebpackPlugin(),
            ]  
        }  
    
    ```
- 打包加速，hard-source-webpack-plugin，happypack
    ```
        npm i friendly-errors-webpack-plugin happypack -D
        // webpack配置      
        {
            ...,      
            plugins: [
                new FriendlyErrorsWebpackPlugin(),
            ]  
        }  
    
    ```
    HardSourceWebpackPlugin是webpack的插件，为模块提供中间缓存步骤。为了查看结果，您需要使用此插件运行webpack两次：第一次构建将花费正常的时间。第二次构建将显着加快（大概提升90%的构建速度）

- 移除未使用的css， purgecss-webpack-plugin

    ```
    const PurgecssPlugin = require('purgecss-webpack-plugin')

    const PATHS = {
        src: path.join(__dirname, 'src')
    };  
    ```
    ```
        // webpack.plugins内新增    
         new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        }),
    ```

- 资源分析， webpack-bundle-analyzer
    ```
        // webpack.plugins内新增  
        new BundleAnalyzerPlugin(),
    ```

- js压缩 terser-webpack-plugin
   ```
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                cache: true
            })
        ]
    },
  ```









