'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('shop', {
        // Model attributes are defined here
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            name: {
                type: Sequelize.STRING(256),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(32),
                allowNull: false,
                unique: true
                // allowNull defaults to true
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false
            }
        });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('shop')
    }
};
