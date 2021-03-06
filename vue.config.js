const path = require('path');
module.exports = {
    publicPath: './',    //部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
    outputDir: 'dist',        //运行时生成的生产环境构建文件的目录(默认'dist'，构建之前会被清除)
    assetsDir: '',        //静态资源目录(js、css、img、fonts)，相对outputDir的目录(默认'')
    indexPath: 'index.html', //指定生成index.html的输出路径(相对outputDir)也可以是绝对路径
    lintOnSave: false,                //是否开启ESlint（保存时检查）
    productionSourceMap: true,    //生产环境是否生成 sourceMap 文件
    //     pages: {    //pages里配置的路径和文件名在你的文档目录必须存在，否则启动服务会报错
    //         index: {//除了 entry 之外都是可选的
    //             entry: 'src/index/main.js',        //page的主入口
    //             template: 'public/index.html',    //模板来源
    //             filename: 'index.html',            //在 dist/index.html 的输出
    // //title在template中使用：<title><%=htmlWebpackPlugin.options.title%></title>
    //             title: '生成的配置信息',        
    //             chunks: ['chunk-vendors', 'chunk-common', 'index'] 
    // // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
    //         },
    //         subpage: 'src/subpage/main.js'
    // //官方解释：当使用只有入口的字符串格式时，模板会被推导为public/subpage.html
    // //若找不到就回退到public/index.html，输出文件名会被推导为subpage.html
    //     },
    // css: {
    //     extract: true,        //是否使用css分离插件 ExtractTextPlugin
    //     sourceMap: false,    //开启 CSS source maps
    //     loaderOptions:{}, //css预设器配置项
    //     modules: false        //启用CSS modules for all css / pre-processor files.
    // },

    //关于svg图片的配置
    chainWebpack: config => {
        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test
        const svgRule = config.module.rule('svg')
        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear()
        svgRule
            .test(/\.svg$/)
            .include.add(path.resolve(__dirname, './src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
        const fileRule = config.module.rule('file')
        fileRule.uses.clear()
        fileRule
            .test(/\.svg$/)
            .exclude.add(path.resolve(__dirname, './src/assets/icons'))
            .end()
            .use('file-loader')
            .loader('file-loader')
    },
    //关于适配的配置
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require('postcss-px2rem')({//为了将px转换成rem进行适配 remUnit是：设计图的尺寸/10
                        remUnit: 160
                    })
                ]
            }
        }
    },
    devServer: {    //环境配置
        host: '0.0.0.0',
        port: 8080,
        // https: false,      //是否开启https
        // hotOnly: false, //是否配置热更新
        // open: false,      //配置自动启动浏览器
        proxy: {        //配置多个代理跨域(配置一个 proxy: 'http://localhost:4000' )
            '/api': {
                target: 'http://192.168.2.45:8081/',//目标服务器http://192.168.2.45:8081/
                // ws: true,  //是否跨域
                changeOrigin: true,//是否跨域
                pathRewrite: { '^/api': '/' }//重定向
            },
            '/auth': {
                target: 'http://192.168.2.44:8081/',//目标服务器192.168.2.44 8081
                // ws: true,  //是否跨域
                changeOrigin: true,//是否跨域
                pathRewrite: { '^/auth': '/' }//重定向
            }
        }
    },
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },
    pluginOptions: {// 第三方插件配置
        // ...
    }
};