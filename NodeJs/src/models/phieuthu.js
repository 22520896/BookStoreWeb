'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhieuThuTien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PhieuThuTien.init({
    idKhachHang: DataTypes.INTEGER,
    sdt: DataTypes.STRING,
    hoTen: DataTypes.STRING,
    email: DataTypes.STRING,
    soTienThu: DataTypes.BIGINT,
    ngayThuTien: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'PhieuThuTien',
    // timestamps: false
  });
  return PhieuThuTien;
};