本项目是一个基于React的全栈项目。
功能：注册，登陆，用户信息完善，牛人和Boss的列表(由于我看不到Boss身份下的界面，只能参照牛人界面了),实时聊天等模块。

技术栈：
前端：React全家桶（react路由，redux）+ES6等技术。
后端：Node+express+mongodb+socketIO等技术
开发：采用模块化，组件化，工程化的模式开发。
前端界面用了antd-mobile
技术选型：
前端数据展现/交互/组件化（react/react-router-dom，redux，antd-mobile）react全家桶/技术栈
后端项目（node/express/mongodb/mongoose/socket.io）
前后端交互（ajax请求（axios，async/await），接口测试：postman）react本身不能提交ajax请求，通过axios去执行异步ajax请求，async/await
模块化：es6，babel，后端commonJs
项目构建/工程化webpack/create-react-app
其他相关库：blueimp-md5，js-cookie，rc-queue-anim

拆分路由，前端路由：注册 登陆 主界面
前后台分离：分：责任划分，后台处理数据，数据交给浏览器端渲染，不分离数据在后台渲染，模板引擎（渲染数据的）。


1，create-react-app脚手架创建项目
2，打包发布：npm run build   npm i server server-build（打包的文件夹）
2，npm i antd-mobile -S
3,按需打包，下载工具模块 npm i --save -dev babel-plugin-import creat-app-rewired
定义加载配置的js模块：config-overrides.js
4,自定义主题，下载模块 npm i --save -dev less@2.7.3less-loader ,改配置config-overrides.js
5，引入路由 npm i --save react-router-dom
6，引入redux，npm i --save redux react-redux redux-thunk 不要下最新版本redux
7，npm i --save -dev redux-devtools-extension
8,搭建后台 cnpm install express express-generator -g
9，express --hbs serverBoss； --hbs表示创建Handlebars模板引擎(默认是jade模板)。serverBoss表示项目名称
修改后端项目www文件夹下端口号3001。在router中注册路由下载postman测试接口
10，npm i --save -dev nodemon 配置'start':'nodemon ./bin/www自动运行最新代码
11，下载mongodb，npm i mongoose
mongoose 1，引入mongoose，2，连接数据库，用mongoose的connect方法，3，获取连接对象，绑定监听事件，
4，得到对应特定集合的Model，5，通过Model实例对数据进行增删改查。
12,npm i blueimp-md5将明文密码加密。
用router注册路由，路由参数（url，回调函数）
定义一个filter将密码过滤，md对密码加密
13，npm i --save axios 使用axios封装的ajax请求函数，函数返回的是promise对象。
发请求（url，方式，data）ajax里的参数顺序不能乱！入过一次坑。
axios有两个方法，get，post，返回一个promise对象。
用redux管理状态（用户信息状态，用户列表状态，聊天状态）

前端端口3005，后端3001，端口不同，跨域，用代理解决（因为jsonp是get请求）core要去该服务端。
在package.json改配置"proxy": "http://localhost:3001",


14，npm i js-cookie 操作前端cookie的对象，set，remove方法。
15，npm i --save socket.io 前后台都需要下载。socket.io有两个包，一个是socket.io用于服务器端。socket.io-client用于客户端。是能实现多人远程实时聊天的库，它包装的是h5Websocket和轮循。ws协议。老浏览器可能不支持，就用轮循。1，连接服务器，得到与服务器的连接对象，2.发送消息。3，绑定监听，接受客户端发送的消息。4，处理消息。5，emit发送消息。
16，添加表情，https://emojipedia.org/
17，npm i --save rc-require-anim 添加动画效果
点击300ms的延迟，引入一个fastClick库
 <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>

socketIO库聊天
项目背景：
一个月前，下载了Boss直聘，本来想通过这个软件找一份好工作，第一次面试时，面试官直接问我，有项目经验吗？学了这么久，确实只做了一个基于Taro搭建的网易考拉小程序项目，可能面试官想要的是有React项目经验的人，加上第一次面试，不懂得面试技巧，大败而归啊。回去之后，选了这个项目，全身心投入，自我感觉收获满满。

显示未读消息
lastMsgs列表添加一个unReadCount属性，
每个lastMsg列表都有，
统计lastMsgs同时统计unReadCount，
统计：遍历每一个chatMsg，加unReadCount，unReadCount取值为1，或者0，1表示别人发给我未读，0表示已经读了
