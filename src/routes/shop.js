const koaRouter = require('koa-router') // for routing
const router = new koaRouter() //initialize koa router
const { 
    heyShop,
    postSignup,
    postSignin
} = require('../controllers/shop')

router.get('/', heyShop)

router.get('/', postSignup)

router.get('/', postSignin)

module.exports = router