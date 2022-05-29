const koaRouter = require('koa-router') // for routing
const router = new koaRouter() //initialize koa router
const { 
    heyPrice,
    postCreatePrice,
    postUpdatePrice,
    postDeletePrice
} = require('../controllers/price')

const {
    isAuthenticated
} = require('../middleware/authenticate')

const {
    isAuthorized
} = require('../middleware/authorize')

router.get('/', heyPrice)

router.post('/create', isAuthenticated, postCreatePrice)

router.post('/update', isAuthenticated, isAuthorized, postUpdatePrice)

router.post('/delete', isAuthenticated, isAuthorized, postDeletePrice)

module.exports = router