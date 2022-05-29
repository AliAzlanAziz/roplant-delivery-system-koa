const { Shop } = require('../config/sequelize')
const { Location } = require('../config/sequelize')
const { Price } = require('../config/sequelize')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

Shop.hasOne(Location, { foreignKey: 'shopid' })
Location.belongsTo(Shop, { foreignKey: 'shopid' })

Shop.hasMany(Price, { foreignKey: 'shopid' })
Price.belongsTo(Shop, { foreignKey: 'shopid' })

module.exports = {
    heyShop: (ctx, next) => {
        ctx.body = "hey shop"
    },

    postSignup: async (ctx, next) => {
        try{
            const { name, email, password } = ctx.request.body

            const userExist = await Shop.findOne({ where: { email: email }, attributes: [ 'id' ] })
            if(userExist?.id !== undefined) {
                ctx.response.status = 409;
                ctx.body = { message: "user exist!" }
                return
            }
            
            const hash = bcrypt.hashSync(password, saltRounds)
            await Shop.create({ name: name, email: email, password: hash })
            
            ctx.response.status = 201;
            ctx.body = { message: "user created!" }
            return
        }catch(error){
            console.log(error)
            ctx.response.status = 500;
            ctx.body = { message: "internal server error!" }
            return
        }     
    },

    postSignin: async (ctx, next) => {
        try{
            const { email, password } = ctx.request.body

            const user = await Shop.findOne({ where: { email: email }, attributes: [ 'id', 'password' ] })
            if(user?.id === undefined) {
                ctx.response.status = 404;
                ctx.body = { message: "user not found!" }
                return
            }

            const hash = bcrypt.compareSync(password, user.password)

            if(hash){
                const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '12h' })
                ctx.response.status = 200;
                ctx.body = { token: token }
                return
            }else{
                ctx.response.status = 401;
                ctx.body = { message: "invalid credentials!" }
                return
            }
        }catch(error){
            console.log(error)
            ctx.response.status = 500;
            ctx.body = { message: "internal server error!" }
            return
        }
    },

    postUpdateProfile: async (ctx, next) => {
        try{
            const { email, address, city, longitude, latitude } = ctx.request.body
            const { id } = ctx.state.user

            await Shop.update({ email: email }, {
                where: {
                    id: id
                }
            });

            const location = await Location.findOne({ where: { shopid: id }, attributes: [ 'id' ] })

            if(location?.id === undefined) {
                await Location.create({ shopid: id, address: address, city: city, longitude: longitude, latitude: latitude })
            }else{
                await Location.update({ shopid: id, address: address, city: city, longitude: longitude, latitude: latitude }, {
                    where: {
                        shopid: id
                    }
                });
            }

            ctx.status = 200;
            ctx.body = { message: "profile updated!" }
            return
        }catch(error){
            console.log(error)
            ctx.response.status = 500;
            ctx.body = { message: "internal server error!" }
            // return
        }     
    },

    getAllShops: async (ctx, next) => {
        try{
            const shops = await Shop.findAll({
                include: [
                    {
                        model: Location,
                        attributes: [ 'city', 'address', 'longitude', 'latitude']
                        // required: true
                    }
                ],
                attributes: [ 'id', 'name' ]
            })

            ctx.response.status = 200;
            ctx.body = { 
                message: shops.length + ' shops retrieved!',
                shops: shops
            }
            return
        }catch(error){
            console.log(error)
            ctx.response.status = 500;
            ctx.body = { message: "internal server error!" }
            return
        }
    },

    getShopById: async (ctx, next) => {
        try{
            const id = ctx.params.id

            const shop = await Shop.findOne({
                where: { id: id },
                include: [
                    {
                        model: Location,
                        attributes: [ 'city', 'address', 'longitude', 'latitude' ]
                        // required: true
                    },
                    {
                        model: Price,
                        attributes: [ 'id', 'litre', 'amount', 'description' ]
                    }
                ],
                attributes: [ 'id', 'name' ]
            })

            ctx.response.status = 200;
            ctx.body = { 
                message: 'shop information retrieved!',
                shop: shop
            }
            return
        }catch(error){
            console.log(error)
            ctx.response.status = 500;
            ctx.body = { message: "internal server error!" }
            return
        }
    },
}