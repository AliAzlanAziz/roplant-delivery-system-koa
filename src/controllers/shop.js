const { Shop } = require('../config/sequelize')

module.exports = {
    heyShop: (ctx, next) => {
        ctx.body = "hey shop"
    },

    postSignup: async (ctx, next) => {
        try{
            await Shop.create({ name: 'test', email: 'demo@gmail.com', password: 'pass' })
            ctx.body = 'user created'
        }catch(error){
            console.log(error)
            ctx.body = 'error'
        }     
    },

    postSignin: (ctx, next) => {
        ctx.body = "hey shop"
    }
}