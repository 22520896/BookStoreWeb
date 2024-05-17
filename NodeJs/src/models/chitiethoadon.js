'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CTHoaDon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CTHoaDon.init({
    idHoaDon: DataTypes.INTEGER,
    idSach: DataTypes.INTEGER,
    Sach: DataTypes.STRING,
    theLoai: DataTypes.STRING,
    soLuong: DataTypes.INTEGER,
    donGiaBan: DataTypes.BIGINT,
  },
   {
    sequelize,
    // modelName: 'CTHoaDon',
  });
  return CTHoaDon;
};