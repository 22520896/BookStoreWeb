'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TaiKhoan', 
      {
      idTK: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING
      },
      vaiTro: {
        type: Sequelize.STRING
      },
      hoTen: {
        type: Sequelize.STRING
      },
      diaChi: {
        type: Sequelize.STRING
      },
      sdt: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TaiKhoan');
  }
};