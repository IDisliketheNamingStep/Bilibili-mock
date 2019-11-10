// components/search-result-up-unit/search-result-up-unit.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    UPinfo: Object
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
      var UPinfo = this.properties.UPinfo
      wx.navigateTo({
        url: '/pages/UP-page/UP-page',
        success: function (res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: UPinfo })
        }
      })
    },
  }
})
