'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CTHD extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CTHD.belongsTo(models.HoaDon, {foreignKey: 'idHD', targetKey:'idHD'})
      CTHD.belongsTo(models.Sach, {foreignKey: 'idSach', targetKey:'idSach'})
    }
  }
  CTHD.init({
    idHD: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idSach: {      
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    sach: DataTypes.STRING,
    theLoai: DataTypes.STRING,
    soLuong: DataTypes.INTEGER,
    donGiaBan: DataTypes.BIGINT,
  },
   {
    sequelize,
    modelName: 'CTHD',
  });
  return CTHD;
};