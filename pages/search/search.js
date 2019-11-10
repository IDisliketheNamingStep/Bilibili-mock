// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索关键词
    keyword: '',
    // 热搜列表
    hotWordList: [],
    // 搜索历史
    searchHistoryList:['少年的你','携父同游','电影']
  },
  // /**
  //  * 自定义函数
  //  */
  // 点击搜索，发送搜索请求
  handleConfirmSearch(event) {
    var keyword = event.currentTarget.dataset.keyword
    wx.navigateTo({
      url: '/pages/searchresults/searchresults?keyword=' + keyword,
    })
  },
  // 清空搜索历史
  handleClearHistory() {
    this.setData({ searchHistoryList:[]})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    // 获取搜索热词
    wx.request({
      url: 'http://169.254.131.173:3000/search/hotWordList',
      success(res) {
        _this.setData({ hotWordList: res.data.list })
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