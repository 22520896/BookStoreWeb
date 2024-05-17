'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('TaiKhoans', [
      {
        username: 'admin',
        password: '123',
        vaiTro: 1,
        hoTen: "PJM",
        diaChi: "TP HCM",
        sdt: "012345454",
      },
    ]);
  },

  async down(queryInterface, Sequelize) { //rollback
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
