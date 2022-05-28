'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('price', {
        // Model attributes are defined here
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            litre: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            amount: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(512),
            },
            shopid: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'shop',
                        // schema: 'utf8mb4_0900_ai_ci'
                    },
                    key: 'id'
                },
                allowNull: false,
                onDelete: 'CASCADE'
            }
        });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('price')
    }
};
