'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CTHoaDons', 
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      idHoaDon: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      idSach: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      Sach: {
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
    await queryInterface.dropTable('CTHoaDons');
  }
};