// pages/detail/detail.js
var app = getApp()
var localhost = app.globalData.localhost
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 视频资源地址
    videoURL:'',
    // 视频信息
    vdieoInfo: {},
    // 推荐列表
    relatedList:[],
    // 评论数量
    commentsNum: null,
    // 评论列表
    commentList: [],
    // scroll-view位置监听
    scrollTop: 0,
    // 滚动到顶部标志
    toTOPshowMark: false,
},
/**
 * 自定义函数
 */
  // scroll-view回到顶部
  scrollToTop() {
    this.setData({
      scrollTop: 0
    })
  },
  // 回到顶部显示隐藏
  handleScrollViewScroll(event) {
    var _this = this
    var toTOPshowMark = this.data.toTOPshowMark
    if (event.detail.scrollTop > 800 && !toTOPshowMark) {
      _this.setData({ toTOPshowMark: true })
      return
    }

    if (event.detail.scrollTop < 800 && toTOPshowMark) {
      _this.setData({ toTOPshowMark: false })
      return
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    const aid = options.aid
    
    // 获取页面跳转传来的数据并存储
    this.getOpenerEventChannel()
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      _this.setData({vdieoInfo: data.data})
    })
    
    // 请求评论数据
    wx.request({
      url: localhost + '/detail/usercomments?aid=' + aid,
      success(res) {
        _this.setData({ commentList: res.data.data.replies, 
                        commentsNum: res.data.data.page.acount})
      }
    })

    // 请求相关视频列表数据
    wx.request({
      url: localhost + '/detail/relatedList?aid=' + aid,
      success(res) {
        _this.setData({ relatedList: res.data.data})
      }
    })

    // 请求视频地址
    wx.request({
      url: localhost + '/detail/videoURL?aid=' + aid,
      success(res) {
        var videoURL = res.data
        _this.setData({ videoURL: videoURL})
        console.log(videoURL, '200')
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})