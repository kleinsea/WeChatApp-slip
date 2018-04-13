Page({
  data: {
    list_msg: [],
    delWidth: 90
  },
  onLoad: function (options) {
    for (let i = 0; i < 10; i++) {
      this.data.list_msg.push({
        moveStyle: '',
        text: `内容${i},我会被删除吗`
      })
    }
    this.getDelwidth()
    this.setData({
      list_msg: this.data.list_msg
    })
  },
  getDelwidth() {
    let width = wx.getSystemInfoSync().windowWidth
    let scale = width * 2 / 750 //获取缩放比例 按 iPhone6 设计尺寸缩放
    this.data.delWidth = Math.floor(this.data.delWidth * scale)
    this.setData({
      delWidth: this.data.delWidth
    })
  },
  t_start(e) {
    // 记录手势开始时候的位置信息
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX
      })
    }
    this.initMsg()
  },
  initMsg() {
    //初始化开始位置，同时保证开始的时候其他页面数据是不显示删除的
    this.data.list_msg.map((item) => {
      item.moveStyle = 'right:0px'
    })
    this.setData({
      list_msg: this.data.list_msg
    })
  },
  t_move(e) {
    let moveX = e.touches[0].clientX
    let moveStyle = ''
    // 记录此时的移动距离
    let move = this.data.startX - moveX
    if (move == 0 || move < 0) { //没有移动有效距离
      moveStyle = 'right:0px'
    } else {
      let validMove = move > this.data.delWidth ? this.data.delWidth : move
      moveStyle = `right:${validMove}px`
    }
    let index = e.currentTarget.id
    this.data.list_msg[index].moveStyle = moveStyle
    this.setData({
      list_msg: this.data.list_msg
    })
  },
  t_end(e) {
    // touch结束事件 获取相对位移，判定是否显示 删除按钮
    if (e.changedTouches.length == 1) {
      let moveX = e.changedTouches[0].clientX
      let moveStyle = ''
      let move = this.data.startX - moveX
      //判断位移是否大于按钮的一半
      if (move * 2 > this.data.delWidth) {
        moveStyle = `right:${this.data.delWidth}px`
      } else {
        moveStyle = `right:0px`
      }
      let index = e.currentTarget.id
      this.data.list_msg[index].moveStyle = moveStyle
      this.setData({
        list_msg: this.data.list_msg
      })
    }
  },
  delEnter(e) {
    // 执行删除操作
    let self = this
    wx.showModal({
      title: '提示',
      content: `删除第${e.currentTarget.id}个数据吗`,
      success: function (res) {
        if (res.confirm) {
          self.data.list_msg.splice(e.currentTarget.id, 1)
          self.setData({
            list_msg: self.data.list_msg
          })
        } else if (res.cancel) {
          self.initMsg()
        }
      }
    })
  }
})