const Koa = require('koa')
Router = require('koa-router')
const app = new Koa()
router = new Router

const homeAdData = require('./home/ad.js')
router.get('/api/homead', (ctx, next) => {
    ctx.body = homeAdData
})

const homeListData = require('./home/list.js')

router.get('/api/homelist/:city/:page', (ctx, next) => {
    const params = ctx.params
    const paramsCity = params.city
    const paramsPage = params.page
    console.log('当前城市：' + paramsCity)
    console.log('当前页数：' + paramsPage)
    ctx.body = homeListData
})

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000)
console.log('app running on port 3000')