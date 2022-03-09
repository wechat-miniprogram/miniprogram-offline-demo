const os = require('os')
const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()

const homeData = require('./data/home.json')
const detailData = require('./data/detail.json')

router.get('/cgi/home', async ctx => {
    ctx.body = homeData
})

router.get('/cgi/detail/:id', async ctx => {
    ctx.body = detailData[ctx.params.id]
})

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8088)

let ip
try {
    const ifaces = os.networkInterfaces()
    for (const key in ifaces) {
        const item = ifaces[key]
        if (item) {
            for (const subItem of item) {
                if (subItem.family === 'IPv4' && subItem.address !== '127.0.0.1') {
                    ip = subItem.address
                    break
                }
            }

            if (ip) break
        }
    }
} catch (err) {
    console.error(err)
}

ip = ip || '127.0.0.1'
fs.writeFileSync(path.join(__dirname, '../miniprogram/origin.js'), `export default 'http://${ip}:8088'`, 'utf-8')
console.log(`listen: http://${ip}:8088`)
