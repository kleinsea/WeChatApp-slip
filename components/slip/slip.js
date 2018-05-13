// components/slip/slip.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    slipBackground: {
      type: String,
      value: '#fff'
    },
    disabled: {
      type: Boolean,
      value: false
    },
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的初始数据
   */
  data: {
    sysWidth:375,
    htnWidth:37.5,
    x: 37.5
  },
  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready(){
    const self = this
    var query = wx.createSelectorQuery().in(this)
    query.select('#control').boundingClientRect(function (res) {
      let sysWidth = wx.getSystemInfoSync().windowWidth
      const htnWidth = res.width
      self.setData({
        sysWidth: sysWidth,
        htnWidth: htnWidth,
        x: htnWidth
      })
    }).exec()
  }
})