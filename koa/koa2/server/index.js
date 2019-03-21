const Koa=require('koa')
const app=new Koa()

const views=require('koa-views')
const { resolve }=require('path')
app.use(views(resolve(__dirname,'./views'),{//views中间件集成
    extension:'pug'
}))
app.use(async (ctx,next) => {
    await ctx.render('index',{
        you:'xixi',
        me:'niuniu'
    })
})
app.listen(3000)