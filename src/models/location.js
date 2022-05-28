module.exports = (sequelize, DataTypes) => {
    const ShopModel = require('./shop')(sequelize, DataTypes)

    const LocationModel = sequelize.define('location', {
    // Model attributes are defined here
        id: {
            primaryKey: true,
            type: DataTypes.UUIDV4,
            defaultValue: DataTypes.UUIDV4
        },
        address: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        longitude: {
            type: DataTypes.FLOAT,
        },
        latitude: {
            type: DataTypes.FLOAT,
        }
    }, 
    {
        // Other model options go here
        freezeTableName: true, //stop the auto-pluralization
    })

    LocationModel.belongsTo(ShopModel, {
        foreignKey: {
            name: 'shopid',
            type: DataTypes.UUIDV4
        },
        onDelete: 'Cascade',
    })

    return LocationModel
}
