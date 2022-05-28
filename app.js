// require modules
const koa = require('koa')
const koaRouter = require('koa-router') // for routing
const json = require('koa-json') // to pretty print response json
const dotenv = require('dotenv') // to make environment variable available
const { assert_connection } = require('./src/config/sequelize')
const shop = require('./src/routes/shop') // routes for shop
const price = require('./src/routes/price') // routes for price

dotenv.config({ path: './src/config/config.env' }) // configure dotenv package to make env var available

const PORT = process.env.SERVER_PORT || 5001 // set port

const app = new koa({ proxy: true }) // initialize koa
const router = new koaRouter() //initialize koa router

// app.context.db = db(); //commenting this line because no more setting db context

app.use(json()) // use json middleware

// logger
app.use(async (ctx, next) => {
    // console.log('in logger before next')
    await next()
    // console.log('in logger after next')
    const rt = ctx.response.get('X-Response-Time')
    console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})
  
// x-response-time
app.use(async (ctx, next) => {
    // console.log('in x-response-time before next')
    const start = Date.now()
    await next()
    // console.log('in x-response-time after next')
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms}ms`)
})

router.get('/', (ctx, next) => {
    return ctx.body = "hello world! server running"
})

router.use('/shop', shop.routes()) // use shop routers for /shop url prefix
router.use('/price', price.routes()) // use price routers for /price url prefix

app.use(router.routes()).use(router.allowedMethods()) // use router middleware

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
    assert_connection()
})