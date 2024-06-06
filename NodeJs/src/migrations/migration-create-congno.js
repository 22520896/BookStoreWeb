'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('CongNo',
            {
                sdt: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.STRING
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
                noDau: {
                    type: Sequelize.INTEGER
                },
                phatSinh: {
                    type: Sequelize.INTEGER
                },
            });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('CongNo');
    }
};