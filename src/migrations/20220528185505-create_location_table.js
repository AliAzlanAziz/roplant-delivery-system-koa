'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('location', {
        // Model attributes are defined here
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            address: {
                type: Sequelize.STRING(256),
                allowNull: false
            },
            city: {
                type: Sequelize.STRING(256),
                allowNull: false
            },
            longitude: {
                type: Sequelize.FLOAT,
            },
            latitude: {
                type: Sequelize.FLOAT,
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
        await queryInterface.dropTable('location')
    }
};
