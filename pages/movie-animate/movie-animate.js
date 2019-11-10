// pages/movie-animate/movie-animate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 主要信息
    mainInfo: {},
    // 推荐列表
    recomList: [],
    // 评论列表
    commentList:[],
    // 评论总量
    commentsNum:0,
    // 滚动窗口scrolltop
    scrollTop: 0,
    // totop展示标志
    toTOPshowMark: false,
},
/**
 * 自定义函数
 */
  testAsync(season_id) {
  var _this = this
  return new Promise((resolve,reject)=>{
    wx.request({
      url: 'http://169.254.131.173:3000/detail/movieURL?id=' + season_id,
      success(res) {
        _this.setData({ mainInfo: res.data })
        resolve(res.data.videoInfo.epInfo.aid)
      }
    })
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
  onLoad: async function (options) {
    var _this = this
    var aid = null
    var season_id = options.season_id
    // 请求评论数据
    aid = await this.testAsync(season_id)
    wx.request({
      url: 'http://169.254.131.173:3000/detail/usercomments?aid=' + aid,
      success(res) {
        _this.setData({
          commentList: res.data.data.replies,
          commentsNum: res.data.data.page.acount
        })
      }
    })

    // 请求相关视频列表数据
    wx.request({
      url: 'http://169.254.131.173:3000/detail/pgcRecomList?aid=' + season_id,
      success(res) {
        _this.setData({ recomList: res.data.result.season })
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