// components/recom-related/recom-related.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recomList: Array,
    showDuration: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
   * 自定义函数，点击视频跳转至详情页
   */
    handleNavToDetail(options) {
      // 向详情页传aid
      var videoinfo = options.currentTarget.dataset.videoinfo
      var aid = options.currentTarget.dataset.videoinfo.aid
      wx.navigateTo({
        url: '/pages/detail/detail?aid=' + aid,
        success:function(res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: videoinfo })
        }
      })
    },
  }
})
