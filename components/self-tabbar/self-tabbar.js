// components/self-tabbar/self-tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    handleHomeSearchJump(options) {
      let dst = '/pages/' + options.currentTarget.dataset.dst + '/' + options.currentTarget.dataset.dst
      wx.switchTab({
        url: dst,
      })
    },
  }
})
