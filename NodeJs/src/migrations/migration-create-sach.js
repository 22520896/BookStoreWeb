'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sach',
      {
        idSach: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        tenSach: {
          type: Sequelize.STRING,
        },
        tacGia: {
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
    await queryInterface.dropTable('Sach');
  }
};