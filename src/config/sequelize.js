const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv') // to make environment variable available
const ShopModel = require('../models/shop')
const LocationModel = require('../models/location')
const PriceModel = require('../models/price')

dotenv.config({ path: './src/config/config.env' }) // configure dotenv package to make env var available

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
})

const Shop = ShopModel(sequelize, DataTypes)
const Location = LocationModel(sequelize, DataTypes)
const Price = PriceModel(sequelize, DataTypes)

const assert_connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { 
    assert_connection,
    Shop,
    Location,
    Price
}