const koaRouter = require('koa-router') // for routing
const router = new koaRouter() //initialize koa router
const { 
    heyShop,
    postSignup,
    postSignin,
    postUpdateProfile,
    getAllShops,
    getShopById
} = require('../controllers/shop')
const {
    isAuthenticated
} = require('../middleware/authenticate')
// const { 
//     signupValidator,
//     signinValidator
// } = require('../utils/validator')

router.get('/', heyShop)

router.post('/signup', postSignup)

router.post('/signin', postSignin)

router.post('/update/profile', isAuthenticated, postUpdateProfile)

router.get('/all', isAuthenticated, getAllShops)

router.get('/:id', isAuthenticated, getShopById)

module.exports = router