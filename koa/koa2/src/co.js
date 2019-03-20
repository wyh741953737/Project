const co=require('co')
const fetch=require('node-fetch')//请求数据
// co(function *() {
//     const res = yield fetch('https://api.douban.com/v2/movie/1291843')
//     const movie=yield res.json()
//     const summary=movie.summary
//     console.log('summary',summary)
// })
function run (generator) {
    const iterator=generator()//调用生成器产生迭代器对象
    const i=iterator.next()//next方法
    const promise=i.value
    promise.then( data=>{//拿到data
        const i2=iterator.next(data)
        const promise2=i2.value
        promise2.then(data2=>{
            iterator.next(data2)
        })
    })
}
run(function *() {
    const res = yield fetch('https://api.douban.com/v2/movie/1291843')
    const movie=yield res.json()
    const summary=movie.summary
    console.log('summary',summary)
})
