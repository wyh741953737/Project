安装

npm init -y 
npm install webpack  webpack-cli webpack-dev-server

新建一个webpack.config.js文件进行配置

yarn add @babel-core @babel/preset-env @bebel/preset-react -D
yarn add babel-loader -D
npm i react-hot-loader
src加.babelrc
{
    "presets":["@babel/perset-env","@babel/perset-react"],
    "plugin":["react-hot-loader/babel"]
}
我们还需要调整 package.json 文件，以便确保我们安装包是私有的(private)，并且移除 main 入口。这可以防止意外发布你的代码。
+   "private": true,
-   "main": "index.js",
npm install --save lodash

config.json
+"build": "webpack"  
npx webpack


yarn add mongoose blueimp-md5

安装postmon测试接口，选择Post或者get方式。输入地址如localhost:3000/register,输入字段，发送，模拟登陆，用户名或者密码是否正确。

npm i axios 
封装ajax请求，用axios，包装，使用起来简单
