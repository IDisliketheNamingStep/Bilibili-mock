// components/detail-comments/detail-comments.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commentsNum: Number,
    commentList: Array
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
    handle_NavTo_UPpage(options) {
      // 向详情页传aid
      var UPinfo = options.currentTarget.dataset.upinfo
      // console.log(options.currentTarget.dataset.upinfo,'23331')
      wx.navigateTo({
        url: '/pages/UP-page/UP-page',
        success: function (res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: UPinfo })
        }
      })
    },
  }
})
