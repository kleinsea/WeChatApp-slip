# WeChatApp-slip
> 一个小程序左滑效果(支持按钮组自定义)

!['左划组件'](/images/demo1.gif)

#### 使用规范

* 引入组件
  ```json
  {
    "usingComponents": {
      "slip": "/components/slip/slip"
    }
  }
  ```
* 使用组件
  * wxml部分(pro_msg,为需要左划操作的数组，可自行修改)
  ```html
  <slip wx:for="{{pro_msg}}" wx:key="{{index}}" id="slip{{index}}" bind:opened="opend" data-opend = "{{index}}">
  <view slot="slip-center">
    <!--正文显示部分-->
  </view>
  <view slot="slip-control" class="slip-control">
    <!--按钮组部分-->
  </view>

  ```
  * js部分

  ```javascript
  // this.data.pro_msg为需要左划删除的数组列表
  // 因微信自定义组件不能自己监听数据变化，所以在自己需要重置显示状态时候，请调用`this.refresh()`方法手动触发重置。
  refresh(i){
    if (this.data.pro_msg && this.data.pro_msg.length>0){
      this.data.pro_msg.map((item,index)=>{
        if(i!==index){
          this.selectComponent(`#slip${index}`) && this.selectComponent(`#slip${index}`).refresh()
          // 调用组件内部分`refresh`方法
          // 只改变组件显示状态，不支持动态改变组件相关信息，如按钮组的宽度等信息
          // 如果需要改变的话，需要重新渲染，请调用`init`方法.
        }
      })
    }
  },
  opend(e){
    // 只允许同时打开一个左划删除组件，当打开一个组件时，其他组件将关闭。不使用可以删除
    this.refresh(e.currentTarget.dataset.opend)
  },
  ```
#### 组件支持传递的参数

参数 | 说明 | 类型 | 默认值
----|------|----|----
slipBackground|组件背景色，可以设置组件的主背景色|String|#fff
disabled|当前状态是否可以执行左划操作|Boolean|false
distance|阈值，往左移动超过则显示按钮组|Number|0.4(取值范围：0-1)
