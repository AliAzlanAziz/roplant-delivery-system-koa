const { Sequelize } = require('sequelize');

const db = async () => {
    const sequelize = new Sequelize('roplant', 'root', 'root', {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    })

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = db