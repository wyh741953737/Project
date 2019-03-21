//const url=`https://movie.douban.com/tag/#/?sort=R&range=6,10&tags=`
const url=`https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0`
const puppeteer=require('puppeteer')
const sleep=time => new Promise(resolve =>{//实现promise定时函数
    setTimeout(resolve,time)
})

;(async ()=>{
    console.log('开始访问目标页面')
    const browser=await puppeteer.launch({//Puppeteer类似其他框架，通过操作Browser实例来操作浏览器作出相应的反应
 //通过puppeteer的launch方法生成了一个browser的实例，对应于浏览器，launch方法可以传入配置项
        args:['--no-sandbox'],//启动非沙河模式
        dumpio:false
    })
    const page=await browser.newPage()//声明新页面
    await page.goto(url,{
        waitUntil:'networkidle2'   //等待网路空闲
    })

    await sleep(1000)
    await page.waitForSelector('.more')//等待页面元素
    for( let i=0;i<1;i++){
        await sleep(1000)
        await page.click('.more')
    }
    const result=await page.evaluate(()=>{//回调函数是要在页面上执行的脚本
        var $=window.$
        var items = $('.list a')
        var links=[]
        if(items.length >=1 ) {
            items.each((index,item) => {
                let it=$(item)
                let doubanid=it.find('div').data('id')
                let title=it.find('p').text().replace("\r|\n|\\s", "")
                let rat=it.find('strong').text()
                let poster=it.find('img').attr('src').replace('s_ratio','l_ratio')
                links.push({
                    doubanid,
                    title,
                    rat,
                    poster
                })
            })
        }
        return links
    })
    browser.close()
    console.log(result)
})()