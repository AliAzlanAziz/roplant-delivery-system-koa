module.exports = (sequelize, DataTypes) => {
    const ShopModel = require('./shop')(sequelize, DataTypes)
    
    const PriceModel = sequelize.define('price', {
    // Model attributes are defined here
        id: {
            primaryKey: true,
            type: DataTypes.UUIDV4,
            defaultValue: DataTypes.UUIDV4
        },
        litre: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(512),
        }
    }, 
    {
        // Other model options go here
        freezeTableName: true, //stop the auto-pluralization
        timestamps: false
    })
    
    PriceModel.belongsTo(ShopModel, {
        foreignKey: {
            name: 'shopid',
            type: DataTypes.UUIDV4
        },
        onDelete: 'Cascade',
    })

    return PriceModel
}