


'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HoaDon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HoaDon.init({
    ngayLap: DataTypes.DATE,
    sdt: DataTypes.STRING,
    hoTen: DataTypes.STRING,
    tongTien: DataTypes.BIGINT,
    soTienTra: DataTypes.BIGINT,
    tienTraLai: DataTypes.BIGINT,
    no: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'HoaDon',
    // timestamps: false
  });
  return HoaDon;
};