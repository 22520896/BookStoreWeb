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
      KhachHang.hasMany(models.HoaDon, {foreignKey:'sdt', targetKey: 'sdt'})
      KhachHang.hasMany(models.PhieuThu, {foreignKey:'sdt', targetKey: 'sdt'})
    }
  }
  KhachHang.init({
    sdt: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    ten: DataTypes.STRING,
    diaChi: DataTypes.STRING,
    email: DataTypes.STRING,
    tienNo: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'KhachHang',
    timestamps: false
  });
  return KhachHang;
};