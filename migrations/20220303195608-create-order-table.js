'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable(`orders`, {
            id: {
                type: Sequelize.INTEGER(5),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            product_id: {
                type: Sequelize.INTEGER(20),
                allowNull: false,
            },
            total: {
                type: Sequelize.STRING(300),
                allowNull: false,
            },
            stripe_id: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            status: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            createdAT: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        })

    },

    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable(`orders`)
    }
};