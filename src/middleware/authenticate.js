const { Shop } = require('../config/sequelize')
const jwt = require('jsonwebtoken')

module.exports = {
    isAuthenticated: async (ctx, next) => {
        try {
            const token = ctx.request.header.authorization.substring(7) //extract token from header removing 'Bearer '

            const { id } = jwt.verify(token, process.env.SECRET_KEY)
    
            const userExist = await Shop.findOne({ where: { id: id }})
            if(userExist?.id === undefined) {
                ctx.response.status = 401;
                ctx.body = { message: "unauthorized!" }
                return
            }
            const user = {
                id: id
            }
            ctx.state.user = user
    
            return next()
        } catch(error) {
            console.log(error.message)
            ctx.response.status = 500;
            ctx.body = { message: "internal server error" }
            return
        }
    }

}