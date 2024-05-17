'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KhachHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KhachHang.init({
    sdt: DataTypes.STRING,
    ten: DataTypes.STRING,
    gioiTinh: DataTypes.BOOLEAN,
    diaChi: DataTypes.STRING,
    email: DataTypes.STRING,
    tienNo: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'KhachHang',
    // timestamps: false
  });
  return KhachHang;
};