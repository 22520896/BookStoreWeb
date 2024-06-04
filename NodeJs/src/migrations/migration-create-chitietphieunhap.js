'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CTPN', 
    {
      idPN: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      idSach: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      sach: {
        type: Sequelize.STRING,
      },
      theLoai: {
        type: Sequelize.STRING
      },
      tacGia: {
        type: Sequelize.STRING
      },
      soLuong: {
        type: Sequelize.INTEGER
      },
      donGiaNhap: {
        type: Sequelize.BIGINT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CTPN');
  }
};