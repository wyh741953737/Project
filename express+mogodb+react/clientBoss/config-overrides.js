const { injectbabelPlugin } =require('react-app-rewired')
module.exports=function override(config,env){
    config=injectbabelPlugin([
        'import',
        {
        "libraryName": "antd-mobile",
        "libraryDirectory": "es",
        "style": "css" // `style: true` 会加载 less 文件
        }
    ])
    return config
}