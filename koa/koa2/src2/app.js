var Koa=require('koa')
var Router=require('koa-router')


var app=new Koa()
var router=new Router()
router.get('/',async (ctx)=>{
    ctx.body='首页'

}).get('/news',async (ctx)=>{

    ctx.body='这是一个新闻页面'
})
.get('/newscontent/:aid',async (ctx)=>{
    console.log(ctx.params)
    console.log(ctx)
    ctx.body='新闻主题'
})
app.use(router.routes())
.use(router.allowedMethods())
app.listen(3000)