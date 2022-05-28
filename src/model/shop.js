const { Sequelize, DataTypes } = require('sequelize')

const Shop = sequelize.define('Shop', {
    // Model attributes are defined here
        id: {
            primaryKey: true,
            type: DataTypes.UUIDV4,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true
            // allowNull defaults to true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, 
    {
        // Other model options go here
        freezeTableName: true, //stop the auto-pluralization
    }
);