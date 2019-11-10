// pages/UP-page/UP-page.js
var app = getApp()
var localhost = app.globalData.localhost
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // UP信息
    UPinfo: {},
    // 关注及粉丝
    UPerInfo: {},
    // 上传的作品
    UPPostedInfo: {},
    // 滚动窗口scroll-view监听
    scrollTop: 0,
    // totop展示标志
    toTOPshowMark: false,
    // 是否上传过作品
    postedContent: 1

  },
  /**
   * 自定义函数
   */
  handleJumptoHome() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  handleNavToDetail(options) {
    // 向详情页传aid
    var videoinfo = options.currentTarget.dataset.videoinfo
    var aid = options.currentTarget.dataset.videoinfo.aid
    wx.navigateTo({
      url: 'pages/detail/detail?aid=' + aid,
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: videoinfo })
      }
    })
  },
  scrollToTop() {
    this.setData({
      scrollTop: 0
    })
  },
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
    var UPinfo = null
    // const aid = options.aid

    // 获取页面跳转传来的数据并存储
    this.getOpenerEventChannel()
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      UPinfo = data.data
      _this.setData({ UPinfo: data.data })
    })

    // 获取UPer信息http://169.254.131.173:3000/upPage/UPerInfo?vmid=444982684
    wx.request({
      url: localhost + '/upPage/UPerInfo?vmid=' + UPinfo.mid,
      success(res) {
        _this.setData({ UPerInfo: res.data.data})
      }
    })

    // 获取UP上传列表http://169.254.131.173:3000/upPage/UPPostedInfo?pn=1&ps=100&order=click&keyword=&mid=479842095
    wx.request({
      url: localhost + '/upPage/UPPostedInfo?pn=1&ps=100&order=click&keyword=&mid=' + UPinfo.mid,
      success(res) {
        _this.setData({ UPPostedInfo: res.data.data, postedContent: res.data.data.list.vlist.length})
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