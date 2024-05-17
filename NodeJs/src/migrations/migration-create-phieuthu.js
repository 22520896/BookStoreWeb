'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PhieuThuTiens',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        idKhachHang: {
          type: Sequelize.INTEGER
        },
        sdt: {
          type: Sequelize.STRING,
        },
        hoTen: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING
        },
        soTienThu: {
          type: Sequelize.BIGINT
        },
        ngayThuTien: {
          type: Sequelize.DATE
        }
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PhieuThuTiens');
  }
};