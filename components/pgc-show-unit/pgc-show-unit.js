// components/pgc-show-unit/pgc-show-unit.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pgcInfo: Object
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
    handleNavToMovieanime(options) {
      var season_id = this.properties.pgcInfo.id
      var pgcInfo = this.properties.pgcInfo
      wx.navigateTo({
        url: '/pages/movie-animate/movie-animate?season_id=' + season_id,
      })
    },
  }
})
