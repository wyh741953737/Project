const Koa=require('koa')

const { resolve }=require('path')
const serve=require('koa-static')//充当本地静态资源服务器，只要配置一个路径

const app=new Koa()
app.use(serve(resolve(__dirname,'./')))

app.listen(3003)