const { Price } = require('../config/sequelize')

module.exports = {
    heyPrice: (ctx, next) => {
        ctx.body = "hey price"
    },

    postCreatePrice: async (ctx, next) => {
        try{
            const { litre, amount, description } = ctx.request.body
            const { id } = ctx.state.user

            await Price.create({ shopid: id, litre: litre, amount: amount, description: description })
            
            ctx.response.status = 201;
            ctx.body = { message: "price created!" }
            return
        }catch(error){
            console.log(error)
            ctx.response.status = 500;
            ctx.body = { message: "internal server error!" }
            return
        }     
    },

    postUpdatePrice: async (ctx, next) => {
        try{
            const { litre, amount, description, id } = ctx.request.body
            // const { id } = ctx.state.user

            await Price.update({ litre: litre, amount: amount, description: description }, {
                where: {
                    id: id
                }
            })
            
            ctx.response.status = 200;
            ctx.body = { message: "price updated!" }
            return
        }catch(error){
            console.log(error)
            ctx.response.status = 500;
            ctx.body = { message: "internal server error!" }
            return
        }     
    },

    postDeletePrice: async (ctx, next) => {
        try{
            const { id } = ctx.request.body

            await Price.destroy({
                where: {
                    id: id
                }
            })
            
            ctx.response.status = 200;
            ctx.body = { message: "price deleted!" }
            return
        }catch(error){
            console.log(error)
            ctx.response.status = 500;
            ctx.body = { message: "internal server error!" }
            return
        }     
    },
}