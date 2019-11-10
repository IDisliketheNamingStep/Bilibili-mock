// components/search-head/search-head.js
var app = getApp()
var localhost = app.globalData.localhost
Component({
  /**页面生命周期 */
  pageLifetimes: {
    show: function() {},
    hide: function() {},
    resize: function(size) {}
  },
  /**组件生命周期 */
  lifetimes: {
    attached: function() {
      // this.getPlaceHolder()
    },
    detached: function() {}
  },
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    keyword: '',
    inputPlaceHolder: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
   * 自定义函数
   */
    // 点击取消键，返回上一页
    handleNavback() {
      wx.navigateBack()
    },
    // 监听搜索框输入，更新关键词
    handleUpdateKeyword(event) {
      var keyword = event.detail.value
      this.setData({ keyword })
      // console.log(event.detail.value, '444')
    },
    // 点击搜索，发送搜索请求
    handleConfirmSearch(event) {
      var _this = this
      wx.navigateTo({
        url: '/pages/searchresults/searchresults?keyword=' + event.detail.value,
      })
      console.log(event.detail.value, '233')
    },
    // 获取搜索框占位符
    getPlaceHolder() {
      var _this = this
      // 获取搜索占位符http://169.254.131.173:3000/search/searchengine
      wx.request({
        url: localhost + '/search/Placeholder',
        success(res) {
          _this.setData({ inputPlaceHolder: res.data.data.show_name })
        }
      })
    }
  }
})
