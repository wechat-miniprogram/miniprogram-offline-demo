# miniprogram-offline-demo

小程序弱网/离线 demo，要求基础库支持 wx.createCacheManager 能力。

## 使用指南

1. 启动服务端

```bash
# 进入服务端
cd server

# 安装依赖
npm install

# 启动服务
node app.js
```

2. 打开小程序

将 miniprogram 目录作为小程序根目录打开，然后手机扫码预览。进入过小程序一次后，断网重新进入对应页面，会发现小程序使用上次的请求缓存内容进行渲染。

# LICENSE

MIT
