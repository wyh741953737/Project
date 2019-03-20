const Koa=require('koa')
const app=new Koa()

app.use(async (ctx,next) => {//把他推到
    ctx.body='Eilen'
})
app.listen(3000)