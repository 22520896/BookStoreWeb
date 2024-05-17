'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CTPhieuNhap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CTPhieuNhap.init({
    idPhieuNhap: DataTypes.INTEGER,
    idSach: DataTypes.INTEGER,
    Sach: DataTypes.STRING,
    theLoai: DataTypes.STRING,
    tacGia: DataTypes.STRING,
    soLuong: DataTypes.INTEGER,
    donGiaNhap: DataTypes.BIGINT,
  },
   {
    sequelize,
    modelName: 'CTPhieuNhap',
    // timestamps: false
  });
  return CTPhieuNhap;
};