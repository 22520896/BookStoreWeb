'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KhachHang', 
    {
      sdt: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
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
    await queryInterface.dropTable('KhachHang');
  }
};