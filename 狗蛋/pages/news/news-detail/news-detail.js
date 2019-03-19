
var newsData = require("../../data/newsdata.js");
Page({
  data: {
    isplayer: false,
    detailData:[],
    newsid:'',
    collected:[]
  },

  onLoad: function (options) {
    console.log(newsData.initData[options.newsid])
    this.setData(newsData.initData[options.newsid])
     this.setData({ newsid: options.newsid })
    //第一次进入判断是否存在本地存储以及是否收藏
    var newsCollect = wx.getStorageSync("newsCollect");
    
    if (newsCollect) {//如果newsCollect存在，代表以前收藏过或者以前取消过收藏
      var newsCollect = newsCollect[options.newsid];
      this.setData({
         collected: newsCollect 
         })
    } else {
      //第一次进来根本不存在数据
      var newsCollect = {};
      newsCollect[options.newsid] = false;//将唯一id放到newsCollect中，然后默认false
      wx.setStorageSync('newsCollect', newsCollect);
    }
  },
  collectTap: function (e) {
   console.log(this.data.newsid);//打印id
    var newsCollect = wx.getStorageSync('newsCollect');//根据key获取点赞数据，所有数据的集合，我们只要其中某一项
    var newCollect = newsCollect[this.data.newsid];//newCollec=在收藏夹中的id某一项，获取到了某一项
    //点击收藏或者取消
    newCollect = !newCollect;
    newsCollect[this.data.newsid] = newCollect;//当前的这条数据交给从在收藏中获取的和id对应的那条数据，更新数
    wx.setStorageSync('newsCollect', newsCollect);//把整体存一下。不能存单独的
    this.setData({
      collected: newCollect
    })
    wx.showToast({
      title: newsCollect[this.data.newsid] ? '收藏成功' : '取消成功',
      icon: 'success',
      duration: 600,
      mask: true
    })
    wx.showShareMenu({
      withShareTicket: true
    })

  },
  onshare: function () {
    wx.showActionSheet({
      itemList: ['分享到微信', '分享到朋友圈','分享到QQ', '分享到微博'],
      success:function(res) {
        console.log(res.tapIndex)
      },
      fail:function (res) {
        console.log(res.errMsg)
      }
    })
  },

  onShareAppMessage: function () {
    return {
      title: newsData.initData[this.data.newsid].title,
      path: '/pages/news/news-detail/news-detail'
    }
  },

  playmusicTap: function (e) {
    var that = this;
      wx.getBackgroundAudioPlayerState({
        success:function(res){
          var status=res.status;
          if(status !=1){
            wx.playBackgroundAudio({
              dataUrl: newsData.initData[that.data.newsid].music.url,
              title: newsData.initData[that.data.newsid].music.title,
              coverImgurl: newsData.initData[that.data.newsid].music.coverImg
            })
            this.setData({
              isplayer:true
            })
          }else{
            wx.pauseBackgroundAudio();
    this.setData({
      isplayer: false
    })
          }
        }
      })
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        var status = res.status;
        if (status != 1) {
          wx.playBackgroundAudio({
            dataUrl: newsData.initData[that.data.newsid].music.url,
            title: newsData.initData[that.data.newsid].music.title,
            coverImgurl: newsData.initData[that.data.newsid].music.coverImg
          })
          this.setData({
            isplayer: true
          })
        } else {
          wx.pauseBackgroundAudio();
          this.setData({
            isplayer: false
          })
        }
      }
    })

  }
})