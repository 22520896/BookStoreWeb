'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhieuNhapSach extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PhieuNhapSach.init({
    ngayLap: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'PhieuNhapSach',
    // timestamps: false
  });
  return PhieuNhapSach;
};