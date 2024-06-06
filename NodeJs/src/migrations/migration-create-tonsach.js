'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('TonSach',
            {
                idSach: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                thang: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                nam: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                tonDau: {
                    type: Sequelize.INTEGER
                },
                phatSinh: {
                    type: Sequelize.INTEGER
                },
            });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('TonSach');
    }
};