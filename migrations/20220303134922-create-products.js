'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('products', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.STRING
            },
            createdAT: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            updatedAT: {
                type: Sequelize.DATE,
                allowNull: true,
            }

        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('products');
    }
};