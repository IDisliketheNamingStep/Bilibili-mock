// pages/search-results/search-results.js
var app = getApp()
var localhost = app.globalData.localhost
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itimer: null,
    // 搜索结果数量统计
    top_tlist: {activity: 0,article: 1000,bangumi: 0,card: 0,live: 0,live_master: 0,
      live_room: 0,live_user: 145,media_bangumi: 0,media_ft: 0,
    movie: 0,operation_card: 0,pgc: 0,photo: 98,special: 11,topic: 1,tv: 0,upuser: 97,
      user: 0,video: 1000},
    // 搜索类型列表
    search_type_list: [
      { title: '综合', search_type: 'all' },
      { title: '番剧', search_type: 'bangumi' },
      { title: 'UP主', search_type: 'upuser' },
      { title: '影视', search_type: 'pgc'}
      ],
    current_search_type: 0,
    // 排序类型列表
    order_list: [
      { title: '默认排序', order_type: 'totalrank' },
      { title: '播放多', order_type: 'click' },
      { title: '新发布', order_type: 'pubdate' },
      { title: '弹幕多', order_type: 'dm' }
      ],
    current_order_type: 0,
    // 搜索结果==视频==列表
    listNameList: [
      [
        'alltotalrankList',
        'allclickList',
        'allpubdateList',
        'alldmList'
        ],
      'bangumiList',
      'upuserList',
      'pgcList'
      ],
    tempPgcList:[],
    pgcList: {page: 1, once: false, list: []},
    tempbangumiList:[],
    bangumiList: {page: 1, once: false, list: [] },
    allclickList: { page: 1,once: false, list: [] },
    allpubdateList: { page: 1, once: false, list: [] },
    alldmList: { page: 1, once: false, list: [] },
    alltotalrankList: {page: 1,once:false,list:[]},
      // 搜索结果==UP主==列表
    upuserList: {page: 1,once:false,list:[]},
    // 搜索结果排序
    order: "totalrank",
    // 搜索类型
    search_type: 'all',
    // 搜索页码
    page: 1,
    // 搜索关键词
    keyword: '',
    // 以下参数意义不明
    bangumi_num: 3,
    main_ver: "v3",
    movie_num: 3,
    pagesize: 20,
    platform: "h5",
    // 回到顶部展示开关
    toTOPshowMark: false,
    scrollTop: 0
  },
  /**
   * 自定义函数
   */
  scrollToTop() {
    this.setData({
      scrollTop: 0
    })
  },
  handleScrollViewScroll(event) {
    var _this = this
    var toTOPshowMark = this.data.toTOPshowMark
    if (event.detail.scrollTop > 800 && !toTOPshowMark) {
      _this.setData({ toTOPshowMark: true})
      return
    }

    if (event.detail.scrollTop < 800 && toTOPshowMark) {
      _this.setData({ toTOPshowMark: false })
      return
    }
    // console.log('111', event)
  },
  async handleReachBottom() {
    var _this = this
    var listname = ''
    // 清除定时器
    if (_this.data.itimer) {
      clearTimeout(_this.data.itimer)
      await _this.setData({itimer: null})
    }
    // 确定listname
    if (_this.data.current_search_type !== 0) {
      listname = _this.data.listNameList[_this.data.current_search_type]
    } else {
      listname = _this.data.listNameList[0][_this.data.current_order_type]
    }
    // 判断若该list的page为-1，则返回
    if(this.data[listname].page === -1) {
      return false
    }
    var itimer = await setTimeout(async ()=>{
      
      await this.getSearchResults({}, listname)
    },720)
    await _this.setData({itimer})
    
  },
  // 跳转至详情页
  handleNavToDetail(options) {
    // 向详情页传aid
    var videoinfo = options.currentTarget.dataset.videoinfo
    var aid = options.currentTarget.dataset.videoinfo.aid
    wx.navigateTo({
      url: '/pages/detail/detail?aid=' + aid,
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: videoinfo })
      }
    })
  },
  // 获取搜索结果
  async getSearchResults(options, listName) {
    var _this = this
    if (_this.data[listName].page === -1) {
      return
    }
    var keyword = ''
    // 搜索框回车，新建搜索，页面跳转时将options传入
    if (!options && ((typeof options) !== 'undefined')) {
      keyword = options.keyword
    } else {
      // 关键词不变，提取本地关键词
      keyword = _this.data.keyword
    }
    // 将中文字符转为URL编码格式
    keyword = encodeURI(keyword)

    // 展示loading
    wx.showLoading({
      title: '加载中 ^_^',
      mask: true
    })

    // 1获取UP主的参数及结果处理不一样
    if(_this.data.current_search_type === 2) {
      await wx.request({
        // 请求地址
        url: localhost + '/search/searchengine',
        // 请求参数
        data: {
          order: _this.data.order || "totalrank",
          search_type: _this.data.search_type || 'all',
          page: _this.data[listName].page || 1,
          keyword: keyword,
          main_ver: _this.data.main_ver || "v3",
          pagesize: _this.data.pagesize || 20,
          platform: _this.data.platform || 'h5'
        },
        success(res) {
          // clearTimeout(_this.data.itimer)
          _this.setData({itimer: null})
          var newList = res.data.result
          var oldList = _this.data[listName].list || []
          // 若新数据小于20项，将禁止新请求
          if(newList.length < 20) {
            _this.setData({ [listName]: { page: -1, once: true, list: [...oldList, ...newList] } })
          } else {
            _this.setData({ [listName]: { page: _this.data[listName].page + 1 || 2, once: true,
            list: [...oldList, ...newList] } })
          }
          // 判断是否要更新top_tlist
          if (res.data.top_tlist) {
            _this.setData({ top_tlist: res.data.top_tlist })
          }
          wx.hideLoading()
        }
      })
    } else {
    // 2获取其它搜索结果 http://169.254.131.173:3000/search/searchengine
      wx.request({
        // 请求地址
        url: localhost + '/search/searchengine',
        // POST请求参数
        data: {
          order: _this.data.order || "totalrank",
          search_type: _this.data.search_type || 'all',
          page: _this.data[listName].page || 1,
          keyword: keyword,
          bangumi_num: _this.data.bangumi_num || 3,
          main_ver: _this.data.main_ver || "v3",
          movie_num: _this.data.movie_num || 3,
          pagesize: _this.data.pagesize || 20,
          platform: _this.data.platform || 'h5'
        },
        // 请求成功回调
        success(res) {
          // clearTimeout(_this.data.itimer)
          _this.setData({ itimer: null })
          // tempbangumiList movie
          // 提取新增数据
          var newList = res.data.result.video || res.data.result
          // 提取旧数据
          var oldList = _this.data[listName].list || []
          // 将新旧数据装进去,若新数据小于20项，将禁止新请求
          if (newList.length < 20) {
            _this.setData({ [listName]: { page: -1, once: true, list: [...oldList, ...newList] } })
          } else {
            _this.setData({ [listName]: { page: _this.data[listName].page + 1 || 2, once: true,
            list: [...oldList, ...newList] } })
          }
          // 判断是否要更新top_tlist
          if (res.data.top_tlist) {
            _this.setData({ top_tlist: res.data.top_tlist })
          }
          // 判断是否推荐番剧，存放至临时列表
          if (res.data.result.bangumi && res.data.result.bangumi.length) {
            _this.setData({ tempbangumiList: res.data.result.bangumi})
          }
          // 判断是否推荐电影，存放至临时列表
          if (res.data.result.movie && res.data.result.movie.length) {
            _this.setData({ tempPgcList: res.data.result.movie })
          }
          wx.hideLoading()
        }
      })
    }
    
  },
  // 改变搜索及排序类型
  async handleTypeChange(event) {
    var _this = this
    var dataset = event.currentTarget.dataset
    var type = dataset.type
    var index = dataset.index
    // 修改激活参数
    await this.setData({[type]: index})

    // 修改搜索条件，重新获取数据
    if (type === 'current_search_type') {
      var newtype = _this.data.search_type_list[index].search_type
      await _this.setData({ search_type: newtype})
      // if ((!_this.data[newtype + 'List'] && newtype !== 'all') || (newtype !== 'all' && !_this.data[newtype + 'List'].once) ) {
      if (newtype !== 'all' && !_this.data[newtype + 'List'].once) {
        _this.getSearchResults({}, newtype + 'List')
      }
    }
    if (type === 'current_order_type') {
      var newtype = _this.data.order_list[index].order_type
      await _this.setData({ order: newtype})
      if (!_this.data['all' + newtype + 'List'] || !_this.data['all' + newtype + 'List'].once) {
        _this.getSearchResults({}, 'all' + newtype + 'List')
      }
    }
  },
  // 跳转到番剧或影视搜索结果页面
  handleJumpToBangumi(event) {
    // var index = event.currentTarget.dataset.index
    event.currentTarget.dataset.type = "current_search_type"
    // this.setData({current_search_type: index})
    this.handleTypeChange(event)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    var _this = this
    await this.setData({ keyword: options.keyword })
    // 获取搜索结果
    this.getSearchResults(options, 'alltotalrankList')
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
   * 页面上拉触底事件的处理函数，自动获取信息
   */
  onReachBottom: async function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})