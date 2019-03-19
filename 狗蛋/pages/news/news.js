
var newsData=require('../data/newsdata.js')
Page({

  data: {
      indicatorDots:true,
      autoplay:true,
      interval:2000,
      circular:true,
      useData:''
  },

 
  onLoad: function (options) {
    console.log(newsData)
    this.setData({
     useData:newsData.initData
    })
  },

  goNewsDetail:function(event){

    var newsid = event.currentTarget.dataset.newsid
wx.navigateTo({
  url: 'news-detail/news-detail?newsid='+newsid,
})
  },
  onReady: function () {

  },

})