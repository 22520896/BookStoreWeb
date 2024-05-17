'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sach extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sach.init({
    tenSach: DataTypes.STRING,
    tacGia: DataTypes.STRING,
    theLoai: DataTypes.STRING,
    soLuong: DataTypes.INTEGER,
    donGiaBan: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Sach',
    // timestamps: false
  });
  return Sach;
};