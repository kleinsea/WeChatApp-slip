/**
 * 注：根据测试，`movable-area`存在bug，不能动态修改`width`/`height`/`x`的值，
 * 故采用后渲染的方式，即 `wx-if`暂时初始化完数据后再显示文本信息
 * ===========  等待官方解决  ==============
 */
let start,end;
Component({
  properties: {
    slipBackground: {
      type: String,
      value: '#fff'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    distance: {
      type: Number,
      value:0.4
    }
  },
  options: {
    multipleSlots: true
  },
  data: {
    show:false,
    startX:0,
    hidenBtn:true
  },
  methods: {
    t_start(){
      start = new Date().getTime()
      this.triggerEvent("opened")
    },
    t_move(e){
      this.setData({
        changeX: e.detail.x
      })
    },
    t_end(e){
      end = new Date().getTime()
      if((end - start)<= 1000) return 
      console.log('end')
      const move = this.data.startX - this.data.changeX
      if (move>=this.data.startX * this.data.distance){
        this.setData({
          x:0
        })
      }else{
        this.setData({
          x: this.data.startX
        })
      }
    },
    refresh(){
      this.setData({
        x: this.data.startX
      })
    },
    init(){
      const self = this
      var query = wx.createSelectorQuery().in(this)
      query.select('#control').boundingClientRect(function (res) {
        let sysWidth = wx.getSystemInfoSync().windowWidth
        const htnWidth = res.width
        self.setData({
          sysWidth: sysWidth,
          htnWidth: htnWidth,
          x: htnWidth,
          startX: htnWidth,
          show: true
        })
        setTimeout(() => {
          // 加延时，防止开始时候显示按钮组
          self.setData({
            opacity: 1
          })
        }, 300)
      }).exec()
    }
  },
  ready(){
    this.init()
  }
})