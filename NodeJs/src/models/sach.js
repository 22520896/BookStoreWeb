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
      Sach.hasMany(models.CTHD, {foreignKey: 'idSach', targetKey:'idSach'})
      Sach.hasMany(models.CTPN, {foreignKey: 'idSach', targetKey:'idSach'})
    }
  }
  Sach.init({
    idSach: {
      type: DataTypes.INTEGER, 
      primaryKey: true,
    },
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