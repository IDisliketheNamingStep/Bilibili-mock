// components/categoryList/categoryList.js
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
    slideDown: false,
    catActiveIndex: 0,
    catLiat:['首页','动画','番剧','国创','音乐','舞蹈','科技','数码','游戏','娱乐','鬼畜','电影',
    '电视剧','纪录片','影视','时尚','生活','广告','直播','相簿']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 分类激活项切换
    handleCatChange(event) {
      const catActiveIndex = event.currentTarget.dataset.index
      this.setData({ catActiveIndex})
    },
    handleSlideToggle() {
      this.setData({ slideDown: !this.data.slideDown})
    }
  }
})
