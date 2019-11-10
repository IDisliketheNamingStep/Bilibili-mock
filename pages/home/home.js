// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    swiperList: [],
// 推荐列表
    recomList:[],
    toTOPshowMark:false
  },
  /**
   * 自定义函数
   */
  // 回到顶部
  scrollToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    // 获取轮播图信息
    wx.request({
      url:'http://169.254.131.173:3000/swiperlist',
      success(res) {
        _this.setData({ swiperList: res.data.data})
      }
    })

    // 获取推荐视频信息
    wx.request({
      url: 'http://169.254.131.173:3000/recomList',
      success(res) {
        _this.setData({ recomList: res.data.data.list})
      }
    })
  },
  onPageScroll(event) {
    var _this = this
    var toTOPshowMark = this.data.toTOPshowMark
    if (event.scrollTop > 800 && !toTOPshowMark) {
      _this.setData({ toTOPshowMark: true })
      return
    }

    if (event.scrollTop < 800 && toTOPshowMark) {
      _this.setData({ toTOPshowMark: false })
      return
    }
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