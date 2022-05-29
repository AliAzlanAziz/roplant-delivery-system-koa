const { Shop } = require('../config/sequelize')
const { Price } = require('../config/sequelize')

module.exports = {
    isAuthorized: async (ctx, next) => {
        try {
            const { id } =  ctx.request.body // extract id of the entity being updated

            const priceExist = await Price.findOne({ where: { id: id }})
            if(priceExist?.id === undefined) {
                ctx.response.status = 404;
                ctx.body = { message: "not found!" }
                return
            }

            if(priceExist.shopid !== ctx.state.user.id) {
                ctx.response.status = 403;
                ctx.body = { message: "unauthorized!" }
                return
            }
    
            return next()
        } catch(error) {
            console.log(error.message)
            ctx.response.status = 500;
            ctx.body = { message: error.message }
            return
        }
    }

}