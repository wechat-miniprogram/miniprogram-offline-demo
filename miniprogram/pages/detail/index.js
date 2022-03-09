import {formatTime} from '../../utils/index'
import ORIGIN from '../../origin'

Page({
  data: {
    detail: null,
  },

  onLoad(args) {
    const docId = args.docid
    
    wx.request({
      url: `${ORIGIN}/cgi/detail/${docId}`,
      method: 'GET',
      success: res => {
        const detail = res.data.data
        detail.createTime = formatTime(detail.CreateTime * 1000, 'yyyy-mm-dd hh:ii:ss')
        detail.updateTime = formatTime(detail.UpdateTime * 1000, 'yyyy-mm-dd hh:ii:ss')

        this.setData({detail})
      },
      fail: err => console.log(err),
    })
  }
})
