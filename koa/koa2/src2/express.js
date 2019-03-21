//express中使用中间件,需要两个对象,请求和响应对象
 const express=require('express')
 const app=new express()
// app.get('/',(req,res)=>{
//     res.send('Hi,Express')

// })
// app.listen(3003)

//使用中间件,context即可以访问上游也可以访问下游

//整个链路只进不出,在express里仅仅靠语言本身能力,不借助外力,
//在express(常规callback,单向,要借助于事件机制保障实现数据返程流动)很难做到和koa(async 新语言特性,http处理灵活,轻松)一样

const indent= (n)=>new Array(n).join('&nbsp;')
const mid1=()=>(res,req,next)=>{
       res.body='<h3>请求 => 第一层中间件</h3>'
       next()
       res.body+='<h3>响应<= 第一层中间件</h3>'
    }
const mid2=()=> (req,res,next)=>{
         res.body+=`<h3>${indent(4)}`+'请求 => 第二层中间件</h3>'
         next()
         res.body+=`<h3>${indent(4)}`+'响应<= 第二层中间件</h3>'
    }
  
    app.use(mid1())
    app.use(mid2())
    app.get('/',(req,res,next)=>{
            res.send(`${res.body}<p style="color:red">'${indent(12)}+koa核心业务处理</p>`)
      })
app.listen(3001)