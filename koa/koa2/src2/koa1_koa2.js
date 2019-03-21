const Koa=require('koa')
const app=new Koa()
const logger=require('koa-logger')
const convert=require('koa-convert')
const indent= (n)=>new Array(n).join('&nbsp;')
const mid1=() =>async (ctx,next)=>{
        ctx.body='<h3>请求 => 第一层中间件</h3>'
       await next()
       ctx.body+='<h3>响应<= 第一层中间件</h3>'
    }
const mid2=()=>async (ctx,next)=>{
        ctx.body+=`<h3>${indent(4)}`+'请求 => 第二层中间件</h3>'
        await next()
        ctx.body+=`<h3>${indent(4)}`+'响应<= 第二层中间件</h3>'
    }
const mid3=()=> async (ctx,next)=>{
        ctx.body+=`<h3>${indent(8)}`+'请求 => 第三层中间件</h3>'
        await next()
        ctx.body+=`<h3>${indent(8)}`+'响应<= 第三层中间件</h3>'
    }
    // app.use(convert(logger()))
    app.use(logger())
    app.use(mid1())
    app.use(mid2())
    app.use(mid3())
    app.use(async (ctx,next)=>{
            ctx.body+='<p style="color:red">'+indent(12)+'Koa核心业务处理</p>'
      })
app.listen(3001)




//koa1使用
// var Koa=require('koa')
// var app=new Koa()
// var logger=require('koa-logger')
// var  indent= (n)=>new Array(n).join('&nbsp;')
// var mid1=function(){
//     return function *(next){
//         this.body='<h3>请求 => 第一层中间件</h3>'
//         yield next
//         this.body+='<h3>响应<= 第一层中间件</h3>'
//     }
// }
// var mid2=function(){
//     return function *(next){
//         this.body=`<h3>${indent(4)}`+'请求 => 第二层中间件</h3>'
//         yield next
//         this.body+=`<h3>${indent(4)}`+'响应<= 第二层中间件</h3>'
//     }
// }
// var mid3=function(){
//     return function *(next){
//         this.body=`<h3>${indent(8)}`+'请求 => 第三层中间件</h3>'
//         yield next
//         this.body+=`<h3>${indent(8)}`+'响应 => 第三层中间件</h3>'
//     }
// }
// app.use(logger())
// app.use(mid1())
// app.use(mid2())
// app.use(mid3())
// app.use(function *(next){
//    this.body+='<p style="color:red">'+indent(12)+'Koa核心业务处理</p>'
// })
// app.listen(3000)