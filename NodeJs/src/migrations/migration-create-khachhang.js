'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KhachHangs', 
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sdt: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ten: {
        type: Sequelize.STRING,
      },
      diaChi: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      tienNo: {
        type: Sequelize.BIGINT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('KhachHangs');
  }
};