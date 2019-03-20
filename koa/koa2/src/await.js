//交叉执行，第一执行自己的，碰到await，将控制权交出去，等一系列await执行完，在执行剩下的
const Koa=require('koa')
const logger=require('koa-logger')
const app=new Koa()


const mid1= async (ctx,next)=>{
    ctx.body='xixi'
    await next()
    ctx.body=ctx.body+'three'
}
const mid2= async (ctx,next)=>{
   
    await next()
}
const mid3= async (ctx,next)=>{
    ctx.body=ctx.body+'Luki'
    await next()
}
app.use(logger())
app.use(mid1)
app.use(mid2)
app.use(mid3)

app.listen(3002)
//打印结果：xixi luki three