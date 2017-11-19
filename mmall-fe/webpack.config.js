/*
 * @Author: chen 
 * @Date: 2017-11-19 10:44:23 
 * @Last Modified by: chen
 * @Last Modified time: 2017-11-19 20:42:11
 */
var path=require('path')
var webpack=require('webpack')
var extractTextPlugin=require('extract-text-webpack-plugin');
var htmlPlugin=require('html-webpack-plugin')
//獲取html-webpack-plugin參數的方法
var getHtmlConfig=function(name){
    return {
        template:`./src/view/${name}.html`,
        filename:`view/${name}.html`,
        inject:true,
        hash:true,
        chunks:['common',name]
    }
}
//環境變量 dev/online
var WEBPACK_ENV=process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV)
//webpack config
var config={
    entry:{
        'common':['./src/page/common/index.js'],
        'index':'./src/page/index/index.js',
        'login':'./src/page/login/index.js',
    },
    output:{
        //儲放的路徑
        path:path.resolve(__dirname,'dist'),
        //訪問的路徑
        publicPath:'/dist/',
        filename:'js/[name].js'
    },
    //可以引用外部plugin使用
    externals:{
        'jquery':'window.jQuery'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:extractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader'
                })
            },
            {
                test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                use:[{
                    loader:'url-loader?limit=100&name=resource/[name].[ext]'
                }]
            }
        ]
    },
    plugins:[
        //獨立通用模塊
        new webpack.optimize.CommonsChunkPlugin({
            //將會把entry 的 common打包成共用js
            name:'common',
            //會根據output path路徑
            filename:'js/base.js'
        }),
        //把css單獨把刀到文件
        new extractTextPlugin('css/[name].css'),
        //html模板處理
        new htmlPlugin(getHtmlConfig('index')),
        //html模板處理
        new htmlPlugin(getHtmlConfig('login')),
    ]
}

if('dev' == WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports=config