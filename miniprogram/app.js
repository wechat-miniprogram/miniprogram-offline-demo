import ORIGIN from './origin'

App({
  onLaunch() {
    const cacheManager = wx.createCacheManager({
      origin: ORIGIN,
    })
    
    cacheManager.addRules([
      '/cgi/home',
      '/cgi/detail/:id',
    ])
    cacheManager.on('enterWeakNetwork', () => {
      console.log('enterWeakNetwork')
    })
    cacheManager.on('exitWeakNetwork', () => {
      console.log('exitWeakNetwork')
    })
    cacheManager.on('request', evt => {
      return new Promise((resolve, reject) => {
        const matchRes = cacheManager.match(evt)
        if (matchRes) {
          resolve(matchRes.data || null)
        } else {
          reject({errMsg: `catch not found: ${evt.url}`})
        }
      })
    })
  }
})
