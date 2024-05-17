'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaiKhoan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TaiKhoan.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    vaiTro: DataTypes.STRING,
    hoTen: DataTypes.STRING,
    diaChi: DataTypes.STRING,
    sdt: DataTypes.STRING,
    // img: DataTypes.STRING
  },
    {
      sequelize,
      modelName: 'TaiKhoan',
      timestamps: false
    });
  return TaiKhoan;
};