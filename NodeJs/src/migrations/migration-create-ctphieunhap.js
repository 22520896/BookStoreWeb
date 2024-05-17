'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CTPhieuNhaps', 
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      idPhieuNhap: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      idSach: {
        type: Sequelize.INTEGER
      },
      Sach: {
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
    await queryInterface.dropTable('CTPhieuNhaps');
  }
};