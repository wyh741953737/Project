
//第一阶段，回调
//  const fs=require('fs')
// function readFile(cb){
//     fs.readFile('./package.json',(err,data)=>{
//         if(err) return console.log(err)
//         cb(null,data)
//     })
// }
// readFile((err,data)=>{
//     if(!err){
//         data=JSON.parse(data)
//         console.log(data.name)
//     }else{ console.log(err)}
// })

//第二阶段 Promise
// function readPro(path){
//     return new Promise((resolve,reject)=>{
//      fs.readFile(path,(err,data)=>{
//       if(err) reject(err)
//       else  resolve(data)
//      })
       
//     })
// }
// readPro('./package.json').then(data=>{
//     data=JSON.parse(data)
//     console.log(data.name)
// }).catch(err=> console.log(err))

//第三阶段 co+generator+Promise
// const co=require('co')
//  const util=require('util')
// co(function *(){
//     let data=yield util.promisify(fs.readFile)('./package.json')
//     data=JSON.parse(data)
//     console.log(data.name)
// })

//第四阶段  Async
const fs=require('fs')
const util=require('util')
const readAsync=util.promisify(fs.readFile)
async function init(){
    let data=await readAsync('./package.json')
    data=JSON.parse(data)
    console.log(data.name)
}
init()