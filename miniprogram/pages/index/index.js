import {formatTime} from '../../utils/index'
import ORIGIN from '../../origin'

Page({
  data: {
    list: [],
  },

  onShow() {
    wx.request({
      url: `${ORIGIN}/cgi/home`,
      method: 'GET',
      success: res => {
        const data = res.data.data
        const list = data.rows
        
        list.forEach(item => {
          item.time = formatTime(item.CreateTime * 1000, 'yyyy-mm-dd hh:ii:ss')
        })
        this.setData({list})
      },
      fail: err => console.log(err),
    })
  },

  onTap(evt) {
    const docId = evt.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/detail/index?docid=${docId}`
    })
  },
})
