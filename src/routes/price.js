const koaRouter = require('koa-router') // for routing
const router = new koaRouter() //initialize koa router
const { heyPrice } = require('../controllers/price')

router.get('/', heyPrice)

module.exports = router