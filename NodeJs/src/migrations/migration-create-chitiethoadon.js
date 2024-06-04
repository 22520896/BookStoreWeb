'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CTHD', 
    {
      idHD: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      idSach: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      sach: {
        type: Sequelize.STRING
      },
      theLoai: {
        type: Sequelize.STRING
      },
      soLuong: {
        type: Sequelize.INTEGER
      },
      donGiaBan: {
        type: Sequelize.BIGINT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CTHD');
  }
};