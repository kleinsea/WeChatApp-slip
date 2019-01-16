let t_index = -1;
Page({
  data: {
    pro_msg: []
  },
  onLoad: function (options) {
    let pro_msg = [{
      id:1,
      proImg: '/images/product.jpg',
      proHeader: '百素我家酸菜鱼',
      proDesc: '[2店通用]工作日午市套餐A，建议2-4人使用，可免费使用包间，提供免费WiFi.'
    }, {
      id:2,
      proImg: '/images/product.jpg',
      proHeader: '百素我家酸菜鱼',
      proDesc: '[4店通用]工作日午市套餐A，建议2-4人使用，可免费使用包间，提供免费WiFi.'
    },{
      id:3,
      proImg:'/images/product.jpg',
      proHeader: '百素我家酸菜鱼',
      proDesc: '[6店通用]工作日午市套餐A，建议2-4人使用，可免费使用包间，提供免费WiFi.'
    },{
      id: 4,
      proImg: '/images/product.jpg',
      proHeader: '百素我家酸菜鱼',
      proDesc: '[8店通用]工作日午市套餐A，建议2-4人使用，可免费使用包间，提供免费WiFi.'
    }]
    this.setData({
      pro_msg: pro_msg
    })
  },
  refresh(i){
    if (this.data.pro_msg && this.data.pro_msg.length>0){
      this.data.pro_msg.map((item,index)=>{
        if(i!==index){
          this.selectComponent(`#slip${index}`) && this.selectComponent(`#slip${index}`).refresh()
        }
      })
    }
  },
  delEnter(e) {
    // 执行删除操作
    let self = this
    wx.showModal({
      title: '提示',
      content: `执行删除第${e.currentTarget.id}个商品吗`,
      success:function(){
        self.data.pro_msg.splice(e.currentTarget.id, 1)
        self.setData({
          pro_msg: self.data.pro_msg
        })
        self.refresh()
      }
    })
  },
  opend(e) {
    // 多次点击的时候将关闭当前窗口
    const opend = e.currentTarget.dataset ? e.currentTarget.dataset.opend : t_index
    if (opend === t_index){
      t_index = -1
      return this.refresh(-1)
    }
    t_index = opend
    // 只允许同时打开一个左划删除组件，当打开一个组件时，其他组件将关闭。不使用可以删除
    return this.refresh(opend)
  },
  editEnter(e) {
    // 执行编辑操作
    let self = this
    wx.showModal({
      title: '提示',
      content: `执行编辑第${e.currentTarget.id}个商品`
    })
  }
})