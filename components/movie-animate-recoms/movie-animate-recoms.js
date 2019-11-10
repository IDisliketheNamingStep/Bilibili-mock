// components/movie-animate-recoms/movie-animate-recoms.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recomInfo: Object
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
    // 跳转至详情页
    handleNavToMovieanime(options) {
      var season_id = this.properties.recomInfo.season_id
      var recomInfo = this.properties.recomInfo
      wx.navigateTo({
        url: '/pages/movie-animate/movie-animate?season_id=' + season_id,
      })
    },
  }
})
