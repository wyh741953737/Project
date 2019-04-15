
npm i babel-plugin-import react-app-rewired

yarn add redux react-redux redux-thunk

涉及到跨域，用代理解决。在package.json里配置"proxy":"http://localhost:3001"

npm i js-cookie可以操作前端cookie的对象
set，remove
cookies.set()

63集
显示未读消息
lastMsgs列表添加一个unReadCount属性，
每个lastMsg列表都有，
统计lastMsgs同时统计unReadCount，
统计：遍历每一个chatMsg，加unReadCount，unReadCount取值为1，或者0，1表示别人发给我未读，0表示已经读了
